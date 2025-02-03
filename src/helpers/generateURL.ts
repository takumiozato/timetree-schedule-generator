import pako from 'pako'
import { formatDate } from './formatDate'

export function generateURL(
  startDate: Date | null,
  startTime: string,
  endDate: Date | null,
  endTime: string,
  title: string,
  memo: string,
  allDay: boolean,
  location: string,
  url: string,
) {
  const start = formatDate(startDate, allDay ? '' : startTime)
  const end = formatDate(endDate, allDay ? '' : endTime)

  // 予定データの組み立て
  const eventData = {
    c: 1,
    t: title,
    n: memo,
    s: start,
    e: end,
    a: allDay ? true : false,
    l: location,
    u: url,
  }

  // JSON文字列に変換
  const jsonString = JSON.stringify(eventData)

  // gzip圧縮
  const compressed = pako.gzip(jsonString)

  // Base64エンコード
  const uint8ArrayToBase64 = (uint8Array: Uint8Array): string => {
    let binary = ''
    uint8Array.forEach((byte) => {
      binary += String.fromCharCode(byte)
    })
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  }
  const base64Data = uint8ArrayToBase64(compressed)

  // Timetree用URLを生成
  return `https://timetr.ee/ne/${base64Data}`
}
