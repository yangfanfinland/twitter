/**
 * @description Blog data model
 * @author Fan Yang
 */

const seq = require('../seq')
const { INTEGER, STRING, TEXT } = require('../types')

const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: 'User ID',
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: 'Blog content',
  },
  image: {
    type: STRING,
    comment: 'Image address',
  },
})

module.exports = Blog
