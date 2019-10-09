const puppeteer = require('puppeteer')
const proxies = require('../proxies')
const { urls } = require('../config')

module.exports = async () => {
  for (const proxy of proxies) {
    const { ip, port, protocol } = proxy
    const uri = `${protocol}://${ip}:${port}`

    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        `--proxy-server=${uri}`
      ]
    })
    const page = await browser.newPage()
    try {
      console.log(`try to use proxy: ${uri} successfully`)
      await page.goto(urls.pageLogin)
      await browser.close()
      console.log(`proxy: ${uri} is connectable`)
      return uri
    } catch (error) {
      console.error(`try to use proxy: ${uri} fail`)
      console.error(error)
      await browser.close()
    }
  }
}
