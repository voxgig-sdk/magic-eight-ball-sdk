<?php
declare(strict_types=1);

// MagicEightBall SDK utility: prepare_body

class MagicEightBallPrepareBody
{
    public static function call(MagicEightBallContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
