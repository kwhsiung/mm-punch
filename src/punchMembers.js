require('dotenv').config()
const forEach = require('lodash/forEach')
const firebase = require('firebase')
firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  databaseURL: process.env.DATABASE_URL
})
firebase
  .auth()
  .signInWithEmailAndPassword(
    process.env.FIREBASE_AUTH_EMAIL,
    process.env.FIREBASE_AUTH_PASSWORD
  )

const punch = require('./punch')

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
      //     'password': 'password'
      //   }
      // }
      const members = snapshot.val()
      forEach(members, (memberData, memberName) => {
        memberName = memberName.toUpperCase()
        memberData.id = memberData.id.toUpperCase()

        const randomMins = Math.floor((Math.random() * 20 * min) + 1)
        console.log(`Will punch ${memberName} after ${randomMins / min} mins`)

        setTimeout(() => {
          const payload = Object.assign(memberData, { action, name: memberName })
          punch(payload)
        }, randomMins)
      })
    })
}
