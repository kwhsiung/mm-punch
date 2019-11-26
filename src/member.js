const puppeteer = require('puppeteer')
const { urls } = require('../config')

class Member {
  constructor ({ id = '', password = '' }) {
    const isIdInvalid = typeof id !== 'string' || id === ''
    const isPasswordInvalid = typeof password !== 'string' || password === ''
    if (isIdInvalid || isPasswordInvalid) {
      throw new Error(
        `Please provide required id/password, some of your id: "${id}" or password: "${password}" is invalide`
      )
    }

    this.id = id
    this.password = password
    this._browser = null
  }

  get browser () {
    if (this._browser === null || this._browser.constructor.name !== 'Browser') {
      throw new Error('Browser was not been launched yet')
    }
    return this._browser
  }
  set browser (browser) {
    this._browser = browser
  }

  async lunchBrowser () {
    const browser = await puppeteer.launch()
    this.browser = browser
  }

  async login () {
    await this.lunchBrowser()
    const pageLogin = await this.browser.newPage()
    await pageLogin.goto(urls.pageLogin, { timeout: 0 })
    // await pageLogin.type(selectors.login.user, id)
    // await pageLogin.type(selectors.login.password, password)
    // const loginBtn = await pageLogin.$(selectors.login.submit)
    // await loginBtn.click()
  }
}

// const theMember = new Member({ id: 'test', password: 'test' })
// theMember.login()
// // theMember.punch('in')
// // theMember.punch('out')

module.exports = Member
