import React from "react";
import { ItemCard } from "../../../shopping-cart/components/ItemCart";
import { cookies } from "next/headers";
import { products, type Product } from "@/products/data/products";
import { WidgetItem } from "@/components";

export const metadata = {
  title: "Carrito",
  description: "Carrito de compras",
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
  const productsInCart: ProductInCart[] = [];

  for (const id of Object.keys(cart)) {
    const product = products.find((product) => product.id === id);

    if (product) {
      productsInCart.push({
        product,
        quantity: cart[id],
      });
    }
  }

  return productsInCart;
};

const CartPage = async() => {
  const cookieStore = await cookies();
  const cart = JSON.parse(cookieStore.get("cart")?.value || "{}") as {
    [id: string]: number;
  };

  const products = getProductsInCart(cart);

  const totalToPay = products.reduce(
    (prev, current) => current.product.price * current.quantity + prev,
    0
  );

  return (
    <div>
      <h1 className="text-5xl">Productos en el carrito</h1>
      <hr className="mb-6" />
      <div className="flex flex-row sm:flex row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {products.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Resumen de compra">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">
                ${totalToPay}
              </h3>
            </div>
            <span className="text-center font-bold text-gray-500">
              Impuestos 15%: ${(totalToPay * 0.15).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
