# MagicEightBall SDK exists test

require "minitest/autorun"
require_relative "../MagicEightBall_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = MagicEightBallSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
