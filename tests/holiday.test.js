const checkHoliday = require('../src/holiday')

describe('check for holiday', () => {
  it('should throw error if we pass invalide format parameter', async () => {
    await expect(checkHoliday('')).rejects.toThrow()
  })
  it('should return Boolean if we pass valide format parameter', async () => {
    const isTodayHoliday = await checkHoliday(new Date())
    expect(typeof isTodayHoliday === 'boolean').toBe(true)
  })
  it('should check saturday/sunday if taiwan-holiday package broken', async () => {
    const isSaturday = await checkHoliday('2019/01/05')
    const isSunday = await checkHoliday('2019/01/06')
    const isMonday = await checkHoliday('2019/01/07')
    expect(isSaturday).toBe(true)
    expect(isSunday).toBe(true)
    expect(isMonday).toBe(false)
  })
})
