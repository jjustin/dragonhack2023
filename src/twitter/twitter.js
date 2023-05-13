const BEARER_TOKEN_KEY = "BEARER_TOKEN";

export async function tweet(prompt, seriousness) {
  const bearerToken = localStorage.getItem(BEARER_TOKEN_KEY);
  console.log(bearerToken);
  fetch("http://localhost:5000/tweet", {
    headers: { Authorization: bearerToken, "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ prompt, seriousness }),
  }).then((res) => res.json());
}

export async function auth() {
  await fetch("http://localhost:5000/auth", { credentials: "include" })
    .then((res) => res.json())
    .then(({ url }) => {
      window.location.replace(url);
    });
}

export function authStep2() {
  const code = new URLSearchParams(window.location.search).get("code");
  console.log(code);
  return fetch("http://localhost:5000/auth/" + code, { credentials: "include" })
    .then((res) => res.json())
    .then((res) => {
      const { access_token: token } = res;
      if (token) {
        localStorage.setItem(BEARER_TOKEN_KEY, token);
        window.location.replace(new URL(window.location).origin);
      }
    });
}
