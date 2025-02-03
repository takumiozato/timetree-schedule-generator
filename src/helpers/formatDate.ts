// 日時フォーマット
export const formatDate = (date: Date | null, time: string) => {
  if (!date) return ''

  // 利用者のタイムゾーンを取得
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // 日付を利用者のタイムゾーンに合わせて調整
  const dateObj = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    timeZone: userTimeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }

  // 時間部分をリセット
  dateObj.setHours(0, 0, 0, 0)

  // timeが指定されていればその時間を設定
  if (time) {
    const [hours, minutes] = time.split(':').map(Number)
    dateObj.setHours(hours, minutes, 0, 0)
  }

  // 利用者のタイムゾーンに基づいてフォーマット
  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(
    dateObj,
  )
  const [day, month, year, hours, minutes] = formattedDate.match(/(\d+)/g) || []

  const offset = new Date().getTimezoneOffset() // クライアントのタイムゾーンオフセット（分単位）
  const sign = offset > 0 ? '-' : '+'
  const absOffset = Math.abs(offset)
  const offsetString = `${sign}${String(absOffset / 60).padStart(2, '0')}${String(absOffset % 60).padStart(2, '0')}`

  return `${year}${month}${day}T${hours}${minutes}00${offsetString}`
}
