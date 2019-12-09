const dayjs = require('dayjs')
const holiday = require('taiwan-holiday')

module.exports = async date => {
  const day = dayjs(date)
  if (!day.isValid()) {
    throw new Error('Please provide valid date')
  }

  const result = await holiday
    .init()
    .then(() => {
      return holiday.isHoliday(day.format('YYYY/MM/DD'))
    })
  return result
}
