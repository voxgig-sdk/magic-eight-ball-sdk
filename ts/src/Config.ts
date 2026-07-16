
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
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://8ball.delegator.com',

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
          "active": true,
          "name": "magic",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 0
        }
      ],
      "name": "magic_eight_ball",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "Will I be rich?",
                    "kind": "param",
                    "name": "question",
                    "orig": "question",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
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
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
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

