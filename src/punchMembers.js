require('dotenv').config()
const forEach = require('lodash/forEach')
const firebase = require('firebase')
firebase.initializeApp({
  databaseURL: process.env.DATABASE_URL
})

const punch = require('./punch')

const action = process.argv[2]

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
      const payload = Object.assign(memberData, { action, name: memberName })
      punch(payload)
    })
  })
