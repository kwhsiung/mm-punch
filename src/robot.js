const findProxy = require('./proxy')
const createPunchMachine = require('./punchMachine')
const canConnectToLoginPage = require('./checkConnectToLoginPage')

const createPunchRobot = async ({ id = '', password = '' }) => {
  /*
  ** mm's punch website block foreign ip,
  ** so we need to find available proxy host in taiwan first.
  **
  ** but we still may encounter connection issue after we find available proxy
  ** if so, try again
  */
  let punchMachine
  const defaultArgs = ['--no-sandbox']
  console.log('[robot] try to connect to login page without proxy')
  if (await canConnectToLoginPage(defaultArgs)) {
    console.log('[robot] success to connect to login page without proxy')
    punchMachine = await createPunchMachine({ id, password, browserOptions: { args: defaultArgs } })
  } else {
    console.log('[robot] fail to connect to login page without proxy')
    let retryCount = 0
    const retryCountLimit = 10
    while (true) {
      const proxy = await findProxy()
      try {
        punchMachine = await createPunchMachine({
          id,
          password,
          browserOptions: {
            args: [
              '--no-sandbox',
              `--proxy-server=${proxy}`
            ]
          }
        })
        break
      } catch (error) {
        retryCount += 1
        console.warn(`[robot] We have some issues about proxies, retry count: ${retryCount}/${retryCountLimit}`)
        if (retryCount === retryCountLimit) {
          throw new Error('We have some issues about proxies, should check manually')
        }
      }
    }
  }

  const punch = async action => {
    const logger = require('./logger')({ action, id })

    const today = new Date()

    const isVacation = await punchMachine.checkVacation(today)
    logger.log(`[robot] Today is vacation? ${isVacation}`)

    const shouldTodayPunch = !isVacation
    logger.log(`[robot] Today should punch? ${shouldTodayPunch}`)

    if (shouldTodayPunch) {
      logger.log('[robot] Insert member info into punchMachine, prepare for punch')

      if (process.env.NODE_ENV === 'production') {
        await punchMachine.punch(action, async (err, { dialog, browser }) => {
          if (err) {
            throw new Error(err)
          }

          logger.log(dialog.message())
          await dialog.dismiss()
          await browser.close()
        })
      } else {
        await punchMachine.punch(action)
        await punchMachine.quit()
      }
    } else {
      logger.log('[robot] Simply turn off the punchMachine, do not punch today')
      await punchMachine.quit()
    }
  }

  return {
    punch
  }
}

module.exports = createPunchRobot
