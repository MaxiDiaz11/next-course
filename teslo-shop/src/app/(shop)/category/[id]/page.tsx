// import { notFound } from "next/navigation";

import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";

interface Props {
  params: {
    id: Category;
  };
}

const seedProducts = initialData.products;

export default function CategoryPage({ params }: Props) {
  const { id } = params;

  const products = seedProducts.filter((product) => product.gender === id);

  const labels: Record<Category, string> = {
    men: "para hombres",
    women: "para mujeres",
    kid: "para niños",
    unisex: "unisex",
  };

  // if (id === "kids") {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={`Productos ${labels[id]}`}
        subtitle="Todos los productos"
        className="mb-2"
      ></Title>

      <ProductGrid products={products} />
    </>
  );
}
