
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MagicEightBallSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await MagicEightBallSDK.test()
    equal(null !== testsdk, true)
  })

})
