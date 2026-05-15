<?php
declare(strict_types=1);

// MagicEightBall SDK utility: result_headers

class MagicEightBallResultHeaders
{
    public static function call(MagicEightBallContext $ctx): ?MagicEightBallResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
