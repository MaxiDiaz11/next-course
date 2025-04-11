import React from "react";
import { ProductCard } from "@/products/components";
import { Product, products } from "@/products/data/products";

const ProductsPage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {products.map((product: Product) => (
        <ProductCard key={product.id} {...product}></ProductCard>
      ))}
    </div>
  );
};

export default ProductsPage;
