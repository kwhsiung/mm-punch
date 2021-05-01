const proxies = require('../proxies')
const canConnectToLoginPage = require('./checkConnectToLoginPage')

module.exports = async () => {
  for (const proxy of proxies) {
    const { ip, port, protocol } = proxy
    const uri = `${protocol}://${ip}:${port}`
    const args = [
      '--no-sandbox',
      `--proxy-server=${uri}`
    ]
    if (await canConnectToLoginPage(args)) {
      console.log(`[proxy] try to use proxy: ${uri} successfully`)
      return uri
    } else {
      console.error(`[proxy] try to use proxy: ${uri} fail`)
    }
  }
}
