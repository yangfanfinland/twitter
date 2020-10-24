/**
 * @description Blog @ user relationship data model
 * @author Fan Yang
 */

const seq = require('../seq')
const { INTEGER, BOOLEAN } = require('../types')

const AtRelation = seq.define('atRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: 'User Id',
  },
  blogId: {
    type: INTEGER,
    allowNull: false,
    comment: 'Blog Id',
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false, // Default is NOT read
    comment: 'Whether read or not',
  },
})

module.exports = AtRelation
