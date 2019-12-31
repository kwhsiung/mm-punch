jest.setTimeout(100000)

require('dotenv').config()

const createPunchRobot = require('../src/robot')

describe('retry mechanism', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('will throw "check manually" error after reach retry limit', async () => {
    jest.mock('../src/punchMachine', () => {
      return jest.fn(() => {
        throw new Error('mock error')
      })
    })

    await expect(createPunchRobot({}))
      .rejects
      .toThrow('We have some issues about proxies, should check manually')
  })
})
