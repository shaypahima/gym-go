import EquipmentItem from "./EquipmentItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const config = {};
export default function Equipments() {
  const {
    fetchedData: equipments,
    loading,
    error,
  } = useHttp("https://gymgo-api.onrender.com/equipments", config, []);

  if (loading) {
    return <p className="center">loading data...</p>;
  }
  if (error) {
    return <Error message={error} title="Something went wrong!" />;
  }

  return (
    <ul id="equipments">
      {equipments.map((item) => (
        <EquipmentItem key={item.id} item={item} />
      ))}
    </ul>
  );
}