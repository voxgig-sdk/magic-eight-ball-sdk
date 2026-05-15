package = "voxgig-sdk-magic-eight-ball"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/magic-eight-ball-sdk.git"
}
description = {
  summary = "MagicEightBall SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["magic-eight-ball_sdk"] = "magic-eight-ball_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
