import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const Homepage = () => {
  const navigate = useNavigate();
  const [inputList, setInputList] = useState(["Jazz", "Blues"]);

  const handleSubmit = (e) => {
    console.log("SUBMITTED");
    e.preventDefault();
    navigate('/results', { state: { inputList } });
  };

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
            style={{ backgroundColor: "#E5DDD0" }}
          >
            <div className='w-[286px] h-[80px] flex items-center justify-center rounded-3x1'
            style={{ backgroundColor: "#E5DDD0" }}>
            <img src="file_logo.png" 
          className='w-[80px] h-[80px] rounded-3xl'>
          </img>
          </div>
          </div>
            <div className='w-[120px] h-[60px] flex items-center justify-center rounded-3x1 mt-10 rounded-3xl'
            style={{ backgroundColor: "#262727" }}>
            <button onClick={handleSubmit} type="submit" className="text-white rounded-3xl">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Homepage;
