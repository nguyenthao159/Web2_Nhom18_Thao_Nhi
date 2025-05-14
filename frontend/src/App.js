import "./assets/sass/app.scss"; 
import Header from './layouts/Header' 
import Footer from './layouts/Footer' 
import Main from './layouts/Main' 
import 'bootstrap/dist/css/bootstrap.min.css';
import AllProducts from './pages/AllProducts';
import CategoryProducts from './pages/CategoryProducts';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import React from 'react';
import Orders from "./pages/Orders";
import { Toaster } from "react-hot-toast";
import Home from "./layouts/Home";

function App() { 
     // Giả sử bạn quản lý giỏ hàng ở đây

    return (
        <CartProvider>
            <UserProvider>
                <div> 
                    <Header  /> 
                    <Main/> 
                    <Footer/> 
                    <Toaster />
                </div> 
            </UserProvider>
        </CartProvider>
    ); 
} 

const AppRoutes = () => {
  return (
   
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/products" element={<AllProducts />} />
      <Route path="/category/:categoryId" element={<CategoryProducts />} />
      <Route path="/orders" element={<Orders />} />

    </Routes>
  );
};

export default App;
