import requests
from django.conf import settings


def send_sms_otp(phone, otp):

    url = "https://control.msg91.com/api/v5/otp"

    payload = {
        "template_id": settings.MSG91_TEMPLATE_ID,
        "mobile": f"91{phone}",
        "authkey": settings.MSG91_AUTH_KEY,
        "otp": otp
    }

    response = requests.post(
        url,
        json=payload
    )

    print(response.text)

    return response.status_code == 200