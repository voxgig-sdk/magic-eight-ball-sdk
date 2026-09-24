# MagicEightBall SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "MagicEightBall",
            "slug": "magic-eight-ball",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "name": "answer",
            "title": "Answer",
            "type": "`$STRING`",
            "short": "The Magic Eight Ball response",
          },
          {
            "name": "question",
            "title": "Question",
            "type": "`$STRING`",
            "short": "The question that was asked",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "short": "The category of the answer (affirmative, non-committal, or negative)",
          },
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
                    "lit": "magic",
                  },
                  {
                    "lit": "JSON",
                  },
                  {
                    "var": "question",
                  },
                ],
                "parts": [
                  "magic",
                  "JSON",
                  "{question}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.magic`",
                },
                "args": {
                  "params": [
                    {
                      "name": "question",
                      "orig": "question",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "Will I be rich?",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "question",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
