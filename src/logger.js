module.exports = ({ action, id }) => {
  return {
    log (message) {
      console.log(`punch-${action}/${id}: ${message}`)
    }
  }
}
