
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


  main = {
    name: 'MagicEightBall',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$STRING`"
        },
        {
          "name": "question",
          "type": "`$STRING`"
        },
        {
          "name": "type",
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

