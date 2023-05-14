import base64
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


consumer_key = "<Key>"
consumer_secret = "<Key secret>"

client = Api(
    consumer_key=consumer_key,
    consumer_secret=consumer_secret,
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


@app.route("/compose", methods=["POST"])
def compose():
    prompt = request.json["prompt"]
    seriousness = int(request.json["seriousness"])
    tweet = get_tweet(prompt, seriousness)
    return tweet


@app.route("/tweet", methods=["POST"])
def tweet():
    auth = request.headers.get("Authorization")
    [token, token_secret] = auth.split(":")
    api = Api(
        consumer_key=consumer_key,
        consumer_secret=consumer_secret,
        access_token=token,
        access_secret=token_secret,
    )
    text = None
    image_url = None
    if "image" in request.json:
        image_url = request.json["image"]
        print(image_url)
    if "text" in request.json:
        text = request.json["text"]
        print(text)

    # if tweet is string
    if not image_url:
        api.create_tweet(text=text)
        # print("Mock tweet", text)
    else:
        image_request = requests.get(image_url)
        image = image_request.content
        # print("mock tweet", tweet)
        # print("mock tweet image")
        # Set the endpoint URL
        url = "https://upload.twitter.com/1.1/media/upload.json?media_category=tweet_image"

        # Set the POST data
        data = {"media_data": base64.b64encode(image)}

        # Make the POST request
        response = api._request(url, verb="POST", data=data)

        # Check the response status code
        if response.status_code == 200:
            # Get the media ID from the response
            media_id = response.json()["media_id"]
            print(f"Image uploaded successfully. Media ID: {media_id}")
            # put list tweet[1] to str

            res = api.create_tweet(
                text=text, media_media_ids=[str(media_id)], media_tagged_user_ids=[]
            )
            print(res)

        else:
            print(f"Error uploading image: {response.text} {response.status_code}")

    return {}


if __name__ == "__main__":
    app.run(debug=True)
