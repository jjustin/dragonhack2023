import * as React from "react";
import { FormSubmitButton, FormInput } from "@builder.io/react";

export default function Body(props) {
  return (
    <>
      <div
        className="flex flex-col relative shrink-0 box-border h-auto grow-0 border mt-0 p-[20px] rounded-[5px] border-none"
        maxWidth={1200}
        lazyLoad={false}
      >
        <section className="flex flex-col relative shrink-0 box-border h-auto grow-0 border mt-0 p-[20px] rounded-[5px] border-none section">
          <div
            className="flex flex-row justify-around items-stretch gap-[10px] m-[30px] px-[50px]"
            space={30}
          >
            <FormInput
              type="text"
              placeholder="What would you like to protest about?"
              name="type"
              className="flex flex-col relative shrink-0 box-border self-stretch h-auto grow mr-auto pl-[20px] pr-0 py-[20px] rounded-[10px] border-[3px] border-solid border-[#ccc]"
              required={true}
            />
            <FormSubmitButton
              text="Search"
              className="inline-flex flex-row items-center justify-center relative shrink-0 box-border no-underline appearance-none bg-[#3898EC] text-[white] cursor-pointer self-stretch leading-none transition-[background-color,border-color,color,fill,stroke,opacity,box-shadow,transform] duration-[0.2s] ease-in-out delay-[0s] whitespace-nowrap font-medium text-[16px] -tracking-wider overflow-hidden text-ellipsis normal-case align-baseline h-auto mr-auto px-[24px] py-[12px] rounded-[5px] border-[none]"
            />
          </div>
          <div className="relative shrink-0 box-border flex flex-row w-auto self-stretch justify-around gap-[20px] mt-[20px]">
            <div className="flex flex-col relative shrink-0 box-border leading-[normal] h-auto ml-auto mt-[20px]">
              <p>Not so serious</p>
            </div>
            <div className="flex flex-col relative shrink-0 box-border leading-[normal] h-auto w-auto self-center mt-[20px] mx-auto">
              <p>How serious do you want your protest to be?</p>
            </div>
            <div className="flex flex-col relative shrink-0 box-border leading-[normal] h-auto mr-auto mt-[20px] pr-[20px]">
              <p>Very serious</p>
            </div>
          </div>
          <div
            className="flex flex-col relative shrink-0 box-border min-h-[180px] w-full mt-0 mx-auto pl-[7px] pr-[20px] pt-[10px] pb-[20px]"
            maxWidth={1200}
            lazyLoad={false}
          >
            <section className="flex flex-col relative shrink-0 box-border min-h-[180px] w-full mt-0 mx-auto pl-[7px] pr-[20px] pt-[10px] pb-[20px] section" />
          </div>
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
