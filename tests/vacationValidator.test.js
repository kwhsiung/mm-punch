require('dotenv').config()

const dayjs = require('dayjs')
const validateVacation = require('../src/vacationValidator')
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
let cellsValid = [
  '核准',
  process.env.TEST_PUNCH_ID.toUpperCase(),
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  dayjs().format('YYYY/MM/DD'), // same day as today
  '',
  dayjs().format('YYYY/MM/DD'), // same day as today
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  ''
]

describe('validate mock cells with scenarios which should pass', () => {
  it('will pass validation with mocked cells', () => {
    expect(validateVacation({
      cells: cellsValid,
      id: process.env.TEST_PUNCH_ID,
      day: dayjs(new Date())
    })).toBe(true)
  })
  it('will pass validation with mocked cells, but id with lowercase', () => {
    expect(validateVacation({
      cells: cellsValid,
      id: process.env.TEST_PUNCH_ID.toLocaleLowerCase(),
      day: dayjs(new Date())
    })).toBe(true)
  })
  it('will pass validation with mocked cells, but modified date range', () => {
    let cells = Object.assign({}, cellsValid)
    let startDate = cells[heads.indexOf('起始日期')]
    startDate = dayjs(startDate).subtract(1, 'day').format('YYYY/MM/DD')
    cells[heads.indexOf('起始日期')] = startDate
    expect(validateVacation({
      cells: cells,
      id: process.env.TEST_PUNCH_ID,
      day: dayjs(new Date())
    })).toBe(true)

    let endDate = cells[heads.indexOf('結束日期')]
    endDate = dayjs(endDate).add(1, 'day').format('YYYY/MM/DD')
    cells[heads.indexOf('結束日期')] = endDate
    expect(validateVacation({
      cells: cells,
      id: process.env.TEST_PUNCH_ID,
      day: dayjs(new Date())
    })).toBe(true)
  })
})

describe('validate mock cells with scenarios which should fail', () => {
  it('will fail if status is invalid', () => {
    let cells = Object.assign({}, cellsValid)
    cells[heads.indexOf('單況')] = '底稿'
    expect(validateVacation({
      cells: cells,
      id: process.env.TEST_PUNCH_ID,
      day: dayjs(new Date())
    })).toBe(false)

    cells[heads.indexOf('單況')] = '作廢'
    expect(validateVacation({
      cells: cells,
      id: process.env.TEST_PUNCH_ID,
      day: dayjs(new Date())
    })).toBe(false)
  })
  it('will fail if id is invalid', () => {
    expect(validateVacation({
      cells: cellsValid,
      id: 'just a random id',
      day: dayjs(new Date())
    })).toBe(false)
  })
  it('will fail if start date and end date are invalid', () => {
    expect(validateVacation({
      cells: cellsValid,
      id: process.env.TEST_PUNCH_ID,
      day: dayjs(new Date()).add(1, 'day')
    })).toBe(false)
    expect(validateVacation({
      cells: cellsValid,
      id: process.env.TEST_PUNCH_ID,
      day: dayjs(new Date()).subtract(1, 'day')
    })).toBe(false)
  })
})
