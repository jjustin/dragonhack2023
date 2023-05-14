import * as React from "react";
import { auth, isLoggedIn } from "../twitter/twitter";
import "./Header.css";

export default function Header(props) {
  return (
    <>
      <section className="header min-w-full h-screen max-h-96 flex flex-col relative shrink-0 box-border leading-normal text-left text-3xl mx-8 section">
        <h1 className="p-12 font-bold font-mono text-5xl italic text-white">
          DIGITAL PROTESTS<span className="animate-bounce"></span>
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
