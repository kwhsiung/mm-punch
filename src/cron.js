const CronJob = require('cron').CronJob
const every10AMDaily = '0 0 10 * * *'
const every8PMDaily = '0 0 20 * * *'
const timeZone = 'Asia/Taipei'

const punchMembers = require('./punchMembers')

const jobPunchMembersIn = new CronJob({
  cronTime: every10AMDaily,
  onTick () {
    punchMembers('in')
  },
  timeZone
})
const jobPunchMembersOut = new CronJob({
  cronTime: every8PMDaily,
  onTick () {
    punchMembers('out')
  },
  timeZone
})

jobPunchMembersIn.start()
jobPunchMembersOut.start()
