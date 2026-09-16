# MagicEightBall SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module MagicEightBallFeatures
  def self.make_feature(name)
    case name
    when "base"
      MagicEightBallBaseFeature.new
    when "ratelimit"
      MagicEightBallRatelimitFeature.new
    when "retry"
      MagicEightBallRetryFeature.new
    when "test"
      MagicEightBallTestFeature.new
    when "timeout"
      MagicEightBallTimeoutFeature.new
    else
      MagicEightBallBaseFeature.new
    end
  end
end
