from pytwitter import Api

api = Api(
    client_id="OVNNdGQxQ0VZYkxHell5QTZhN3M6MTpjaQ",
    client_secret="9AI9dacS1JM0MqeDvY52SGuaTG2JuxwniFvZZpqOoYNv6TSUfH",
    oauth_flow=True,
)

url, code_verifier, _ = api.get_oauth2_authorize_url(
    "http://localhost:3000", scope=["tweet.read", "tweet.write", "users.read"]
)
print(url)
x = input("response:")

api.generate_oauth2_access_token(x, code_verifier, "http://localhost:3000")

api.create_tweet(text="Hello World!")
