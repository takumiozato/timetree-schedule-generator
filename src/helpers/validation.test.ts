import { isValidEndTimeForTimedDay, isValidEndTimeForAllDay } from './validation'
import { Mock } from 'vitest'
import { getDateOnly } from './getDateOnly'

vi.mock('./getDateOnly')

describe('isValidEndTime', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('終了日時が開始日時より前の場合、エラーメッセージを返す (終日=true)', () => {
    const startDate = new Date('2025-02-02')
    const endDate = new Date('2025-02-01')

      // getDateOnlyのモック
      ; (getDateOnly as Mock).mockReturnValueOnce(startDate.getTime())
      ; (getDateOnly as Mock).mockReturnValueOnce(endDate.getTime())

    const result = isValidEndTimeForAllDay(startDate, endDate)
    expect(result).toBe(false)
  })

  it('終了日時が開始日時より後ろの場合、trueを返す (終日=true)', () => {
    const startDate = new Date('2025-01-01')
    const endDate = new Date('2025-01-02')

      // getDateOnlyのモック
      ; (getDateOnly as Mock).mockReturnValueOnce(startDate.getTime())
      ; (getDateOnly as Mock).mockReturnValueOnce(endDate.getTime())

    const result = isValidEndTimeForAllDay(startDate, endDate)
    expect(result).toBe(true)
  })

  it('終了時間が開始時間より後ろの場合、trueを返す (終日=false)', () => {
    const startDate = new Date('2025-01-01')
    const endDate = new Date('2025-01-01')
    const startTime = '10:00'
    const endTime = '12:00'

      // getDateOnlyのモック
      ; (getDateOnly as Mock).mockReturnValueOnce(startDate.getTime())
      ; (getDateOnly as Mock).mockReturnValueOnce(endDate.getTime())

    const result = isValidEndTimeForTimedDay(startDate, endDate, startTime, endTime)
    expect(result).toBe(true)
  })

  it('終了日時が開始日時と同じで終了時間が後ろの場合、trueを返す (終日=false)', () => {
    const startDate = new Date('2025-01-01')
    const endDate = new Date('2025-01-01')
    const startTime = '10:00'
    const endTime = '12:00'

      // getDateOnlyのモック
      ; (getDateOnly as Mock).mockReturnValueOnce(startDate.getTime())
      ; (getDateOnly as Mock).mockReturnValueOnce(endDate.getTime())

    const result = isValidEndTimeForTimedDay(startDate, endDate, startTime, endTime)
    expect(result).toBe(true)
  })

  it('終了日時が開始日時と同じ場合、終了時間が開始時間より早い場合、エラーメッセージを返す (終日=false)', () => {
    const startDate = new Date('2025-01-01')
    const endDate = new Date('2025-01-01')
    const startTime = '10:00'
    const endTime = '09:00'

      // getDateOnlyのモック
      ; (getDateOnly as Mock).mockReturnValueOnce(startDate.getTime())
      ; (getDateOnly as Mock).mockReturnValueOnce(endDate.getTime())

    const result = isValidEndTimeForTimedDay(startDate, endDate, startTime, endTime)
    expect(result).toBe(false)
  })
})
