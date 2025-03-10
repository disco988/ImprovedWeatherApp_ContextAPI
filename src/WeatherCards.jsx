import Card from "./Card";
import { useStateContext } from "./context/StateContext";

const WeatherCards = () => {
  const { locations } = useStateContext();
  return (
    <div className="flex flex-wrap w-full h-full gap-10 justify-center py-10">
      {locations.map((location) => (
        <Card key={location.city.id} location={location} />
      ))}
    </div>
  );
};

export default WeatherCards;
