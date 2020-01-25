require('dotenv').config()
const forEach = require('lodash/forEach')
const firebase = require('firebase')
firebase
  .initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    databaseURL: process.env.DATABASE_URL
  })
firebase
  .auth()
  .signInWithEmailAndPassword(
    process.env.FIREBASE_AUTH_EMAIL,
    process.env.FIREBASE_AUTH_PASSWORD
  )

const createPunchRobot = require('./robot')
const { sendMessage } = require('./slack')

const sec = 1000
const min = 60 * sec

module.exports = action => {
  firebase
    .database()
    .ref('members')
    .once('value')
    .then(snapshot => {
      // 'members': {
      //   'MemberName': {
      //     'id': 'id',
      //     'password': 'password',
      //     'slackMemberId': 'slackMemberId'
      //   }
      // }
      const members = snapshot.val()
      forEach(members, memberData => {
        const id = memberData.id.toUpperCase()
        const password = memberData.password
        const logger = require('./logger')({ action, id })

        const randomMins = Math.floor((Math.random() * 20 * min) + 1)
        logger.log(`Will punch after ${randomMins / min} mins`)

        setTimeout(async () => {
          try {
            const robot = await createPunchRobot({ id, password })
            await robot.punch(action)
          } catch (error) {
            const isSlackMemberIdExist =
              'slackMemberId' in memberData && memberData.slackMemberId !== ''
            if (isSlackMemberIdExist) {
              let actionZhTW
              switch (action) {
                case 'in':
                  actionZhTW = '上班'
                  break
                case 'out':
                  actionZhTW = '下班'
                  break
              }
              sendMessage(`今日${actionZhTW}自動打卡失敗，請自行檢查並手動打卡。`, memberData.slackMemberId)
            }
            throw new Error(`Robot try to punch ${action} for ${id}, but fail`)
          }
        }, randomMins)
      })
    })
}
