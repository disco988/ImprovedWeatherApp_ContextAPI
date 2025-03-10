import { useState, createContext, useContext } from "react";

const StateContext = createContext();

const StateContextProvider = ({ children }) => {
  const API_KEY = "6ef008d9fe8f262af03c5259d16c1512";
  const [locations, setLocations] = useState([]);
  const [history, setHistory] = useState([]);
  const [validCity, setValidCity] = useState(true);

  const fetchLocations = async (city) => {
    if (
      locations.some(
        (location) => location.city.name.toLowerCase() === city.toLowerCase()
      )
    ) {
      setValidCity(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log("fetched");

      if (!response.ok) {
        setValidCity(false);
        throw new Error("Unable to fetch the data");
      }

      const data = await response.json();

      if (!locations.some((location) => location.city.id === data.city.id)) {
        setLocations((prevState) => [...prevState, data]);
        setValidCity(true);
      }

      if (!history.includes(city)) {
        setHistory((prevState) => [...prevState, city]);
        setValidCity(true);
      }
    } catch (err) {
      console.error(err);
      setValidCity(false);
    }
  };

  const removeLocation = (id) => {
    setLocations((prevState) =>
      prevState.filter((location) => location.city.id !== id)
    );
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <StateContext.Provider
      value={{
        locations,
        setLocations,
        history,
        setHistory,
        validCity,
        setValidCity,
        fetchLocations,
        removeLocation,
        handleClearHistory,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

export default StateContextProvider;
