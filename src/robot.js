const checkHoliday = require('./holiday')
const findProxy = require('./proxy')
const createPunchMachine = require('./punchMachine')

const createPunchRobot = async ({ id = '', password = '' }) => {
  /*
  ** mm's punch website block foreign ip,
  ** so we need to find available proxy host in taiwan first.
  */
  const proxy = await findProxy()

  const punchMachine = await createPunchMachine({
    id,
    password,
    browserOptions: {
      args: [
        '--no-sandbox',
        `--proxy-server=${proxy}`
      ]
    }
  })
  const punch = async action => {
    const logger = require('./logger')({ action, id })

    const today = new Date()

    const isHoliday = await checkHoliday(today)
    logger.log(`[robot] Today is holiday? ${isHoliday}`)

    const isVacation = await punchMachine.checkVacation(today)
    logger.log(`[robot] Today is vacation? ${isVacation}`)

    const shouldTodayPunch = !isHoliday && !isVacation
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
