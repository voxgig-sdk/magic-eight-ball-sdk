"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('MagicEightBallEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MAGIC_EIGHT_BALL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MAGIC_EIGHT_BALL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MagicEightBallSDK.test();
        const ent = testsdk.MagicEightBall();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MAGIC_EIGHT_BALL_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'magic_eight_ball.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "answer", "req": false, "short": "The Magic Eight Ball response", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "question", "req": false, "short": "The question that was asked", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "type", "req": false, "short": "The category of the answer (affirmative, non-committal, or negative)", "type": "`$STRING`", "index$": 2 }], "name": "magic_eight_ball", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "Will I be rich?", "kind": "param", "name": "question", "orig": "question", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /magic/JSON/{question}", "json": "{\"operationId\":\"getMagicResponse\",\"parameters\":[{\"description\":\"The question to ask the Magic Eight Ball\",\"example\":\"Will I be rich?\",\"in\":\"path\",\"name\":\"question\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"magic\":{\"answer\":\"It is certain\",\"question\":\"Will I be rich?\",\"type\":\"affirmative\"}},\"schema\":{\"properties\":{\"magic\":{\"properties\":{\"answer\":{\"description\":\"The Magic Eight Ball response\",\"type\":\"string\"},\"question\":{\"description\":\"The question that was asked\",\"type\":\"string\"},\"type\":{\"description\":\"The category of the answer (affirmative, non-committal, or negative)\",\"enum\":[\"affirmative\",\"non-committal\",\"negative\"],\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with Magic Eight Ball answer\"},\"400\":{\"description\":\"Bad request - invalid question format\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/magic/JSON/{question}", "segments": [{ "lit": "magic" }, { "lit": "JSON" }, { "var": "question" }], "select": { "exist": ["question"] }, "transform": { "req": "`reqdata`", "res": "`body.magic`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["json"]] }, "key$": "magic_eight_ball", "name__orig": "magic_eight_ball", "Name": "MagicEightBall", "name_": "magic_eight_ball", "name-": "magic-eight-ball", "NAME": "MAGIC_EIGHT_BALL", "index$": 0 }, { "active": true, "entity": "magic_eight_ball", "key$": "BasicMagicEightBallFlow", "kind": "basic", "name": "BasicMagicEightBallFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "magic_eight_ball_ref01", "srcdatavar": "magic_eight_ball_ref01_data", "suffix": "_dt0" }, "match": { "id": "magic_eight_ball01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-magic_eight_ball_ref01" } }], "index$": 0 }] }, 'MagicEightBall');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let magic_eight_ball_ref01_data = Object.values(setup.data.existing.magic_eight_ball)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const magic_eight_ball_ref01_ent = client.MagicEightBall();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/magic_eight_ball/MagicEightBallTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MagicEightBallSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['magic_eight_ball01', 'magic_eight_ball02', 'magic_eight_ball03', 'json01', 'json02', 'json03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MAGIC_EIGHT_BALL_TEST_MAGIC_EIGHT_BALL_ENTID': idmap,
        'MAGIC_EIGHT_BALL_TEST_LIVE': 'FALSE',
        'MAGIC_EIGHT_BALL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MAGIC_EIGHT_BALL_TEST_MAGIC_EIGHT_BALL_ENTID'];
    const live = 'TRUE' === env.MAGIC_EIGHT_BALL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MAGIC_EIGHT_BALL_TEST_MAGIC_EIGHT_BALL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.MagicEightBallSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=MagicEightBallEntity.test.js.map