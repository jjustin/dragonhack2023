import requests

response = requests.get("http://dh2023.meetings.bio:1081/secretmessage")

message = response.text

print(message)
