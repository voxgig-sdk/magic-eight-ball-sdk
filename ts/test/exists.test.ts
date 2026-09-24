
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MagicEightBallSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = MagicEightBallSDK.test()
    equal(testsdk instanceof MagicEightBallSDK, true,
      'MagicEightBallSDK.test() must return a client synchronously')
  })

})
