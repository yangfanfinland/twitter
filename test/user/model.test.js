/**
 * @description User model test
 * @author Fan Yang
 */

const { User } = require('../../src/db/model/index')

test('User model properties are valid', () => {
  // build will generate a User instance inside memory,
  // but not commit into database
  const user = User.build({
    userName: 'fan',
    password: '2rjaFvus',
    nickName: 'yangfanfinland',
    // gender: 1,
    picture: '/xxx.png',
    city: 'Espoo',
  })

  expect(user.userName).toBe('fan')
  expect(user.password).toBe('2rjaFvus')
  expect(user.nickName).toBe('yangfanfinland')
  expect(user.gender).toBe(3) // Gender default value should be 3
  expect(user.picture).toBe('/xxx.png')
  expect(user.city).toBe('Espoo')
})
