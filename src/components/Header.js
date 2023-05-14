import * as React from "react";
import "./Header.css";

export default function Header(props) {
  const navigate = (to) => {
    window.location.href = to;
  };
  return (
    <>
      <section
        style={{ backgroundColor: "rgba(236, 70, 70, 1)" }}
        className="header min-w-full h-screen max-h-32 flex flex-col relative shrink-0 box-border leading-normal text-left mx-8 section"
      >
        <h1
          onClick={() => navigate("")}
          className="px-12 pt-8 font-bold font-mono text-5xl italic text-white text-black"
          style={{ cursor: "pointer" }}
        >
          <span className="animate-bounce text-5xl">Spark</span>
          <div className="text-xs">Ignite your voice</div>
        </h1>
      </section>
    </>
  );
}
