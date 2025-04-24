// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import {
  calculateCartTotal,
  getRemainingStock,
  updateCartItemQuantity,
  addItemToCart,
  removeItemFromCart,
} from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    if (getRemainingStock(product, cart) === 0) return;
    setCart((prevCart) => addItemToCart(prevCart, product));
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => removeItemFromCart(prevCart, productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) =>
      updateCartItemQuantity(prevCart, productId, newQuantity)
    );
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => {
    const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
      calculateCartTotal(cart, selectedCoupon);
    return { totalBeforeDiscount, totalAfterDiscount, totalDiscount };
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
