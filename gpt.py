import requests

prompt = "Solve the following puzzle (I managed to connect to netcat server on dh2023.meetings.bio on port 1081, what else do i need to do?): In the tongue of serpents, weave a path unseen using the messenger of 'requests'. Seek the silent sentinel standing tall at the height of a thousand and eighty-one pairs of socks. In the realm of life's gathering, where 'dh2023' and 'meetings' dance under 'bio', request the whisper hidden at /secretmessage'. Speak your word, hear its echo, and reflect it to the world."
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
