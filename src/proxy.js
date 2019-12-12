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
      await page.goto(urls.pageLogin)
      await browser.close()
      console.log(`[proxy] try to use proxy: ${uri} successfully`)
      return uri
    } catch (error) {
      console.error(`[proxy] try to use proxy: ${uri} fail`)
      // console.error(error)
      await browser.close()
    }
  }
}
