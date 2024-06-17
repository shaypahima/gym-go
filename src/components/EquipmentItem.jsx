import formatPrice from "../util/formatting";
import Button from "./UI/Button";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/store";

export default function EquipmentItem({ item }) {
  const dispatch = useDispatch();

  const formattedPrice = formatPrice(item.price);

  function addItemHandle(item) {
    dispatch(cartActions.addItem(item));
    dispatch(cartActions.getFormattedTotalPrice());
  }

  return(
    <li className="equipment-item">
    <article>
      <img src={`https://gymgo-api.onrender.com/${item.image}`} alt={item.name} />
      <div>
        <h3>{item.name}</h3>
        <p className="equipment-item-price">{formattedPrice}</p>
        <p className="equipment-item-description">{item.description}</p>
      </div>
      <p>
        <Button
          onClick={() => {
            addItemHandle(item);
          }}
          className="equipment-item-actions"
        >
          Add to Cart
        </Button>
      </p>
    </article>
  </li>
  );
}
