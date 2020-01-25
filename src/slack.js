require('dotenv').config()

const axios = require('axios')
const _axios = axios.create({
  baseURL: 'https://slack.com/api',
  timeout: 3000,
  headers: {
    'Authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
  }
})

const sendMessage = async (message = '', to = '') => {
  if (!to || to === '') {
    throw new Error('[slack] Please provide valid "to" parameter')
  }

  try {
    return await _axios.post(
      '/chat.postMessage',
      {
        channel: to,
        text: message
      }
    )
  } catch (error) {
    throw new Error('[slack] We have encounter error while exec sendMessage')
  }
}

module.exports = {
  sendMessage
}
