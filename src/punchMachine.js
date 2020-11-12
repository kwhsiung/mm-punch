const puppeteer = require('puppeteer-core')
const dayjs = require('dayjs')
const trim = require('lodash/trim')
const { urls, selectors } = require('../config')
const validateVacation = require('./vacationValidator')

const isMemberInfoTypeInvalid = ({ id = '', password = '' }) => {
  const isIdInvalid = typeof id !== 'string' || id === ''
  const isPasswordInvalid = typeof password !== 'string' || password === ''
  return isIdInvalid || isPasswordInvalid
}

const createPunchMachine = async ({ id = '', password = '', browserOptions = {} }) => {
  if (isMemberInfoTypeInvalid({ id, password })) {
    throw new Error(
      `Please provide required id/password, some of your id: "${id}" or password: "${password}" is invalide`
    )
  }

  const browser = await puppeteer.launch(browserOptions)
  const login = async () => {
    const page = await browser.newPage()
    await page.goto(urls.pageLogin, { timeout: 0 })
    await page.type(selectors.login.user, id)
    await page.type(selectors.login.password, password)
    const loginBtn = await page.$(selectors.login.submit)
    await loginBtn.click()

    await page.waitForNavigation()

    const errorElement = await page.$('#lblWarnningMsg')
    const errorText = errorElement !== null && await page.evaluate(element => element.textContent, errorElement)
    const isWrongMember = errorText === '帳號或密碼錯誤'
    if (isWrongMember) {
      throw new Error('Member id/password wrong')
    } else {
      return page
    }
  }
  const checkVacation = async date => {
    const day = dayjs(date)
    if (!day.isValid()) {
      throw new Error('Please provide valid date before checking vacation')
    }

    const page = await browser.newPage()
    await page.goto(urls.pageCheckVacation)

    await page.type(selectors.vacation.inputStartDate, day.format('YYYYMMDD'))
    await page.type(selectors.vacation.inputEndDate, day.format('YYYYMMDD'))
    const submitBtn = await page.$(selectors.vacation.submit)
    await submitBtn.click()

    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    const table = await page.$(selectors.vacation.table)
    // try to find the empty data hint element on page
    // if fail, it means we have some vacation data to check
    // proceed to validate the day which argument provide is in vacation or not
    try {
      let text = await table.$eval(
        selectors.vacation.emptyDataHint,
        element => element.textContent
      )
      text = trim(text)
      console.log('[punchMachine] We could make sure that vacation data is empty, finishing vacation checking process')
      return !(text === '無顯示資料')
    } catch (e) {
      const cells = await table.$$eval(
        selectors.vacation.nonEmptyDataRow,
        nodes => nodes.map(node => node.textContent)
      )
      console.log('[punchMachine] Vacation data is not empty, enter vacation validation process')
      return validateVacation({ cells, id, day })
    }
  }
  const punch = async (action, callback) => {
    if (action !== 'in' && action !== 'out') {
      throw new Error('Please provide actual punch action: in or out')
    }

    const logger = require('./logger')({ action, id })

    const page = await browser.newPage()
    await page.goto(urls.pagePunch)
    page.on('dialog', async dialog => {
      callback(null, { dialog, browser })
    })

    const punchButton = await page.$(selectors.punch[action])
    if (process.env.NODE_ENV === 'production') {
      await punchButton.click()
    } else {
      logger.log(`[punchMachine] You are not in production mode, in production mode, punch machine will help you punch-${action} by clicking the punch button in this phase.`)
      logger.log('[punchMachine] Close the browser now')
      // browser.close()
    }
    return punchButton
  }
  const quit = async () => {
    await browser.close()
  }

  // login first
  await login()

  return {
    checkVacation,
    punch,
    quit
  }
}

module.exports = createPunchMachine
