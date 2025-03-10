import Button from "./Button";
import { useStateContext } from "./context/StateContext";
const History = () => {
  const { locations, history, fetchLocations, handleClearHistory } =
    useStateContext();

  const handleAddFromHistory = (city) => {
    if (
      !locations.some(
        (location) => location.city.name.toLowerCase() === city.toLowerCase()
      )
    ) {
      fetchLocations(city);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl">History</p>
      {history.length > 0 ? (
        <ul className="flex flex-col items-center">
          {history.map((city) => (
            <li
              className="cursor-pointer my-2"
              key={city}
              onClick={() => handleAddFromHistory(city)}
            >
              {city}
            </li>
          ))}
          <Button onClick={handleClearHistory}>Clear History</Button>
        </ul>
      ) : (
        <p>No history to display</p>
      )}
    </div>
  );
};

export default History;
