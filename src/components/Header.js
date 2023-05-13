import * as React from "react";

export default function Header(props) {
  return (
    <>
      <section className="min-w-full h-screen max-h-36 flex flex-col relative shrink-0 box-border bg-[rgba(0,39,128,0.8)] leading-[normal] h-auto text-left text-[25px] mx-[15px] section">
        <h1 className="p-12 font-bold">
            <em>
              DIGITAL PROTESTS<span className="ql-cursor">🤰</span>
            </em>
        </h1>
      </section>
    </>
  );
}
