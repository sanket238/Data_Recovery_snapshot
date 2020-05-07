from uplink import Consumer, get, Query, Path, response_handler
from django.conf import settings

@response_handler
def accept_json(response):
    return response.json()


@accept_json
class DataRecoveryAPI(Consumer):
    @get("/parse/{file_path}")
    def get_recovery_data(self, file_path: Path):
        """Get user's Recovery File Data"""
