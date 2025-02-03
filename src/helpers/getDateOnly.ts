export const getDateOnly = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}
