import { HeadingTitle } from "../../ui/HeadingTitle";

interface CartResultProps {
  totalBeforeDiscount: number;
  totalDiscount: number;
  totalAfterDiscount: number;
}

export const CartResult = ({
  totalBeforeDiscount,
  totalDiscount,
  totalAfterDiscount,
}: CartResultProps) => {
  return (
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
  );
};
