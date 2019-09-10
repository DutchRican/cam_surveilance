import pytest
from ..libs.config import LoadConfig

@pytest.mark.describe('Loading the config')
def test_LoadConfig():
    data = LoadConfig()
    assert data['camName'] is not None
