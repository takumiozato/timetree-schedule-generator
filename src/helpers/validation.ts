import { getDateOnly } from './getDateOnly';

export function isValidEndTime(watch: any, allDay: boolean) {
    const startDate = watch("startDate");
    const endDate = watch("endDate");
    const startTime = watch("startTime");
    const endTime = watch("endTime");

    const startDateOnly = getDateOnly(startDate);
    const endDateOnly = getDateOnly(endDate);

    const errorMessage = "終了日時が開始日時を超えています";

    if (allDay) {
        if (startDateOnly > endDateOnly) {
            return errorMessage;
        }
    } else {
        const startHour = parseInt(startTime.split(":")[0], 10);
        const endHour = parseInt(endTime.split(":")[0], 10);

        if (startDateOnly > endDateOnly || (startDateOnly == endDateOnly && endHour < startHour)) {
            return errorMessage;
        }
    }

    return true;
}