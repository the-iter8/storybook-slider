import React from "react";
import Slider from "./components/Slider";

const App: React.FC = () => {
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
      <Slider
        min={0}
        max={100}
        size='medium'
        status='hover'
        type='range'
        step={40}
        value={{
          primary: 20,
          secondary: 80,
        }}
      />
    </div>
  );
};

export default App;
