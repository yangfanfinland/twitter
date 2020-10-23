/**
 * @description Personal home test
 * @author Fan Yang
 */

const server = require('../server')

// User info
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1,
}

// Save cookie
let COOKIE = ''

// User register
test('Register user success', async () => {
  const res = await server.post('/api/user/register').send(testUser)
  expect(res.body.errno).toBe(0)
})

// Duplicate user register
test('Failed with duplicate user register', async () => {
  const res = await server.post('/api/user/register').send(testUser)
  expect(res.body.errno).not.toBe(0)
})

// User exist
test('User exist after registered success', async () => {
  const res = await server.post('/api/user/isExist').send({ userName })
  expect(res.body.errno).toBe(0)
})

// User login
test('User login success', async () => {
  const res = await server.post('/api/user/login').send({
    userName,
    password,
  })
  expect(res.body.errno).toBe(0)

  // Get cookie
  COOKIE = res.headers['set-cookie'].join(';')
})

// Personal home page test
test('Personal home page, load first page data success', async () => {
  const res = await server
    .get(`/api/profile/loadMore/${userName}/0`)
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)

  const data = res.body.data
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
})

// Delete user
test('Delete user success', async () => {
  const res = await server.post('/api/user/delete').set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// Logout
test('Logout success', async () => {
  const res = await server.post('/api/user/logout').set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// User not exist
test('User not exist after deleted success', async () => {
  const res = await server.post('/api/user/isExist').send({ userName })
  expect(res.body.errno).not.toBe(0)
})
