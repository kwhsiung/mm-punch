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
  }
}
