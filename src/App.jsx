import { useEffect, useState } from "react";
import History from "./History";
import "./App.css";
import SearchBar from "./SearchBar";
import WeatherCards from "./WeatherCards";
import {useStateContext} from "./context/StateContext";

function App() {
  

  const { history, setHistory, validCity } = useStateContext();

  useEffect(() => {
    const storedHistory = localStorage.getItem("weatherHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("weatherHistory", JSON.stringify(history));
    }
  }, [history]);

  return (
    <div className="bg-gray-200 min-h-screen text-black p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Weather App <span className="text-sm">by Dawid Jaskólski</span>
      </h1>
      <SearchBar />
      <div className="flex justify-center">
        {!validCity && <p>city does not exist or name is incorrect!</p>}
      </div>
      <WeatherCards></WeatherCards>
      <History />
    </div>
  );
}

export default App;
