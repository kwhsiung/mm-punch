const puppeteer = require('puppeteer')
const _shouldTodayPunch = require('./shouldTodayPunch')
const fetchAvalibleProxy = require('./fetchAvalibleProxy')
const {
  urls,
  selectors
} = require('../config')

const _performlogin = async (browser, { id, password }) => {
  const pageLogin = await browser.newPage()
  await pageLogin.goto(urls.pageLogin, { timeout: 0 })
  await pageLogin.type(selectors.login.user, id)
  await pageLogin.type(selectors.login.password, password)
  const loginBtn = await pageLogin.$(selectors.login.submit)
  await loginBtn.click()
}
const _performPunch = async (browser, { name, id, action }) => {
  const pagePunch = await browser.newPage()
  await pagePunch.goto(urls.pagePunch)
  pagePunch.on('dialog', async dialog => {
    console.log(`${name}/${id}/punch-${action}: The dialog after punch ${action} for ${name}/${id}`)
    console.log(dialog.message())
    await dialog.dismiss()

    console.log(`${name}/${id}/punch-${action}: Close the browser, bye bye ${name}/${id}, see you next punch`)
    await browser.close()
  })

  const punch = await pagePunch.$(selectors.punch[action])
  if (process.env.NODE_ENV !== 'development') {
    await punch.click()
  }
}

const punch = async payload => {
  const { action, name, id } = payload
  console.log(`${name}/${id}/punch-${action}: Start punch ${action} for ${name}/${id}`)

  const proxy = await fetchAvalibleProxy()
  const browser = await puppeteer.launch({
    headless: process.env.NODE_ENV !== 'development',
    slowMo: process.env.NODE_ENV !== 'development' ? 0 : 250,
    args: [
      '--no-sandbox',
      `--proxy-server=${proxy}`
    ]
  })

  await _performlogin(browser, payload)
  if (await _shouldTodayPunch(browser, payload)) {
    console.log(`${name}/${id}/punch-${action}: ${name} should punch ${action} today, preparing`)
    await _performPunch(browser, payload)
  } else {
    console.log(`${name}/${id}/punch-${action}: ${name} should NOT punch ${action} today, due to holiday or vacation`)
    console.log(`${name}/${id}/punch-${action}: Close the browser, bye bye ${name}/${id}, see you next punch`)
    await browser.close()
  }
}

module.exports = punch
