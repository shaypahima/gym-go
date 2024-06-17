import Modal from "./UI/Modal";
import formatPrice from "../util/formatting";
import Button from "./UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, userProgressActions } from "../store/store";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const userProgress = useSelector((state) => state.userProgress);
  const formattedTotalPrice = useSelector(
    (state) => state.cart.formattedTotalPrice
  );

  function addItemHandle(item) {
    dispatch(cartActions.addItem(item));
    dispatch(cartActions.getFormattedTotalPrice());
  }
  function removeItemHandle(id) {
    dispatch(cartActions.removeItem(id));
    dispatch(cartActions.getFormattedTotalPrice());
  }

  function hideCartHandle() {
    dispatch(userProgressActions.hideModal());
  }
  function showCheckoutHandle() {
    dispatch(userProgressActions.showCheckout());
  }

  return (
    <Modal
      onClose={userProgress === "cart" ? hideCartHandle : null}
      className="cart"
      open={userProgress === "cart"}
    >
      <h2>Your Cart</h2>
      {items.length === 0 && <p>The Cart is Empty!</p>}
      {items.length > 0 && (
        <ul>
          {items.map((item) => {
            return (
              <li key={item.id} className="cart-item">
                <div>
                  <span>{item.name} -</span>
                  <span>
                    {item.quantity} x {formatPrice(item.price)}
                  </span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => removeItemHandle(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addItemHandle(item)}>+</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {items.length !== 0 && (
        <p className="cart-total">{formattedTotalPrice}</p>
      )}

      <p className="modal-actions">
        <Button textOnly onClick={hideCartHandle}>
          Close
        </Button>
        {items.length !== 0 && (
          <Button onClick={showCheckoutHandle}>Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
