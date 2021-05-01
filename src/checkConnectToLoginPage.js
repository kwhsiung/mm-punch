const puppeteer = require('puppeteer')
const { urls } = require('../config')

module.exports = async function canConnectToLoginPage (args = []) {
  const browser = await puppeteer.launch({
    args
  })
  const page = await browser.newPage()
  try {
    await page.goto(urls.pageLogin)
    await browser.close()
    return true
  } catch (error) {
    // console.error(error)
    await browser.close()
    return false
  }
}
