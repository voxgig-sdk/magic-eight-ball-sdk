# MagicEightBall SDK feature factory

from feature.base_feature import MagicEightBallBaseFeature
from feature.test_feature import MagicEightBallTestFeature


def _make_feature(name):
    features = {
        "base": lambda: MagicEightBallBaseFeature(),
        "test": lambda: MagicEightBallTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
