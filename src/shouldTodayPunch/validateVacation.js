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

const isStatusValid =
  (cells, action, name, id) => {
    console.log(`${name}/${id}/punch-${action}: Validate ${name}/${id}'s vacation status`)

    const statusInCell = cells[heads.indexOf('單況')]
    console.log(`${name}/${id}/punch-${action}: statusInCell is: ${statusInCell}`)

    const result = statusInCell !== '底稿' && statusInCell !== '作廢'
    console.log(`${name}/${id}/punch-${action}: statusInCell is ${result ? 'valid' : 'invalid'}`)

    return result
  }
const isIdValid =
  (cells, action, name, id) => {
    console.log(`${name}/${id}/punch-${action}: Validate ${name}/${id}'s vacation id`)

    const idInCell = cells[heads.indexOf('員工工號')]
    console.log(`${name}/${id}/punch-${action}: idInCell is: ${idInCell}`)

    const result = idInCell === id
    console.log(`${name}/${id}/punch-${action}: idInCell is ${result ? 'valid' : 'invalid'}`)

    return result
  }
const isDateValid =
  (cells, action, name, id, today) => {
    console.log(`${name}/${id}/punch-${action}: Validate ${name}/${id}'s vacation date`)

    const startDateInCell = cells[heads.indexOf('起始日期')]
    const endDateInCell = cells[heads.indexOf('結束日期')]
    console.log(`${name}/${id}/punch-${action}: startDateInCell is: ${startDateInCell}`)
    console.log(`${name}/${id}/punch-${action}: endDateInCell is: ${endDateInCell}`)
    console.log(`${name}/${id}/punch-${action}: today is: ${today.format('YYYY/MM/DD')}`)

    const result = (
      dayjs(startDateInCell).isBefore(today) &&
      dayjs(endDateInCell).isAfter(today)
    ) || (
      dayjs(startDateInCell).isSame(today) &&
      dayjs(endDateInCell).isSame(today)
    )
    console.log(`${name}/${id}/punch-${action}: startDateInCell/endDateInCell is ${result ? 'valid' : 'invalid'}`)

    return result
  }

module.exports = (cells, { action, name, id, today }) => {
  console.log(`${name}/${id}/punch-${action}: Should Validate vacation for ${name}/${id} on ${today.format('YYYY/MM/DD')}`)
  const isVacationValid =
    isStatusValid(cells, action, name, id) && isIdValid(cells, action, name, id) && isDateValid(cells, action, name, id, today)
  return isVacationValid
}
