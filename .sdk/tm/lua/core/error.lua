-- MagicEightBall SDK error

local MagicEightBallError = {}
MagicEightBallError.__index = MagicEightBallError


function MagicEightBallError.new(code, msg, ctx)
  local self = setmetatable({}, MagicEightBallError)
  self.is_sdk_error = true
  self.sdk = "MagicEightBall"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MagicEightBallError:error()
  return self.msg
end


function MagicEightBallError:__tostring()
  return self.msg
end


return MagicEightBallError
