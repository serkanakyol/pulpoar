import { authenticate } from "../shopify.server";

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);

  const scriptTag = {
    script_tag: {
      session: admin.session,
      event: "onload",
      src: "https://cdn.jsdelivr.net/gh/serkanakyol/pulpoar-try-on-js/pulpoar-try-on.js",
    },
  };

  try {
    console.log("ScriptTag resource:", admin.rest);
    console.log("ScriptTag resource:", admin.rest.resource.ScriptTag);
    const response = await admin.rest.resource.ScriptTag.create({
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
