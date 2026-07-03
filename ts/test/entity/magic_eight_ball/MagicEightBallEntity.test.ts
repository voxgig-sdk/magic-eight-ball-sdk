
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { MagicEightBallSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('MagicEightBallEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MAGICEIGHTBALL_TEST_LIVE=TRUE.
  afterEach(liveDelay('MAGICEIGHTBALL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MagicEightBallSDK.test()
    const ent = testsdk.MagicEightBall()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MAGIC_EIGHT_BALL_TEST_LIVE
    for (const op of ['load']) {
      if (maybeSkipControl(t, 'entityOp', 'magic_eight_ball.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set MAGIC_EIGHT_BALL_TEST_MAGIC_EIGHT_BALL_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let magic_eight_ball_ref01_data = Object.values(setup.data.existing.magic_eight_ball)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const magic_eight_ball_ref01_ent = client.MagicEightBall()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/magic_eight_ball/MagicEightBallTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MagicEightBallSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['magic_eight_ball01','magic_eight_ball02','magic_eight_ball03','json01','json02','json03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['MAGIC_EIGHT_BALL_TEST_MAGIC_EIGHT_BALL_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'MAGIC_EIGHT_BALL_TEST_MAGIC_EIGHT_BALL_ENTID': idmap,
    'MAGIC_EIGHT_BALL_TEST_LIVE': 'FALSE',
    'MAGIC_EIGHT_BALL_TEST_EXPLAIN': 'FALSE',
    'MAGIC_EIGHT_BALL_APIKEY': 'NONE',
  })

  idmap = env['MAGIC_EIGHT_BALL_TEST_MAGIC_EIGHT_BALL_ENTID']

  const live = 'TRUE' === env.MAGIC_EIGHT_BALL_TEST_LIVE

  if (live) {
    client = new MagicEightBallSDK(merge([
      {
        apikey: env.MAGIC_EIGHT_BALL_APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.MAGIC_EIGHT_BALL_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
