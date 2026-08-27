
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
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
          "short": "The Magic Eight Ball response",
          "type": "`$STRING`"
        },
        {
          "name": "question",
          "short": "The question that was asked",
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "short": "The category of the answer (affirmative, non-committal, or negative)",
          "type": "`$STRING`"
        }
      ],
      "name": "magic_eight_ball",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "Will I be rich?",
                    "kind": "param",
                    "name": "question",
                    "orig": "question",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/magic/JSON/{question}",
              "parts": [
                "magic",
                "JSON",
                "{question}"
              ],
              "select": {
                "exist": [
                  "question"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.magic`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "json"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config
}

