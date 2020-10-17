/**
 * @description User data model
 * @author Fan Yang
 */


const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

// users
const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: 'Username, unique',
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: 'Password',
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: 'Nickname',
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: 'Gender（1 Man，2 Women，3 Secret）',
  },
  picture: {
    type: STRING,
    comment: 'Avator，image url',
  },
  city: {
    type: STRING,
    comment: 'City',
  },
})

module.exports = User