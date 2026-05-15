# ProjectName SDK exists test

import pytest
from magiceightball_sdk import MagicEightBallSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MagicEightBallSDK.test(None, None)
        assert testsdk is not None
