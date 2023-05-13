import * as React from "react";
import { useState } from 'react'
import { FormSubmitButton, FormInput } from "@builder.io/react";


export default function Body(props) {
  const [sliderValue, setSliderValue] = useState(40)

  return (
    <>
      <div
        className="flex flex-col relative shrink-0 box-border h-auto grow-0 border mt-0 p-[20px] rounded-[5px] border-none"
      >
        <section className="flex flex-col relative shrink-0 box-border h-auto grow-0 border mt-0 p-[20px] rounded-[5px] border-none section">
          <div
            className="flex flex-row justify-around items-stretch gap-[10px] m-[30px] px-[50px]"
            space={30}
          >
            <input
              type="text"
              placeholder="What would you like to protest about?"
              name="type"
              className="flex flex-col relative shrink-0 box-border self-stretch h-auto grow mr-auto pl-[20px] pr-0 py-[20px] rounded-[10px] border-[3px] border-solid border-[#ccc]"
              required={true}
            />
            <button className="h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">Submit</button>
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
          <div className="px-36 py-5 w-full">
            <input type="range" min="0" max="100" value={sliderValue} onChange={e => setSliderValue(e.target.value)} className="range w-full" />
          </div>
          <div
            className="flex flex-col relative shrink-0 box-border min-h-[180px] w-full mt-0 mx-auto pl-[7px] pr-[20px] pt-[10px] pb-[20px]"
          >
            <section className="flex flex-col relative shrink-0 box-border min-h-[180px] w-full mt-0 mx-auto pl-[7px] pr-[20px] pt-[10px] pb-[20px] section" />
          </div>
        </section>
      </div>
    </>
  );
}
