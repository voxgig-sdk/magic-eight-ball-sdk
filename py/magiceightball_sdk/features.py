# MagicEightBall SDK feature factory

from magiceightball_sdk.feature.base_feature import MagicEightBallBaseFeature
from magiceightball_sdk.feature.ratelimit_feature import MagicEightBallRatelimitFeature
from magiceightball_sdk.feature.retry_feature import MagicEightBallRetryFeature
from magiceightball_sdk.feature.test_feature import MagicEightBallTestFeature
from magiceightball_sdk.feature.timeout_feature import MagicEightBallTimeoutFeature


_FEATURES = {
    "base": lambda: MagicEightBallBaseFeature(),
    "ratelimit": lambda: MagicEightBallRatelimitFeature(),
    "retry": lambda: MagicEightBallRetryFeature(),
    "test": lambda: MagicEightBallTestFeature(),
    "timeout": lambda: MagicEightBallTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
