import datetime

from flask import Flask, make_response, request, session
from flask_cors import CORS
from pytwitter import Api

from flask_session import Session

app = Flask(__name__)
app.secret_key = "SuperSecret"
app.config["SESSION_TYPE"] = "filesystem"

Session(app)
CORS(
    app,
    supports_credentials=True,
)

CALLBACK_URL = "http://localhost:3000/oauth/callback"

client = Api(
    client_id="OVNNdGQxQ0VZYkxHell5QTZhN3M6MTpjaQ",
    client_secret="9AI9dacS1JM0MqeDvY52SGuaTG2JuxwniFvZZpqOoYNv6TSUfH",
    oauth_flow=True,
)


@app.route("/auth")
def authStep1():
    url, code_verifier, _ = client.get_oauth2_authorize_url(
        CALLBACK_URL,
        scope=["tweet.read", "tweet.write", "users.read"],
    )

    resp = make_response({"url": url})
    expire_at = datetime.datetime.now() + datetime.timedelta(days=1)
    resp.set_cookie(
        "code_verifier",
        code_verifier,
        expires=expire_at,
    )
    return resp


@app.route("/auth/<code>")
def authStep2(code):
    code_verifier = request.cookies.get("code_verifier")
    print(code)
    print(code_verifier)
    try:
        return client.generate_oauth2_access_token(
            f"{CALLBACK_URL}?code={code}", code_verifier, CALLBACK_URL
        )
    except Exception as e:
        return {"error": str(e)}


@app.route("/tweet", methods=["POST"])
def tweet():
    print(request.authorization)
    print("Fake tweet: ", request.json)
    return {}


if __name__ == "__main__":
    app.run(debug=True)
