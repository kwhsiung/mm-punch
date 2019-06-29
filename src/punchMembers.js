const forEach = require('lodash/forEach')

const punch = require('./punch')
const { members } = require('../config')

const action = process.argv[2]

forEach(members, memberData => {
  const payload = Object.assign(memberData, { action })
  punch(payload)
})
