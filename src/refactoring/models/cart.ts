import { Product, CartItem, Coupon } from "../../types";

export const getRemainingStock = (product: Product, cart: CartItem[]) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

export const calculateItemTotal = (item: CartItem) => {
  // 할인 없이 총액 계산
  const total = item.product.price * item.quantity;
  // 할인 적용
  if (item.product.discounts.length > 0) {
    const appliedDiscount = getAppliedDiscount(item);
    const totalAfterDiscount = total * (1 - appliedDiscount);
    return totalAfterDiscount;
  }
  return total;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  return getAppliedDiscount(item);
};

export const getMaxDiscount = (
  discounts: { quantity: number; rate: number }[]
) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getAppliedDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;
  let appliedDiscount = 0;
  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      appliedDiscount = Math.max(appliedDiscount, discount.rate);
    }
  }
  return appliedDiscount;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  // 각 아이템별 할인 전 가격 계산
  const totalBeforeDiscount = cart.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  // 각 아이템별로 할인을 적용한 총 금액 계산
  const totalAfterItemDiscount = cart.reduce((acc, item) => {
    const appliedDiscount = getAppliedDiscount(item);
    const itemPrice = item.product.price * item.quantity;
    return acc + itemPrice * (1 - appliedDiscount);
  }, 0);

  // 쿠폰 적용
  let finalTotalAfterDiscount = totalAfterItemDiscount;
  if (selectedCoupon) {
    if (selectedCoupon.discountType === "amount") {
      finalTotalAfterDiscount = Math.max(
        0,
        totalAfterItemDiscount - selectedCoupon.discountValue
      );
    } else {
      finalTotalAfterDiscount =
        totalAfterItemDiscount * (1 - selectedCoupon.discountValue / 100);
    }
  }

  const totalDiscount = totalBeforeDiscount - finalTotalAfterDiscount;

  return {
    totalBeforeDiscount,
    totalAfterDiscount: finalTotalAfterDiscount,
    totalDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  if (newQuantity <= 0) {
    return cart.filter((item) => item.product.id !== productId);
  }
  const updatedCart = cart.map((item) => {
    if (item.product.id === productId) {
      return {
        ...item,
        quantity: Math.min(newQuantity, item.product.stock),
      };
    }
    return item;
  });
  return updatedCart;
};
