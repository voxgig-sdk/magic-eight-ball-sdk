<?php
declare(strict_types=1);

// MagicEightBall SDK utility: feature_add

class MagicEightBallFeatureAdd
{
    public static function call(MagicEightBallContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
