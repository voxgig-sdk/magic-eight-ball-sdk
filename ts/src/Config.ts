
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

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
    }

  }


  options = {
    base: 'https://8ball.delegator.com',

    auth: {
      prefix: 'Bearer',
    },

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
          "name": "magic",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 0
        }
      ],
      "name": "magic_eight_ball",
      "op": {
        "load": {
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
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
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

