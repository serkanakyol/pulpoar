import { authenticate } from "~/shopify.server";

export async function loader({ request }) {
  return authenticate.admin(request);
}
