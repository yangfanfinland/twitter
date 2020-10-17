/**
 * @description Sequelize - Sync database
 * @author Fan Yang
 */

const seq = require('./seq')

require('./model/index')

// Test connection
seq.authenticate().then(() => {
  console.log('auth ok')
}).catch(() => {
  console.log('auth error')
})

// Execute sync
seq.sync({ force: true }).then(() => {
  console.log('sync ok')
  process.exit()
})