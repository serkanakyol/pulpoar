import { shopifyApi } from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2025-01";
import { authenticate } from "../shopify.server";

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  apiVersion: "2025-01",
  restResources,
});

export async function action({ request }) {
  const { session } = await authenticate.admin(request);
  const admin = new shopify.clients.Rest({
    session,
  });

  const scriptTag = {
    script_tag: {
      session: admin.session,
      event: "onload",
      src: "https://cdn.jsdelivr.net/gh/serkanakyol/pulpoar-try-on-js/pulpoar-try-on.js",
    },
  };


  try {
    const response = await admin.post({
      path: "script_tags",
      data: scriptTag,
      type: "application/json",
    });
console.log(response);
    return new Response(JSON.stringify({ success: true, id: response?.body?.script_tag?.id }), {
      status: 200,
    });
  } catch (err) {
    console.error("ScriptTag API Error", err);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
