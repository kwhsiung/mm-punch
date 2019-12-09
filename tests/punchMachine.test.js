require('dotenv').config()
const trim = require('lodash/trim')
const createPunchMachine = require('../src/punchMachine')

const realMember = {
  id: process.env.TEST_PUNCH_ID,
  password: process.env.TEST_PUNCH_PASSWORD
}
const realMemberWrongPassword = {
  id: process.env.TEST_PUNCH_ID,
  password: process.env.TEST_PUNCH_PASSWORD_WRONG
}
const testMemberMissingId = {
  password: 'testPassword'
}
const testMemberMissingPassword = {
  id: 'testId'
}
const testMemberInvalidId = {
  id: {},
  password: 'testPassword'
}
const testMemberInvalidPassword = {
  id: 'testId',
  password: {}
}

describe('validations if we provide invalid type of member info', () => {
  it('should throw error if id is missing', async () => {
    await expect(createPunchMachine(testMemberMissingId))
      .rejects
      .toThrow(`Please provide required id/password, some of your id: "${''}" or password: "${testMemberMissingId.password}" is invalide`)
  })
  it('should throw error if password is missing', async () => {
    await expect(createPunchMachine(testMemberMissingPassword))
      .rejects
      .toThrow(`Please provide required id/password, some of your id: "${testMemberMissingPassword.id}" or password: "${''}" is invalide`)
  })
  it('should throw error if id is not string', async () => {
    await expect(createPunchMachine(testMemberInvalidId))
      .rejects
      .toThrow(`Please provide required id/password, some of your id: "${testMemberInvalidId.id}" or password: "${testMemberInvalidId.password}" is invalide`)
  })
  it('should throw error if password is not string', async () => {
    await expect(createPunchMachine(testMemberInvalidPassword))
      .rejects
      .toThrow(`Please provide required id/password, some of your id: "${testMemberInvalidPassword.id}" or password: "${testMemberInvalidPassword.password}" is invalide`)
  })
})

describe('features if we provide valid type of member info', () => {
  let punchMachine
  beforeAll(async () => {
    punchMachine = await createPunchMachine(realMember)
  })

  it('should throw error if we provide incorrect member info', async () => {
    await expect(createPunchMachine(realMemberWrongPassword))
      .rejects
      .toThrow('Member id/password wrong')
  })
  it('should throw error if we provide invalid date before check vacation', async () => {
    await expect(punchMachine.checkVacation(''))
      .rejects
      .toThrow('Please provide valid date before checking vacation')
  })
  it('could check vacation', async () => {
    const isVacation = await punchMachine.checkVacation(new Date(process.env.TEST_PUNCH_VACATION_DATE))
    const isNotVacation = await punchMachine.checkVacation(new Date(process.env.TEST_PUNCH_NORMAL_DATE))
    expect(isVacation).toBe(true)
    expect(isNotVacation).toBe(false)
  }, 100000)
  it('should throw error when not specify punch action (in/out)', async () => {
    await expect(punchMachine.punch())
      .rejects
      .toThrow('Please provide actual punch action: in or out')
  })
  it('could punchIn', async () => {
    const button = await punchMachine.punch('in')
    const text = await (await button.getProperty('textContent')).jsonValue()
    expect(trim(text)).toBe('上　　班')
  }, 100000)
  it('could punchOut', async () => {
    const button = await punchMachine.punch('out')
    const text = await (await button.getProperty('textContent')).jsonValue()
    expect(trim(text)).toBe('下　　班')
  }, 100000)
})
