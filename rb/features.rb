# MagicEightBall SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module MagicEightBallFeatures
  def self.make_feature(name)
    case name
    when "base"
      MagicEightBallBaseFeature.new
    when "test"
      MagicEightBallTestFeature.new
    else
      MagicEightBallBaseFeature.new
    end
  end
end
