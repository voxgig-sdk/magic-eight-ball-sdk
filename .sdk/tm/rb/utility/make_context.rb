# MagicEightBall SDK utility: make_context
require_relative '../core/context'
module MagicEightBallUtilities
  MakeContext = ->(ctxmap, basectx) {
    MagicEightBallContext.new(ctxmap, basectx)
  }
end
