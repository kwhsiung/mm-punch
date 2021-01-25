const checkHoliday = require('./holiday')

if (process.env.NODE_ENV === 'production') {
  const CronJob = require('cron').CronJob
  const every9AMDaily = '0 0 9 * * *'
  const every8PMDaily = '0 0 19 * * *'
  const timeZone = 'Asia/Taipei'

  const punchMembers = require('./members')

  const handleOnTick = action => {
    return async () => {
      const today = new Date()
      const isHoliday = await checkHoliday(today)
      if (!isHoliday) {
        punchMembers(action)
      } else {
        console.log('[cron] Today is holiday, skip the punch process')
      }
    }
  }
  const jobPunchMembersIn = new CronJob({
    cronTime: every9AMDaily,
    onTick: handleOnTick('in'),
    timeZone
  })
  const jobPunchMembersOut = new CronJob({
    cronTime: every8PMDaily,
    onTick: handleOnTick('out'),
    timeZone
  })

  jobPunchMembersIn.start()
  jobPunchMembersOut.start()
} else {
  require('dotenv').config()
  const createPunchRobot = require('./robot')
  const startRobot = async () => {
    const today = new Date()
    const isHoliday = await checkHoliday(today)
    if (!isHoliday) {
      const robot = await createPunchRobot({
        id: process.env.TEST_PUNCH_ID,
        password: process.env.TEST_PUNCH_PASSWORD
      })
      await robot.punch('out')
    } else {
      console.log('[cron] Today is holiday, skip the punch process')
    }
  }
  startRobot()
}
