-- MagicEightBall SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "MagicEightBall",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://8ball.delegator.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["magic_eight_ball"] = {},
      },
    },
    entity = {
      ["magic_eight_ball"] = {
        ["fields"] = {
          {
            ["name"] = "answer",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "question",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "magic_eight_ball",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "Will I be rich?",
                      ["kind"] = "param",
                      ["name"] = "question",
                      ["orig"] = "question",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/magic/JSON/{question}",
                ["parts"] = {
                  "magic",
                  "JSON",
                  "{question}",
                },
                ["select"] = {
                  ["exist"] = {
                    "question",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.magic`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "json",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
