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
              "active" => true,
              "name" => "answer",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "question",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "type",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
          ],
          "name" => "magic_eight_ball",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => "Will I be rich?",
                        "kind" => "param",
                        "name" => "question",
                        "orig" => "question",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                    ],
                  },
                  "kind" => "http",
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
                    "res" => "`body.magic`",
                  },
                  "index$" => 0,
                },
              ],
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
