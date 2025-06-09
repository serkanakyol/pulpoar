import { json } from "@remix-run/node";
import { authenticate, unauthenticated } from "../shopify.server";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);

  if (!session?.shop) {
       return unauthenticated.redirectToAuth({ request });
  }
 const query = `
    {
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            featuredImage {
              url
              altText
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price
                }
              }
            }
          }
        }
      }
    }
  `;

  const gqlResponse = await admin.graphql(query);
  const jsonResponse = await gqlResponse.json();

  const products = jsonResponse.data.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    image: node.featuredImage?.url || null,
    variantId: node.variants.edges[0]?.node.id || null,
    price: node.variants.edges[0]?.node.price || null,
  }));

  return json(products);
};
