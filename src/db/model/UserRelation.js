/**
 * @description User follow relationship
 * @author Fan Yang
 */

const seq = require('../seq')
const { INTEGER } = require('../types')

const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: 'User id',
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: 'Follower id',
  },
})

module.exports = UserRelation
