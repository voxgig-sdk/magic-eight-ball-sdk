<?php
declare(strict_types=1);

// MagicEightBall SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MagicEightBallMakeContext
{
    public static function call(array $ctxmap, ?MagicEightBallContext $basectx): MagicEightBallContext
    {
        return new MagicEightBallContext($ctxmap, $basectx);
    }
}
