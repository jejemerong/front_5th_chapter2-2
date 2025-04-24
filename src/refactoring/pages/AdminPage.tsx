import { useState } from "react";
import { Coupon, Product } from "../../types.ts";
import { CouponList } from "../components/admin/CouponList.tsx";
import { CouponForm } from "../components/admin/CouponForm.tsx";
import { HeadingTitle } from "../ui/HeadingTitle.tsx";
import { NewProductForm } from "../components/admin/NewProductForm.tsx";
import { ProductManager } from "../components/admin/ProductManager.tsx";

interface Props {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const AdminPage = ({
  products,
  coupons,
  onProductUpdate,
  onProductAdd,
  onCouponAdd,
}: Props) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    discounts: [],
  });

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      discounts: [],
    });
    setShowNewProductForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <HeadingTitle title="관리자 페이지" level="page" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <HeadingTitle title="상품 관리" level="section" />
          <button
            onClick={() => setShowNewProductForm(!showNewProductForm)}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
          >
            {showNewProductForm ? "취소" : "새 상품 추가"}
          </button>
          {showNewProductForm && (
            <NewProductForm
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              onAdd={handleAddNewProduct}
            />
          )}
          <ProductManager
            products={products}
            onProductUpdate={onProductUpdate}
            onProductAdd={onProductAdd}
          />
        </div>
        <div>
          <HeadingTitle title="쿠폰 관리" level="section" />
          <div className="bg-white p-4 rounded shadow">
            <CouponForm onCouponAdd={onCouponAdd} />
            <CouponList coupons={coupons} />
          </div>
        </div>
      </div>
    </div>
  );
};
