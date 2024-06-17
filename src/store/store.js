import { configureStore, createSlice } from "@reduxjs/toolkit"
import formatPrice from "../util/formatting";



const initialCartState = {
  formattedTotalPrice: '',
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const existedCartItemIndex = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      const existedCartItem = state.items[existedCartItemIndex];
      existedCartItem && existedCartItem.quantity++
      !existedCartItem && state.items.push({ ...action.payload, quantity: 1 })

    },
    removeItem(state, action) {
      const itemToBeRemovedIndex = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      const itemToBeRemoved = state.items[itemToBeRemovedIndex];
      if (itemToBeRemoved.quantity === 1)
        state.items.splice(itemToBeRemovedIndex, 1);
      else {
        itemToBeRemoved.quantity--
      }
    },
    resetItem() {
      return initialCartState
    },
    getFormattedTotalPrice(state) {
      const totalPrice = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.formattedTotalPrice = formatPrice(totalPrice);
    }
  }
})

const userProgressSlice = createSlice({
  name: 'userProgress',
  initialState: "",
  reducers: {
    showCart: () => "cart",
    showCheckout: () => "checkout",
    hideModal: () => "",
  }
})

export const cartActions = cartSlice.actions
export const userProgressActions = userProgressSlice.actions

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    userProgress: userProgressSlice.reducer
  },
  devTools:false
})

export default store