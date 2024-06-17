import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { userProgressActions } from "../store/store";

export default function Header() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  function handleShowCart() {
    dispatch(userProgressActions.showCart());
  }
  const cartQuantity = items.reduce((totalQuantity, currentItem) => {
    return totalQuantity + currentItem.quantity;
  }, 0);

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logoImg} alt="logo-image" />
          <h1>GymGo</h1>
        </div>
        <nav>
          <Button textOnly onClick={handleShowCart}>
            Cart ({cartQuantity})
          </Button>
        </nav>
      </header>
    </>
  );
}
