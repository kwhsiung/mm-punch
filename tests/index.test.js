const Member = require('../src/member')

const testMember = {
  id: 'testId',
  password: 'testPassword'
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

describe('constructor validation', () => {
  it('should be initialize with proper member info', () => {
    const member = new Member(testMember)
    expect(member.id).toBe('testId')
    expect(member.password).toBe('testPassword')
  })
  it('should throw error if id is missing', () => {
    expect(() => new Member(testMemberMissingId))
      .toThrow()
  })
  it('should throw error if password is missing', () => {
    expect(() => new Member(testMemberMissingPassword))
      .toThrow()
  })
  it('should throw error if id is not string', () => {
    expect(() => new Member(testMemberInvalidId))
      .toThrow()
  })
  it('should throw error if password is not string', () => {
    expect(() => new Member(testMemberInvalidPassword))
      .toThrow()
  })
})

describe('browser handling', () => {
  it('should throw error when getting the browser if we not launch manually yet', () => {
    const member = new Member(testMember)
    expect(() => member.browser).toThrow()
  })
  it('should return "Browser" if we access browser launched before', async () => {
    const member = new Member(testMember)
    await member.lunchBrowser()
    expect(member.browser.constructor.name).toBe('Browser')
  })
})
