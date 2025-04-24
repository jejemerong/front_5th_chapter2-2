import { Coupon, Product } from "../../types.ts";
import { CartList } from "../components/CartList.tsx";
import { ProductList } from "../components/ProductList.tsx";
import { useCart } from "../hooks";
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
        <div>
          <HeadingTitle title="상품 목록" level="section" />
          <ProductList products={products} cart={cart} addToCart={addToCart} />
        </div>
        <div>
          <HeadingTitle title="장바구니 내역" level="section" />
          <CartList
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />

          <div className="mt-6 bg-white p-4 rounded shadow">
            <HeadingTitle title="쿠폰 적용" level="subSection" />
            <select
              onChange={(e) => applyCoupon(coupons[parseInt(e.target.value)])}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">쿠폰 선택</option>
              {coupons.map((coupon, index) => (
                <option key={coupon.code} value={index}>
                  {coupon.name} -{" "}
                  {coupon.discountType === "amount"
                    ? `${coupon.discountValue}원`
                    : `${coupon.discountValue}%`}
                </option>
              ))}
            </select>
            {selectedCoupon && (
              <p className="text-green-600">
                적용된 쿠폰: {selectedCoupon.name}(
                {selectedCoupon.discountType === "amount"
                  ? `${selectedCoupon.discountValue}원`
                  : `${selectedCoupon.discountValue}%`}{" "}
                할인)
              </p>
            )}
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow">
            <HeadingTitle title="주문 요약" level="subSection" />
            <div className="space-y-1">
              <p>상품 금액: {totalBeforeDiscount.toLocaleString()}원</p>
              <p className="text-green-600">
                할인 금액: {totalDiscount.toLocaleString()}원
              </p>
              <p className="text-xl font-bold">
                최종 결제 금액: {totalAfterDiscount.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
