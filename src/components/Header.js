import * as React from "react";
import "./Header.css";

export default function Header(props) {
  const navigate = (to) => {
    window.location.href = to;
  };
  return (
    <>
      <section
        style={{ backgroundColor: "rgba(255, 78, 94, 1)" }}
        className="header min-w-full h-screen max-h-32 flex flex-col relative shrink-0 box-border leading-normal text-left mx-8 section"
      >
        <h1
          onClick={() => navigate("")}
          className="px-12 pt-4 font-bold font-mono text-5xl text-white text-black"
          style={{ cursor: "pointer" }}
        >
          <span
            className="animate-bounce text-7xl text-white"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Spark
          </span>
          <div className="text-xs pt-2 pl-1 text-white">Ignite your voice</div>
        </h1>
      </section>
    </>
  );
}
