<?php
declare(strict_types=1);

// MagicEightBall SDK configuration

class MagicEightBallConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "MagicEightBall",
                "slug" => "magic-eight-ball",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://8ball.delegator.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "magic_eight_ball" => [],
                ],
            ],
            "entity" => [
        'magic_eight_ball' => [
          'fields' => [
            [
              'name' => 'answer',
              'title' => 'Answer',
              'type' => '`$STRING`',
              'short' => 'The Magic Eight Ball response',
            ],
            [
              'name' => 'question',
              'title' => 'Question',
              'type' => '`$STRING`',
              'short' => 'The question that was asked',
            ],
            [
              'name' => 'type',
              'title' => 'Type',
              'type' => '`$STRING`',
              'short' => 'The category of the answer (affirmative, non-committal, or negative)',
            ],
          ],
          'name' => 'magic_eight_ball',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/magic/JSON/{question}',
                  'segments' => [
                    [
                      'lit' => 'magic',
                    ],
                    [
                      'lit' => 'JSON',
                    ],
                    [
                      'var' => 'question',
                    ],
                  ],
                  'parts' => [
                    'magic',
                    'JSON',
                    '{question}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.magic`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'question',
                        'orig' => 'question',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'Will I be rich?',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'question',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return MagicEightBallFeatures::make_feature($name);
    }
}
