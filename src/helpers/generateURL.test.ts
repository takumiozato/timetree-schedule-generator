import { generateURL } from './generateURL'
import pako from 'pako'

describe('generateURL', () => {
  // 生成されたURLをデコードする
  function decodeTimeTreeURL(url: string) {
    const base64Data = url.replace('https://timetr.ee/ne/', '')
    const base64Fixed = base64Data.replace(/-/g, '+').replace(/_/g, '/')
    const binary = atob(base64Fixed)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    const decompressed = pako.ungzip(bytes, { to: 'string' })
    return JSON.parse(decompressed)
  }

  it('通常の入力に対して正しいURLが生成される', () => {
    const url = generateURL(
      new Date('2024-02-02'),
      '10:00',
      new Date('2024-02-02'),
      '11:00',
      'Meeting',
      'Team sync',
      false,
      'Office',
      'https://example.com',
    )

    expect(url).toMatch(/^https:\/\/timetr\.ee\/ne\/.+/)

    const decoded = decodeTimeTreeURL(url)
    expect(decoded).toEqual({
      c: 1,
      t: 'Meeting',
      n: 'Team sync',
      s: '20240202T100000+0900',
      e: '20240202T110000+0900',
      a: false,
      l: 'Office',
      u: 'https://example.com',
    })
  })

  it('終日チェックONのケースが正しく処理される', () => {
    const url = generateURL(
      new Date('2024-02-02'),
      '00:00',
      new Date('2024-02-02'),
      '23:59',
      'Holiday',
      'Company holiday',
      true,
      '',
      '',
    )

    const decoded = decodeTimeTreeURL(url)
    expect(decoded.a).toBe(true)
    expect(decoded.s).toBe('20240202T000000+0900')
    expect(decoded.e).toBe('20240202T235900+0900')
  })

  it('任意入力のフィールドが正しく処理される', () => {
    const url = generateURL(
      new Date('2024-02-02'),
      '10:00',
      new Date('2024-02-02'),
      '11:00',
      'Meeting',
      '',
      false,
      '',
      '',
    )

    const decoded = decodeTimeTreeURL(url)
    expect(decoded.n).toBe('')
    expect(decoded.l).toBe('')
    expect(decoded.u).toBe('')
  })

  it('圧縮およびエンコードを通じてデータの整合性が維持される', () => {
    const originalData = {
      startDate: new Date('2024-02-02'),
      startTime: '10:00',
      endDate: new Date('2024-02-02'),
      endTime: '11:00',
      title: '特殊文字 !@#$%^&*()',
      memo: 'メモ with special chars 🎉',
      allDay: false,
      location: '東京都',
      url: 'https://example.com?param=value',
    }

    const generatedUrl = generateURL(
      originalData.startDate,
      originalData.startTime,
      originalData.endDate,
      originalData.endTime,
      originalData.title,
      originalData.memo,
      originalData.allDay,
      originalData.location,
      originalData.url,
    )

    const decoded = decodeTimeTreeURL(generatedUrl)
    expect(decoded.t).toBe(originalData.title)
    expect(decoded.n).toBe(originalData.memo)
    expect(decoded.l).toBe(originalData.location)
    expect(decoded.u).toBe(originalData.url)
  })
})
