import datetime
from urllib import response

import requests
from flask import Flask, make_response, request, session
from flask_cors import CORS
from pytwitter import Api

from flask_session import Session
from gpt import get_tweet

app = Flask(__name__)
app.secret_key = "SuperSecret"
app.config["SESSION_TYPE"] = "filesystem"

Session(app)
CORS(
    app,
    supports_credentials=True,
)


def callback_url(base):
    return f"{base}/oauth/callback"


client = Api(
    consumer_key="rjiIwVr1cm2N12Tz9jl0mLtAO",
    consumer_secret="9JXopkiqJNzd4pQHji9ZwVJqBevzdiVLNz4J2djXgW5kc7wWVv",
    oauth_flow=True,
)


@app.route("/auth")
def authStep1():
    url_base = request.origin

    url = client.get_authorize_url(callback_url(url_base))

    return {"url": url}


@app.route("/auth/<code>/<verifier>")
def authStep2(code, verifier):
    url_base = request.origin
    print(url_base, code, verifier)
    try:
        response = (
            f"{url_base}/oauth/callback?oauth_token={code}&oauth_verifier={verifier}"
        )
        callback_url = f"{url_base}/oauth/callback"
        print(response, callback_url)
        return client.generate_access_token(
            response,
            callback_url,
        )
    except Exception as e:
        response = make_response({"error": str(e)}, 400)
        return response


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
        url = "https://upload.twitter.com/1.1/media/upload.json?media_category=tweet_image"

        # Open the image file in binary mode
        with open(tweet, "rb") as f:
            # Set the POST data
            data = {"media": f}

            # Make the POST request
            response = requests.post(url, headers=bearer, files=data)

            # Check the response status code
            if response.status_code == 200:
                # Get the media ID from the response
                media_id = response.json()["media_id"]
                print(f"Image uploaded successfully. Media ID: {media_id}")
            else:
                print(f"Error uploading image: {response.text}")

    return {}


if __name__ == "__main__":
    app.run(debug=True)
