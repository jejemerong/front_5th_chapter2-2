import { Coupon } from "../../../types";
import { HeadingTitle } from "../../ui/HeadingTitle";

interface CouponSelectProps {
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  onCouponApply: (coupon: Coupon) => void;
}

export const CouponSelect = ({
  coupons,
  selectedCoupon,
  onCouponApply,
}: CouponSelectProps) => {
  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <HeadingTitle title="쿠폰 적용" level="subSection" />
      <select
        onChange={(e) => onCouponApply(coupons[parseInt(e.target.value)])}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">쿠폰 선택</option>
        {coupons.map((coupon, index) => (
          <option key={coupon.code} value={index}>
            <CouponOption coupon={coupon} />
          </option>
        ))}
      </select>
      {selectedCoupon && <SelectedCouponInfo coupon={selectedCoupon} />}
    </div>
  );
};

const CouponOption = ({ coupon }: { coupon: Coupon }) => {
  const discountText = formatCouponDiscount(coupon);
  return (
    <>
      {coupon.name} - {discountText}
    </>
  );
};

const SelectedCouponInfo = ({ coupon }: { coupon: Coupon }) => {
  const discountText = formatCouponDiscount(coupon);
  return (
    <p className="text-green-600">
      적용된 쿠폰: {coupon.name}({discountText} 할인)
    </p>
  );
};

export const formatCouponDiscount = (coupon: Coupon): string => {
  return coupon.discountType === "amount"
    ? `${coupon.discountValue}원`
    : `${coupon.discountValue}%`;
};
