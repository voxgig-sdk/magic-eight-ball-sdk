# MagicEightBall SDK utility: make_context

from projectname_sdk.core.context import MagicEightBallContext


def make_context_util(ctxmap, basectx):
    return MagicEightBallContext(ctxmap, basectx)
