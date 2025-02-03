import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('日付がnullの場合は空文字列を返す', () => {
    const result = formatDate(null, '12:30')
    expect(result).toBe('')
  })

  it('日付のみが指定され、時間が指定されていない場合、正しく日付をフォーマットする', () => {
    const date = new Date('2025-02-02T12:30:00Z')
    const result = formatDate(date, '')
    const expected = '20250202T000000+0000'
    expect(result).toBe(expected)
  })

  it('時間が指定されている場合、指定された時間を反映', () => {
    const date = new Date('2025-02-02T12:30:00Z')
    const result = formatDate(date, '15:45')
    const expected = '20250202T154500+0900'
    expect(result).toBe(expected)
  })
})
