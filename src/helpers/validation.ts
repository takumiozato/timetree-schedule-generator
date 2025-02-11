import { UseFormWatch } from 'react-hook-form'
import { getDateOnly } from './getDateOnly'
import type { FormData } from '../App'

export function isValidEndTime(watch: UseFormWatch<FormData>, allDay: boolean): boolean {
  const startDate = watch('startDate')
  const endDate = watch('endDate')
  const startTime = watch('startTime')
  const endTime = watch('endTime')

  const startDateOnly = getDateOnly(startDate)
  const endDateOnly = getDateOnly(endDate)

  if (allDay) {
    if (startDateOnly > endDateOnly) {
      return false
    }
  } else {
    const startHour = parseInt(startTime.split(':')[0], 10)
    const endHour = parseInt(endTime.split(':')[0], 10)

    if (
      startDateOnly > endDateOnly ||
      (startDateOnly == endDateOnly && endHour < startHour)
    ) {
      return false
    }
  }

  return true
}
