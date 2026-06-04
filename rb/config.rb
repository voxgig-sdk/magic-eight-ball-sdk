# MagicEightBall SDK configuration

module MagicEightBallConfig
  def self.make_config
    {
      "main" => {
        "name" => "MagicEightBall",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://8ball.delegator.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "magic_eight_ball" => {},
        },
      },
      "entity" => {
        "magic_eight_ball" => {
          "fields" => [
            {
              "name" => "magic",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 0,
            },
          ],
          "name" => "magic_eight_ball",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "Will I be rich?",
                        "kind" => "param",
                        "name" => "question",
                        "orig" => "question",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/magic/JSON/{question}",
                  "parts" => [
                    "magic",
                    "JSON",
                    "{question}",
                  ],
                  "select" => {
                    "exist" => [
                      "question",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "json",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    MagicEightBallFeatures.make_feature(name)
  end
end
