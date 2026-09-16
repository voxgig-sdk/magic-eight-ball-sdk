

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MagicEightBallSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('MagicEightBallEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MAGIC_EIGHT_BALL_TEST_LIVE=TRUE.
  afterEach(liveDelay('MAGIC_EIGHT_BALL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MagicEightBallSDK.test()
    const ent = testsdk.MagicEightBall()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MAGIC_EIGHT_BALL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'magic_eight_ball.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"answer","req":false,"short":"The Magic Eight Ball response","type":"`$STRING`","index$":0},{"active":true,"name":"question","req":false,"short":"The question that was asked","type":"`$STRING`","index$":1},{"active":true,"name":"type","req":false,"short":"The category of the answer (affirmative, non-committal, or negative)","type":"`$STRING`","index$":2}],"name":"magic_eight_ball","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"Will I be rich?","kind":"param","name":"question","orig":"question","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /magic/JSON/{question}","json":"{\"operationId\":\"getMagicResponse\",\"parameters\":[{\"description\":\"The question to ask the Magic Eight Ball\",\"example\":\"Will I be rich?\",\"in\":\"path\",\"name\":\"question\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"magic\":{\"answer\":\"It is certain\",\"question\":\"Will I be rich?\",\"type\":\"affirmative\"}},\"schema\":{\"properties\":{\"magic\":{\"properties\":{\"answer\":{\"description\":\"The Magic Eight Ball response\",\"type\":\"string\"},\"question\":{\"description\":\"The question that was asked\",\"type\":\"string\"},\"type\":{\"description\":\"The category of the answer (affirmative, non-committal, or negative)\",\"enum\":[\"affirmative\",\"non-committal\",\"negative\"],\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with Magic Eight Ball answer\"},\"400\":{\"description\":\"Bad request - invalid question format\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/magic/JSON/{question}","segments":[{"lit":"magic"},{"lit":"JSON"},{"var":"question"}],"select":{"exist":["question"]},"transform":{"req":"`reqdata`","res":"`body.magic`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["json"]]},"key$":"magic_eight_ball","name__orig":"magic_eight_ball","Name":"MagicEightBall","name_":"magic_eight_ball","name-":"magic-eight-ball","NAME":"MAGIC_EIGHT_BALL","index$":0}, {"active":true,"entity":"magic_eight_ball","key$":"BasicMagicEightBallFlow","kind":"basic","name":"BasicMagicEightBallFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"magic_eight_ball_ref01","srcdatavar":"magic_eight_ball_ref01_data","suffix":"_dt0"},"match":{"id":"magic_eight_ball01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-magic_eight_ball_ref01"}}],"index$":0}]}, 'MagicEightBall')
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

  const env = envOverride({
    'MAGIC_EIGHT_BALL_TEST_MAGIC_EIGHT_BALL_ENTID': idmap,
    'MAGIC_EIGHT_BALL_TEST_LIVE': 'FALSE',
    'MAGIC_EIGHT_BALL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MAGIC_EIGHT_BALL_TEST_MAGIC_EIGHT_BALL_ENTID']

  const live = 'TRUE' === env.MAGIC_EIGHT_BALL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MAGIC_EIGHT_BALL_TEST_MAGIC_EIGHT_BALL_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MagicEightBallSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
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
    transport,
    now: Date.now(),
  }

  return setup
}
  
