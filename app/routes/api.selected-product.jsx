import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const action = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  const { productIds } = await request.json();

  if (!session?.shop) {
       return unauthenticated.redirectToAuth({ request });
  }

  await prisma.selectedProduct.deleteMany({
    where: { shop: session.shop},
  });

  await Promise.all(
    productIds.map((id) =>
      prisma.selectedProduct.create({
        data: { shop: session.shop, productId: id.toString() },
      })
    )
  );

  return json({ success: true });
};
