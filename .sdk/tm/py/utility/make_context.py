# MagicEightBall SDK utility: make_context

from core.context import MagicEightBallContext


def make_context_util(ctxmap, basectx):
    return MagicEightBallContext(ctxmap, basectx)
