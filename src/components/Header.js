import * as React from "react";
import { auth, isLoggedIn } from "../twitter/twitter";

export default function Header(props) {
  return (
    <>
      <section className="min-w-full h-screen max-h-36 flex flex-col relative shrink-0 box-border bg-indigo-900 leading-normal text-left text-3xl mx-8 section">
        <h1 className="p-12 font-bold font-mono text-5xl italic text-white">
          <em>
            DIGITAL PROTESTS<span className="animate-bounce"></span>
          </em>
        </h1>
        <button
          onClick={() => {
            auth();
          }}
        >
          login
        </button>
      </section>
    </>
  );
}
