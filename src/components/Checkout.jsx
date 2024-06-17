import Modal from "./UI/Modal";
import Button from "./UI/Button";
import Input from "./UI/Input";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, userProgressActions } from "../store/store";

function isPostalValid(postal) {
  return !isNaN(postal) && postal.length === 7;
}

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const userProgress = useSelector((state) => state.userProgress);
  const formattedTotalPrice = useSelector(
    (state) => state.cart.formattedTotalPrice
  );
  const {
    fetchedData,
    error,
    loading: sending,
    sendRequest,
    onResetRequest,
  } = useHttp("https://gymgo-api.onrender.com/orders", requestConfig);

  function hideCheckoutHandle() {
    dispatch(userProgressActions.hideModal());
  }
  function resetItemsHandle() {
    dispatch(cartActions.resetItem());
  }

  function handleReset() {
    resetItemsHandle();
    onResetRequest();
    hideCheckoutHandle();
    dispatch(cartActions.getFormattedTotalPrice());
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    // if (!isPostalValid(data["postal-code"])) return;
    sendRequest(
      JSON.stringify({
        order: {
          items,
          customer: data,
        },
      })
    );
  }

  let action = (
    <>
      <Button textOnly onClick={hideCheckoutHandle}>
        Close
      </Button>
      <Button>Checkout</Button>
    </>
  );

  if (sending) {
    action = <span>Sending Order Data...</span>;
  }
  if (fetchedData) {
    return (
      <Modal
        onClose={userProgress === "checkout" ? hideCheckoutHandle : null}
        open={userProgress === "checkout"}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleReset}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      onClose={userProgress === "checkout" ? hideCheckoutHandle : null}
      open={userProgress === "checkout"}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>{`Total Amount: ${formattedTotalPrice} `}</p>
        <Input id="name" type="text" title="Full Name" />
        <Input id="email" type="email" title="E-Mail Address" />
        <Input id="street" type="text" title="Street" />
        <div className="control-row">
          <Input id="postal-code" type="text" title="Postal Code" />
          <Input id="city" type="text" title="City" />
        </div>
        {error && <Error title="Failed to submit order." message={error} />}

        <p className="modal-actions">{action}</p>
      </form>
    </Modal>
  );
}
