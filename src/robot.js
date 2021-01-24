// const findProxy = require('./proxy')
const createPunchMachine = require('./punchMachine')

const createPunchRobot = async ({ id = '', password = '' }) => {
  /*
  ** mm's punch website block foreign ip,
  ** so we need to find available proxy host in taiwan first.
  **
  ** but we still may encounter connection issue after we find available proxy
  ** if so, try again
  */
  let retryCount = 0
  const retryCountLimit = 10
  let punchMachine
  while (true) {
    // const proxy = await findProxy()
    try {
      punchMachine = await createPunchMachine({
        id,
        // id: 'M0634',
        password,
        // password: 'Readr Is 100% Awesome!',
        browserOptions: {
          args: [
            '--no-sandbox',
            '--disable-dev-shm-usag',
            '--disable-setuid-sandbox',
            // For personal usage, we disable the use of proxy
            // `--proxy-server=${proxy}`
          ],
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
