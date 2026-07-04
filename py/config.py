# MagicEightBall SDK configuration


def make_config():
    return {
        "main": {
            "name": "MagicEightBall",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://8ball.delegator.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "magic_eight_ball": {},
            },
        },
        "entity": {
      "magic_eight_ball": {
        "fields": [
          {
            "active": True,
            "name": "magic",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 0,
          },
        ],
        "name": "magic_eight_ball",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "Will I be rich?",
                      "kind": "param",
                      "name": "question",
                      "orig": "question",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/magic/JSON/{question}",
                "parts": [
                  "magic",
                  "JSON",
                  "{question}",
                ],
                "select": {
                  "exist": [
                    "question",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "json",
            ],
          ],
        },
      },
    },
    }
