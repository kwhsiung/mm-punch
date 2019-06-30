require('dotenv').config()
const groupBy = require('lodash/groupBy')
const mapValues = require('lodash/mapValues')
const find = require('lodash/find')

const memberConfigVars =
  Object.entries(process.env)
    .filter(variable => variable[0].includes('MM_MEMBER'))

const getMembers = () => {
  const groupByMemberName = groupBy(memberConfigVars, d => {
    const split = d[0].split('_')
    const name = split[split.length - 1]
    return name
  })

  return mapValues(groupByMemberName, (d, name) => {
    const idKeyValue = find(d, d => d[0].includes('ID'))
    const passwordKeyValue = find(d, d => d[0].includes('PASSWORD'))

    return {
      name,
      id: idKeyValue[1],
      password: passwordKeyValue[1]
    }
  })
}

module.exports = {
  'urls': {
    'pageLogin': 'https://mirrormedia.asia/SCSWeb/',
    'pagePunch': 'https://mirrormedia.asia/scsweb/HRM/ATT/AttEmpOnlineSwipe.aspx',
    'pageCheckVacation': 'https://mirrormedia.asia/scsweb/HRM/ATT/AttEmpLeaveAndOverQuery.aspx'
  },
  'selectors': {
    'login': {
      'user': '#txtUserName_I',
      'password': '#txtPassword_I',
      'submit': '#btnLogin'
    },
    'punch': {
      'in': '#btnOnSwipe',
      'out': '#btnOffSwipe'
    },
    'vacation': {
      'inputStartDate': '#TDE_StartDate_I',
      'inputEndDate': '#TDE_EndDate_I',
      'submit': '#BT_Query_CD',
      'table': '#TGV_Leave_DXMainTable',
      'emptyDataHint': '#TGV_Leave_DXEmptyRow > .dxgv.dxgvPHEC > div',
      'nonEmptyDataRow': '#TGV_Leave_DXDataRow0 > td'
    }
  },
  // "members": {
  //   "SOMEONE": {
  //     "id": "id",
  //     "password": "password"
  //   }
  // },
  'members': getMembers()
}
