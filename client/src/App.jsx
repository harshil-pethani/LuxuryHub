//Components
import Home from './Pages/Home/Home'
import ProductList from './Pages/ProductList/ProductList'
import Login from './Pages/Login/Login'
import Forgot from './Pages/Forgot/Forgot'
import Register from './Pages/Register/Register'
import SingleProduct from './Pages/SingleProduct/SingleProduct'
import CartPage from './Pages/CartPage/CartPage'
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import Checkout from './Pages/Checkout/Checkout';
import Orders from './Pages/Orders/Orders';
import SingleOrder from './Pages/SingleOrder/SingleOrder'
import ProfilePage from './Pages/ProfilePage/ProfilePage'

//Dependency
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { cartFind } from './Config/Api'
import Reset from './Pages/Reset/Reset'


// Contexts
const CartContext = createContext();
const UserContext = createContext();

// console.log(token);

const App = () => {
  // Items of Cart Context
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  // Items of User Context
  const [currUser, setCurrUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getCart = async () => {
      const res = await axios.get(cartFind);
      setCurrUser(res.data.rootUser);
      if (res.data.quantity > 0) {
        setQuantity(res.data.quantity);
        setTotal(res.data.total);
        setProducts(res.data.products);
      }
    }
    getCart();
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{ currUser, setCurrUser, isFetching, setIsFetching }}>
        <CartContext.Provider
          value={{ products, setProducts, quantity, setQuantity, total, setTotal }}>
          <ScrollToTop>
            <Routes>
              <Route exact path="/" element={<Home />} />

              <Route exact path="/products/:category" element={<ProductList />} />

              <Route exact path="/product/:id" element={<SingleProduct />} />

              <Route exact path="/cart" element={<CartPage />} />

              <Route exact path="/checkout" element={currUser ? <Checkout /> : <Navigate to="/login" />} />

              <Route exact path="/profile" element={currUser ? <ProfilePage /> : <Navigate to="/login" />} />

              <Route exact path="/orders" element={currUser ? <Orders /> : <Navigate to="/login" />} />

              <Route exact path="/orders/:id" element={currUser ? <SingleOrder /> : <Navigate to="/login" />} />

              <Route exact path="/register" element={currUser ? <Navigate to="/" /> : <Register />} />

              <Route exact path="/login" element={currUser ? <Navigate to="/" /> : <Login />} />

              <Route exact path="/forgot_password" element={currUser ? <Navigate to="/" /> : <Forgot />} />

              <Route exact path="/reset_password" element={currUser ? <Navigate to="/" /> : <Reset />} />
            </Routes>
          </ScrollToTop>
        </CartContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App;
export { CartContext, UserContext };