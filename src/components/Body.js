import * as React from "react";
import { useState } from 'react'
import { FormSubmitButton, FormInput } from "@builder.io/react";


export default function Body(props) {
  const [sliderValue, setSliderValue] = useState(40)

  return (
    <div className="h-full bg-gray-100 flex flex-col justify-center py-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg w-min-4/5">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                What would you like to protest about?
              </label>
              <div className="mt-1">
                <input
                  id="type"
                  name="type"
                  type="text"
                  autoComplete="type"
                  required
                  onInvalid={e => e.target.setCustomValidity("This field is required!")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Type here..."
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="seriousness" className="block text-sm font-medium text-gray-700">
                How serious do you want your protest to be?
              </label>
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-500 mr-2">Not so serious</span>
                <div className="flex-grow">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={e => setSliderValue(e.target.value)}
                    className="range appearance-none h-3 w-full bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  />
                </div>
                <span className="text-sm text-gray-500 ml-2">Very serious</span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="p-5 font-serif">
              <p className="p-2 text-sm">"Reinventing democracy!" (Nedeljski)*</p>
              <p className="p-2 text-sm">"No need to drive tractors to the city centre anymore!" (Delo)*</p>
            </div>
      </div>
      <div>
        <p className="p-6 text-xs text-right mr-12">* not true statements</p>
      </div>
    </div>
  );
}