<?php
declare(strict_types=1);

// MagicEightBall SDK utility: result_body

class MagicEightBallResultBody
{
    public static function call(MagicEightBallContext $ctx): ?MagicEightBallResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
