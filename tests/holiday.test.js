const checkHoliday = require('../src/holiday')

describe('check for holiday', () => {
  it('should throw error if we pass invalide format parameter', async () => {
    await expect(checkHoliday('')).rejects.toThrow()
  })
  it('should return Boolean if we pass valide format parameter', async () => {
    const isTodayHoliday = await checkHoliday(new Date())
    expect(typeof isTodayHoliday === 'boolean').toBe(true)
  })
  it('should return true if we really pass a holiday as parameter', async () => {
    const isTodayHoliday = await checkHoliday('2019/01/01')
    expect(isTodayHoliday).toBe(true)
  })
  it('should return false if we not pass a holiday as parameter', async () => {
    const isTodayHoliday = await checkHoliday('2019/01/02')
    expect(isTodayHoliday).toBe(false)
  })
})
