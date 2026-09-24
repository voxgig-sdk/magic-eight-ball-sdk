
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'MagicEightBall',
        slug: "magic-eight-ball",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://8ball.delegator.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        magic_eight_ball: {
        },
  
    }
  }


  entity = {
    "magic_eight_ball": {
      "fields": [
        {
          "name": "answer",
          "title": "Answer",
          "type": "`$STRING`",
          "short": "The Magic Eight Ball response"
        },
        {
          "name": "question",
          "title": "Question",
          "type": "`$STRING`",
          "short": "The question that was asked"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "The category of the answer (affirmative, non-committal, or negative)"
        }
      ],
      "name": "magic_eight_ball",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/magic/JSON/{question}",
              "segments": [
                {
                  "lit": "magic"
                },
                {
                  "lit": "JSON"
                },
                {
                  "var": "question"
                }
              ],
              "parts": [
                "magic",
                "JSON",
                "{question}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.magic`"
              },
              "args": {
                "params": [
                  {
                    "name": "question",
                    "orig": "question",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "Will I be rich?"
                  }
                ]
              },
              "select": {
                "exist": [
                  "question"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

