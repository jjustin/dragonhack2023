import * as React from "react";

export default function Header(props) {
  return (
    <>
      <div
        className="flex flex-col relative shrink-0 box-border min-h-[100px] bg-[rgba(0,39,128,0.8)] leading-[normal] h-auto text-left text-[25px] mx-[15px] my-[10px] p-[20px]"
        maxWidth={1200}
        lazyLoad={false}
      >
        <section className="flex flex-col relative shrink-0 box-border min-h-[100px] bg-[rgba(0,39,128,0.8)] leading-[normal] h-auto text-left text-[25px] mx-[15px] my-[10px] p-[20px] section">
          <h1>
            <strong>
              <em>
                DIGITAL PROTESTS<span class="ql-cursor">﻿</span>
              </em>
            </strong>
          </h1>
        </section>
      </div>
      <style jsx>{`
        .section {
          width: 100%;
          align-self: stretch;
          flex-grow: 1;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </>
  );
}
