# MagicEightBall SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

MagicEightBallUtility.registrar = ->(u) {
  u.clean = MagicEightBallUtilities::Clean
  u.done = MagicEightBallUtilities::Done
  u.make_error = MagicEightBallUtilities::MakeError
  u.feature_add = MagicEightBallUtilities::FeatureAdd
  u.feature_hook = MagicEightBallUtilities::FeatureHook
  u.feature_init = MagicEightBallUtilities::FeatureInit
  u.fetcher = MagicEightBallUtilities::Fetcher
  u.make_fetch_def = MagicEightBallUtilities::MakeFetchDef
  u.make_context = MagicEightBallUtilities::MakeContext
  u.make_options = MagicEightBallUtilities::MakeOptions
  u.make_request = MagicEightBallUtilities::MakeRequest
  u.make_response = MagicEightBallUtilities::MakeResponse
  u.make_result = MagicEightBallUtilities::MakeResult
  u.make_point = MagicEightBallUtilities::MakePoint
  u.make_spec = MagicEightBallUtilities::MakeSpec
  u.make_url = MagicEightBallUtilities::MakeUrl
  u.param = MagicEightBallUtilities::Param
  u.prepare_auth = MagicEightBallUtilities::PrepareAuth
  u.prepare_body = MagicEightBallUtilities::PrepareBody
  u.prepare_headers = MagicEightBallUtilities::PrepareHeaders
  u.prepare_method = MagicEightBallUtilities::PrepareMethod
  u.prepare_params = MagicEightBallUtilities::PrepareParams
  u.prepare_path = MagicEightBallUtilities::PreparePath
  u.prepare_query = MagicEightBallUtilities::PrepareQuery
  u.result_basic = MagicEightBallUtilities::ResultBasic
  u.result_body = MagicEightBallUtilities::ResultBody
  u.result_headers = MagicEightBallUtilities::ResultHeaders
  u.transform_request = MagicEightBallUtilities::TransformRequest
  u.transform_response = MagicEightBallUtilities::TransformResponse
}
