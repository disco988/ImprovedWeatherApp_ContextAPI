import { useState, useEffect } from "react";
import CardDetails from "./CardDetails";
import { useStateContext } from "./context/StateContext";

import Button from "./Button";

const Card = ({ location }) => {
  const { removeLocation } = useStateContext();
  const [selectedRange, setSelectedRange] = useState(0);

  useEffect(() => {
    const rangeInterval = setInterval(() => {
      setSelectedRange((prevState) => (prevState + 1) % location.list.length);
    }, 5000);

    return () => clearInterval(rangeInterval);
  }, []);

  const currentWeather = location.list[selectedRange];
  const currentDate = new Date(currentWeather.dt * 1000).toLocaleString();

  return (
    <div className="flex flex-col h-auto w-[80%] bg-white py-2 rounded-md items-center">
      <CardDetails
        currentWeather={currentWeather}
        currentDate={currentDate}
        location={location}
      />
      <input
        type="range"
        min="0"
        max={location.list.length - 1}
        value={selectedRange}
        onChange={(e) => {
          setSelectedRange(Number(e.target.value));
        }}
        className="w-[40%] mx-auto cursor-pointer my-4 appearance-none bg-indigo-500 rounded-md h-2 hover:bg-green-400"
      />
      <Button onClick={() => removeLocation(location.city.id)}>Close</Button>
    </div>
  );
};

export default Card;
