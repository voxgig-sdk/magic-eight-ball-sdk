<?php
declare(strict_types=1);

// MagicEightBall SDK utility: feature_hook

class MagicEightBallFeatureHook
{
    public static function call(MagicEightBallContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
