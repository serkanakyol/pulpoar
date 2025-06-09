export async function loader() {
  const products = await db.selectedProduct.findMany();
  return json({ products });
}
