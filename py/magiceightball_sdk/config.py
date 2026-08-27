# MagicEightBall SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "short": "The Magic Eight Ball response",
            "type": "`$STRING`",
          },
          {
            "name": "question",
            "short": "The question that was asked",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "short": "The category of the answer (affirmative, non-committal, or negative)",
            "type": "`$STRING`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
                  "res": "`body.magic`",
                },
              },
            ],
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
