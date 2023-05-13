import requests

prompt = "Hello"
model = "gpt-4"
token = "At6UbHxSFA2iygYCkQmhhvqQKmyReq"


response = requests.post(
    "https://openai-api.meetings.bio/api/openai/chat/completions",
    headers={"Authorization": f"Bearer {token}"},
    json={
        # specification of all options: https://platform.openai.com/docs/api-reference/chat/create
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
    },
)


if response.ok:
    print(response.json()["choices"][0]["message"]["content"])
