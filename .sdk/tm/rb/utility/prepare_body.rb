# MagicEightBall SDK utility: prepare_body
require_relative 'media'
module MagicEightBallUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return MagicEightBallUtilities.raw_body(ctx.reqdata) if MagicEightBallUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
