import { Coupon, Product } from "../../types.ts";
import { useCart } from "../hooks";
import { CouponSelect } from "../components/cart/CouponSelect.tsx";
import { CartList } from "../components/cart/CartList.tsx";
import { ProductList } from "../components/cart/ProductList.tsx";
import { CartResult } from "../components/cart/CartResult.tsx";
import { HeadingTitle } from "../ui/HeadingTitle.tsx";
interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    calculateTotal,
    applyCoupon,
    selectedCoupon,
  } = useCart();

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  return (
    <div className="container mx-auto p-4">
      <HeadingTitle title="장바구니" level="page" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList products={products} cart={cart} addToCart={addToCart} />
        <div>
          <CartList
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />

          <CouponSelect
            coupons={coupons}
            selectedCoupon={selectedCoupon}
            onCouponApply={applyCoupon}
          />

          <CartResult
            totalBeforeDiscount={totalBeforeDiscount}
            totalDiscount={totalDiscount}
            totalAfterDiscount={totalAfterDiscount}
          />
        </div>
      </div>
    </div>
  );
};
