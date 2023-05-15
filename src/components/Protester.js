import * as React from "react";
import { useState } from "react";
import {
  getUsername,
  isLoggedIn,
  logout,
  tweet,
  auth,
  composeTweet,
} from "../twitter/twitter";
import serious_image from "./serious.png";

export default function Protester() {
  const [sliderValue, setSliderValue] = useState(40);
  const [prompt, setPrompt] = useState("");
  const username = getUsername();

  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const seriousVisible = (Math.max(0, sliderValue - 87) / (100 - 87)) * 100;
  const loggedIn = isLoggedIn();

  return (
    <>
      <div className="h-screen bg-gray-100 flex flex-col py-6 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
          {loggedIn && (
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg w-min-4/5">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    What would you like to protest about?
                  </label>
                  <div className="mt-1">
                    <input
                      id="type"
                      name="type"
                      type="text"
                      autoComplete="type"
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("This field is required!")
                      }
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Type here..."
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="seriousness"
                    className="block text-sm font-medium text-gray-700"
                  >
                    How serious do you want your protest to be?
                  </label>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-500 mr-2">
                      Not so serious
                    </span>
                    <div className="flex-grow">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderValue}
                        onChange={(e) => setSliderValue(e.target.value)}
                        className="range appearance-none h-3 w-full bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                      />
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      Very serious
                    </span>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setLoading(true);
                      setText("");
                      setImage("");

                      composeTweet(prompt, sliderValue).then((r) => {
                        setText(r.text);
                        setImage(r.image);
                        setLoading(false);
                      });
                      return false;
                    }}
                    style={{ backgroundColor: "rgba(255, 78, 94, 1)" }}
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Protest!!
                  </button>
                  {loading && <div>loading</div>}
                  {(text || image) && (
                    <div className="py-3">We prepared this tweet for you:</div>
                  )}
                  {text && <div className=" py-3">{text}</div>}
                  {image && (
                    <div className="flex justify-center items-center">
                      <img src={image} className="pb-10" alt="preview" />
                    </div>
                  )}
                  {(text || image) && (
                    <button
                      onClick={() => {
                        tweet(image, text).then((r) => {
                          setText("");
                          setImage("");
                          setLoading(false);
                        });
                        return false;
                      }}
                      style={{ backgroundColor: "rgba(255, 78, 94, 1)" }}
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Post it
                    </button>
                    <div>Check out <a href="https://twitter.com/DrazenHako77128">Drago Hak</a> on twitter to see what the final results look like!</div>
                  )}
                  <div className="block text-sm font-medium text-gray-700 pt-16 center w-full content-center justify-center flex">
                    Logged in as {username}
                  </div>
                  <div className="w-full flex justify-center">
                    <button
                      onClick={() => {
                        logout();
                        return false;
                      }}
                      style={{ backgroundColor: "rgba(90,90,90, 1)" }}
                      type="submit"
                      className="w-100 flex justify-center mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!loggedIn && (
            <button
              onClick={() => {
                auth();
              }}
              style={{ backgroundColor: "rgba(255, 78, 94, 1)" }}
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in with twitter to protest
            </button>
          )}

          <div
            className="flex justify-center items-center"
            style={{ paddingTop: "50%" }}
          >
            <img
              src={serious_image}
              alt="serious_image"
              style={{
                position: "absolute",
                maxWidth: `${seriousVisible}%`,
                maxHeight: `${seriousVisible}%`,
                opacity: `${seriousVisible}%`,
              }}
              unselectable="on"
            />
          </div>

          {/* <div className="p-12">
            <div className="border-l-4 border-indigo-600 pl-4">
              <p className="text-sm font-medium text-gray-700 mb-1">
                "Reinventing democracy!"
              </p>
              <p className="text-xs text-gray-500 ml-2">~ Nedeljski, 2023 *</p>
            </div>
            <div className="border-l-4 border-indigo-600 pl-4 mt-4">
              <p className="text-sm font-medium text-gray-700 mb-1">
                "No need to drive tractors to the city centre anymore!"
              </p>
              <p className="text-xs text-gray-500 ml-2">~ Delo, 2023 *</p>
            </div>
          </div>
          <div>
            <p className="p-6 text-xs text-right mr-12">
              * not true statements
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
}
