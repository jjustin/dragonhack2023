import datetime

from flask import Flask, make_response, request, session
from flask_cors import CORS
from pytwitter import Api

from flask_session import Session

from gpt import get_tweet
import requests

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
    bearer = request.headers.get("Authorization")
    api = Api(bearer_token=bearer)
    
    prompt = request.json["prompt"]
    seriousness = int(request.json["seriousness"])
    tweet = get_tweet(prompt, seriousness)

    # if tweet is string
    if type(tweet) == str:
        api.create_tweet(text=tweet)
    else:
        # Set the endpoint URL
        url = 'https://upload.twitter.com/1.1/media/upload.json?media_category=tweet_image'

        # Open the image file in binary mode
        with open(tweet, 'rb') as f:
            # Set the POST data
            data = {'media': f}

            # Make the POST request
            response = requests.post(url, headers=bearer, files=data)

            # Check the response status code
            if response.status_code == 200:
                # Get the media ID from the response
                media_id = response.json()['media_id']
                print(f'Image uploaded successfully. Media ID: {media_id}')
            else:
                print(f'Error uploading image: {response.text}')

    return {}


if __name__ == "__main__":
    app.run(debug=True)
