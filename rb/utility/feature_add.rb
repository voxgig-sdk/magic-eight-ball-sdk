# MagicEightBall SDK utility: feature_add
module MagicEightBallUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
