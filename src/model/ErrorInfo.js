/**
 * @description Error info collection，contains errno and message
 * @author Fan Yang
 */

module.exports = {
  // Username exists
  registerUserNameExistInfo: {
    errno: 10001,
    message: 'Username exists',
  },
  // Register failed
  registerFailInfo: {
    errno: 10002,
    message: 'Register failed',
  },
  // Username not exist
  registerUserNameNotExistInfo: {
    errno: 10003,
    message: 'Username not exist',
  },
  // Login failed
  loginFailInfo: {
    errno: 10004,
    message: 'Login failed, wrong username or password',
  },
  // Not login
  loginCheckFailInfo: {
    errno: 10005,
    message: 'Not login',
  },
  // Modify password failed
  changePasswordFailInfo: {
    errno: 10006,
    message: 'Modify password failed，try again',
  },
  // Uploaded file over maximun size
  uploadFileSizeFailInfo: {
    errno: 10007,
    message: 'Uploaded file over maximun size',
  },
  // Modify basic info failed
  changeInfoFailInfo: {
    errno: 10008,
    message: 'Modify basic info failed',
  },
  // json schema validate failed
  jsonSchemaFileInfo: {
    errno: 10009,
    message: 'json schema validate failed',
  },
  // Delete user failed
  deleteUserFailInfo: {
    errno: 10010,
    message: 'Delete user failed',
  },
  // Follow failed
  addFollowerFailInfo: {
    errno: 10011,
    message: 'Follow failed',
  },
  // Unfollow failed
  deleteFollowerFailInfo: {
    errno: 10012,
    message: 'Unfollow failed',
  },
  // Publish blog failed
  createBlogFailInfo: {
    errno: 11001,
    message: 'Publish blog failed, try again',
  },
  // Delete blog failed
  deleteBlogFailInfo: {
    errno: 11002,
    message: 'Delete blog failed, try again',
  },
}
