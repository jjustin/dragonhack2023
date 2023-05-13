import requests

try:
    response = requests.get(f"http://10.245.129.154/secretmessage")

    message = response.text

    print(message)
except Exception as e:
    print(e)
