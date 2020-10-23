/**
 * @description user api test
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

// json schema validate
test('json schema validate，register failed with illegal data formate', async () => {
  const res = await server.post('/api/user/register').send({
    userName: '123', // Username not start with character or _
    password: 'a', // Min length not 3
    // nickName: ''
    gender: 'mail', // Not number
  })
  expect(res.body.errno).not.toBe(0)
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

// Modify user
test('Modify user success', async () => {
  const res = await server
    .patch('/api/user/changeInfo')
    .send({
      nickName: 'Test nickname',
      city: 'Test city',
      picture: '/test.png',
    })
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// Modify password
test('Modify password success', async () => {
  const res = await server
    .patch('/api/user/changePassword')
    .send({
      password,
      newPassword: `p_${Date.now()}`,
    })
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
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
