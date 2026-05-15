<?php
declare(strict_types=1);

// MagicEightBall SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

MagicEightBallUtility::setRegistrar(function (MagicEightBallUtility $u): void {
    $u->clean = [MagicEightBallClean::class, 'call'];
    $u->done = [MagicEightBallDone::class, 'call'];
    $u->make_error = [MagicEightBallMakeError::class, 'call'];
    $u->feature_add = [MagicEightBallFeatureAdd::class, 'call'];
    $u->feature_hook = [MagicEightBallFeatureHook::class, 'call'];
    $u->feature_init = [MagicEightBallFeatureInit::class, 'call'];
    $u->fetcher = [MagicEightBallFetcher::class, 'call'];
    $u->make_fetch_def = [MagicEightBallMakeFetchDef::class, 'call'];
    $u->make_context = [MagicEightBallMakeContext::class, 'call'];
    $u->make_options = [MagicEightBallMakeOptions::class, 'call'];
    $u->make_request = [MagicEightBallMakeRequest::class, 'call'];
    $u->make_response = [MagicEightBallMakeResponse::class, 'call'];
    $u->make_result = [MagicEightBallMakeResult::class, 'call'];
    $u->make_point = [MagicEightBallMakePoint::class, 'call'];
    $u->make_spec = [MagicEightBallMakeSpec::class, 'call'];
    $u->make_url = [MagicEightBallMakeUrl::class, 'call'];
    $u->param = [MagicEightBallParam::class, 'call'];
    $u->prepare_auth = [MagicEightBallPrepareAuth::class, 'call'];
    $u->prepare_body = [MagicEightBallPrepareBody::class, 'call'];
    $u->prepare_headers = [MagicEightBallPrepareHeaders::class, 'call'];
    $u->prepare_method = [MagicEightBallPrepareMethod::class, 'call'];
    $u->prepare_params = [MagicEightBallPrepareParams::class, 'call'];
    $u->prepare_path = [MagicEightBallPreparePath::class, 'call'];
    $u->prepare_query = [MagicEightBallPrepareQuery::class, 'call'];
    $u->result_basic = [MagicEightBallResultBasic::class, 'call'];
    $u->result_body = [MagicEightBallResultBody::class, 'call'];
    $u->result_headers = [MagicEightBallResultHeaders::class, 'call'];
    $u->transform_request = [MagicEightBallTransformRequest::class, 'call'];
    $u->transform_response = [MagicEightBallTransformResponse::class, 'call'];
});
