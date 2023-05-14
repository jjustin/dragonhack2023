import * as React from "react";
import { auth, isLoggedIn } from "../twitter/twitter";
import "./Header.css";

export default function Header(props) {
  return (
    <>
      <section className="header min-w-full h-screen max-h-32 flex flex-col relative shrink-0 box-border leading-normal text-left mx-8 section bg-red-600	">
        <h1 className="px-12 pt-8 font-bold font-mono text-5xl italic text-white text-black">
          <span className="animate-bounce text-5xl">eProtest</span>
          <div className="text-xs">It's not spam if it's protesting</div>
        </h1>
      </section>
    </>
  );
}
