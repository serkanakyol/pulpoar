export async function action({ request }) {
  const { products } = await request.json();

  for (const product of products) {
    await db.selectedProduct.upsert({
      where: { shopifyProductId: product.id },
      update: { title: product.title },
      create: {
        shopifyProductId: product.id,
        title: product.title,
      },
    });
  }

  return json({ success: true });
}
