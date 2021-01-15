const dayjs = require('dayjs')
const holiday = require('taiwan-holiday')

module.exports = async date => {
  const day = dayjs(date)
  if (!day.isValid()) {
    throw new Error('Please provide valid date')
  }

  try {
    const result = await holiday
      .init({ temp_dir: './my-temp' })
      .then(() => {
        return holiday.isHoliday(day.format('YYYY/MM/DD'))
      })
      .catch(error => { throw error })
    return result
  } catch (error) {
    const isWeekend = day.day() === 0 || day.day() === 6
    return isWeekend
  }
}
