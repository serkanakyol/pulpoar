import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server"; // örnek db instance

export const action = async ({ request }) => {
  const { admin, shop } = await authenticate.admin(request);
  const { productIds } = await request.json();

  await prisma.selectedProduct.deleteMany({
    where: { shop: shop.shop },
  });

  await Promise.all(
    productIds.map((id) =>
      prisma.selectedProduct.create({
        data: { shop: shop.shop, productId: id.toString() },
      })
    )
  );

  return json({ success: true });
};
