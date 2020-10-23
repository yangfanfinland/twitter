/**
 * @description Blog data related util methods
 * @author Fan Yang
 */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// Get blog-list.ejs file content
const BLOG_LIST_TPL = fs
  .readFileSync(path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs'))
  .toString()

/**
 * Populate html characters base on blogList
 * @param {Array} blogList Blog list
 * @param {boolean} canReply Can reply or not
 */
function getBlogListStr(blogList = [], canReply = false) {
  return ejs.render(BLOG_LIST_TPL, {
    blogList,
    canReply,
  })
}

module.exports = {
  getBlogListStr,
}
