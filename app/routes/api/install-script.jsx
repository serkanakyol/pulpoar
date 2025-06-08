// app/routes/api/install-script.jsx
import { authenticate } from "~/shopify.server";

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);

  const scriptTag = {
    script_tag: {
      event: "onload",
      src: "https://cdn.jsdelivr.net/gh/serkanakyol/pulpoar-try-on-js/pulpoar-try-on.js",
    },
  };

  try {
    const response = await admin.rest.resources.ScriptTag.create({
      body: scriptTag,
    });

    return new Response(JSON.stringify({ success: true, id: response.id }), {
      status: 200,
    });
  } catch (err) {
    console.error("ScriptTag API Error", err);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
