/**
 * @description Data model entrance
 * @author Fan Yang
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

Blog.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
})

UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})
User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followerId'
})

module.exports = {
  User,
  Blog,
  UserRelation,
}