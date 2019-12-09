const dayjs = require('dayjs')

const heads = [
  '單況',
  '員工工號',
  '人員',
  '部門編號',
  '部門名稱',
  '請假單號',
  '單據日期',
  '假別中類',
  '假別小類',
  '起始日期',
  '起始時間',
  '結束日期',
  '結束時間',
  '請假時數',
  '請假分鐘數',
  '銷假時數',
  '銷假分鐘數',
  '實際請假時數',
  '實際請假分鐘數',
  '請假說明'
]

const isStatusValid = cells => {
  console.log('[vacationValidator] Validate vacation status')

  const statusInCell = cells[heads.indexOf('單況')]
  console.log(`[vacationValidator] statusInCell is: ${statusInCell}`)

  const result = statusInCell !== '底稿' && statusInCell !== '作廢'
  console.log(`[vacationValidator] statusInCell is ${result ? 'valid' : 'invalid'}`)

  return result
}
const isIdValid =
  (cells, id) => {
    console.log('[vacationValidator]  Validate vacation id')

    const idInCell = cells[heads.indexOf('員工工號')]
    console.log(`[vacationValidator] idInCell is: ${idInCell}`)

    const result = idInCell === id.toUpperCase()
    console.log(`[vacationValidator] idInCell is ${result ? 'valid' : 'invalid'}`)

    return result
  }
const isDateValid =
  (cells, day) => {
    console.log('[vacationValidator] Validate vacation date')

    const startDateInCell = cells[heads.indexOf('起始日期')]
    const endDateInCell = cells[heads.indexOf('結束日期')]
    console.log(`[vacationValidator] startDateInCell is: ${startDateInCell}`)
    console.log(`[vacationValidator] endDateInCell is: ${endDateInCell}`)
    console.log(`[vacationValidator] day is: ${day.format('YYYY/MM/DD')}`)

    const result = (
      dayjs(startDateInCell).isBefore(day) &&
      dayjs(endDateInCell).isAfter(day)
    ) || (
      dayjs(startDateInCell).isSame(day) &&
      dayjs(endDateInCell).isSame(day)
    )
    console.log(`[vacationValidator] startDateInCell/endDateInCell is ${result ? 'valid' : 'invalid'}`)

    return result
  }

module.exports = ({ cells, id, day }) => {
  const isVacationValid =
    isStatusValid(cells) && isIdValid(cells, id) && isDateValid(cells, day)
  console.log(`[vacationValidator] vacation is ${isVacationValid ? 'valid' : 'invalid'}`)

  return isVacationValid
}
