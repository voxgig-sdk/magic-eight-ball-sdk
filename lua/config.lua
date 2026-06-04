-- ProjectName SDK configuration

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
            ["name"] = "magic",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["active"] = true,
            ["index$"] = 0,
          },
        },
        ["name"] = "magic_eight_ball",
        ["op"] = {
          ["load"] = {
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
                      ["active"] = true,
                    },
                  },
                },
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
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "load",
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
