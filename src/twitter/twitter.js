const BEARER_TOKEN_KEY = "BEARER_TOKEN";
const USERNAME_KEY = "USERNAME";
const API_URL = "http://localhost:5000";

export function isLoggedIn() {
  if (localStorage.getItem(BEARER_TOKEN_KEY)) {
    console.log("logged in");
    return true;
  }
  console.log("not logged in");
  return false;
}

export function getUsername() {
  return localStorage.getItem(USERNAME_KEY);
}

export async function composeTweet(prompt, seriousness) {
  return fetch("https://meme-api.com/gimme").then(res => res.json()).then(res => ({
    text: "This feauture is disabled. This is an example tweet about '"+ prompt +"' that won't and can't be posted #makeTwitterAPIPublic @twiiter @elonMusk. Here is a random meme:",
    image: res.preview[res.preview.length-1]
  }))
//  return fetch(API_URL + "/compose", {
//    headers: { "Content-Type": "application/json" },
//    method: "POST",
//    body: JSON.stringify({ prompt, seriousness }),
//  }).then((res) => res.json());
}

export async function tweet(image, text) {
  return new Promise({})
//  console.log({ image, text });
//  const bearerToken = localStorage.getItem(BEARER_TOKEN_KEY);
//  console.log(bearerToken);
//  fetch(API_URL + "/tweet", {
//    headers: { Authorization: bearerToken, "Content-Type": "application/json" },
//    method: "POST",
//    body: JSON.stringify({ image, text }),
//  }).then((res) => res.json());
}

export async function auth() {
  localStorage.setItem(BEARER_TOKEN_KEY, "fake token lmao");
  localStorage.setItem(USERNAME_KEY, "mock user");
  window.location.replace(new URL(window.location).origin + "/protest");
//  await fetch(API_URL + "/auth", { credentials: "include" })
//    .then((res) => res.json())
//    .then(({ url }) => {
//      window.location.replace(url);
//    });
}

export function authStep2() {
  const token = new URLSearchParams(window.location.search).get("oauth_token");
  const verifier = new URLSearchParams(window.location.search).get(
    "oauth_verifier"
  );
  console.log(token);
  return fetch(API_URL + "/auth/" + token + "/" + verifier, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => {
      const {
        oauth_token: token,
        oauth_token_secret: token_secret,
        screen_name: username,
      } = res;
      if (token) {
        localStorage.setItem(BEARER_TOKEN_KEY, token + ":" + token_secret);
        localStorage.setItem(USERNAME_KEY, username);
        window.location.replace(new URL(window.location).origin + "/protest");
      }
    });
}

export async function logout() {
  localStorage.removeItem(BEARER_TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
  window.location.replace(new URL(window.location).origin);
}
