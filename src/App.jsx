import { Provider } from "react-redux"
import store from "./store/store"
import Header from "./components/Header"
import Equipments from "./components/Equipments"
import Cart from "./components/Cart"
import Checkout from "./components/Checkout"




function App() {

  return (
    <Provider store={store}>
      <Header/>
      <Equipments/>
      <Cart/>
      <Checkout/>
    </Provider>
  )
}

export default App
