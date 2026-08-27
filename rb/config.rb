# MagicEightBall SDK configuration

module MagicEightBallConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "MagicEightBall",
        "slug" => "magic-eight-ball",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "name" => "answer",
              "short" => "The Magic Eight Ball response",
              "type" => "`$STRING`",
            },
            {
              "name" => "question",
              "short" => "The question that was asked",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "short" => "The category of the answer (affirmative, non-committal, or negative)",
              "type" => "`$STRING`",
            },
          ],
          "name" => "magic_eight_ball",
          "op" => {
            "load" => {
              "input" => "data",
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
                },
              ],
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
