import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);

  if (!session?.shop) {
    throw new Error("Shop information missing in session.");
  }

  const response = await admin.rest.get("/admin/api/2024-01/products.json");

  const products = response.body.products.map((product) => ({
    id: product.id,
    title: product.title,
  }));

  return json(products);
};
