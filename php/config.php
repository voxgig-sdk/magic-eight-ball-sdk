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
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'short' => 'The Magic Eight Ball response',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'question',
              'short' => 'The question that was asked',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'short' => 'The category of the answer (affirmative, non-committal, or negative)',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'magic_eight_ball',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'Will I be rich?',
                        'kind' => 'param',
                        'name' => 'question',
                        'orig' => 'question',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/magic/JSON/{question}',
                  'parts' => [
                    'magic',
                    'JSON',
                    '{question}',
                  ],
                  'select' => [
                    'exist' => [
                      'question',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.magic`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'json',
              ],
            ],
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
