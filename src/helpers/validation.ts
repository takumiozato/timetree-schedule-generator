import { getDateOnly } from './getDateOnly'

export function isValidEndTimeForTimedDay(startDate: Date, endDate: Date, startTime: string, endTime: string): boolean {
  const startDateOnly = getDateOnly(startDate)
  const endDateOnly = getDateOnly(endDate)

  const startHour = parseInt(startTime.split(':')[0], 10)
  const endHour = parseInt(endTime.split(':')[0], 10)

  if (
    startDateOnly > endDateOnly ||
    (startDateOnly == endDateOnly && endHour < startHour)
  ) {
    return false
  }


  return true
}

export function isValidEndTimeForAllDay(startDate: Date, endDate: Date): boolean {
  const startDateOnly = getDateOnly(startDate)
  const endDateOnly = getDateOnly(endDate)

  if (startDateOnly > endDateOnly) {
    return false
  }


  return true
}
