import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const getUserAndToken = () => {
  const userStr = localStorage.getItem("user");
  const token = localStorage.getItem("authToken");
  const cartId = localStorage.getItem("cartId");

  if (!userStr || !token || !cartId) return null;

  return {
    user: JSON.parse(userStr),
    token,
    cartId,
  };
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    cartId: null,
    totalPrice: 0,
    products: [],
  });

  const fetchCartFromBackend = async () => {
    const userData = getUserAndToken();
    if (!userData) return;

    try {
      const { user, token, cartId } = userData;

      const response = await axios.get(
        `http://localhost:8080/api/public/users/${user.email}/carts/${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setCart(response.data);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        localStorage.removeItem("cartId");
      } else {
        console.error("Lỗi khi lấy giỏ hàng:", error);
        toast.error("Không thể tải giỏ hàng!");
      }
    }
  };

  useEffect(() => {
    fetchCartFromBackend();
  }, []);

  const addToCart = async (product, quantity) => {
    const userData = getUserAndToken();
    if (!userData) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm!");
      return;
    }

    try {
      const { token, cartId } = userData;

      const response = await axios.post(
        `http://localhost:8080/api/public/carts/${cartId}/products/${product.productId}/quantity/${quantity}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setCart(response.data);
        toast.success("Đã thêm sản phẩm vào giỏ hàng!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Không thể thêm sản phẩm vào giỏ hàng!");
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    const userData = getUserAndToken();
    if (!userData) return;

    const { token, cartId } = userData;

    if (newQuantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/public/carts/${cartId}/products/${productId}/quantity/${newQuantity}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setCart(response.data);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Không thể cập nhật số lượng sản phẩm!");
    }
  };

  const removeFromCart = async (productId) => {
    const userData = getUserAndToken();
    if (!userData) return;

    const { token, cartId } = userData;

    try {
      await axios.delete(
        `http://localhost:8080/api/public/carts/${cartId}/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart((prevCart) => ({
        ...prevCart,
        products: prevCart.products.filter(
          (item) => item.product.productId !== productId
        ),
      }));
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Không thể xóa sản phẩm khỏi giỏ hàng!");
    }
  };

  const getTotalItems = () =>
    cart.products.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems: getTotalItems(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
