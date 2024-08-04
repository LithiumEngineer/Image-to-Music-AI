import React, { useState } from "react";

export const Homepage = () => {
  return (
    <div>
      <div className="w-screen h-screen" style={{ backgroundColor: "#DBBB9E" }}>
        <div class="h-screen flex items-center ml-20">
          <div
            className="w-[600px] h-[600px] flex rounded-3xl items-center justify-center"
            style={{ backgroundColor: "#E5DDD0" }}
          >
            <img src="Main_Logo.jpg" 
              className='w-[500px] h-[500px] rounded-3xl'>
              </img> 
          </div>
          <div class="flex flex-col ml-20 h-full mt-80 items-center">
            <p className="text-7xl font-semibold font-serif text-white-800">
              Audiolux.AI
            </p>
            <p className="text-5xl font-serif text-white-800">
            Upload image for soundtrack
            </p>
            <div
            className="w-[300px] h-[100px] flex rounded-3xl items-center justify-center mt-20"
            style={{ backgroundColor: "#262727" }}
          ><img src="Main_Logo.jpg" 
          className='w-[270px] h-[70px] rounded-3xl'>
          </img></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Homepage;
