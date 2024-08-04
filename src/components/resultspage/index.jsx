import React from "react";
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const { inputList } = location.state || {};

  return (
    <div>
      <div className="w-screen h-screen" style={{ backgroundColor: "#DBBB9E" }}>
        <img
          src="Main_Logo.jpg"
          className="w-[75px] h-[75px] rounded-3xl ml-3 mt-3"
        ></img>
        <div
          className="w-2/3 h-2/3 flex rounded-3xl items-center justify-center"
          style={{ backgroundColor: "#E5DDD0" }}
        ></div>
      </div>
    </div>
  );
};

export default Results;
