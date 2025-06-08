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
    const response = await admin.post({
      path: "script_tags",
      data: scriptTag,
      type: "application/json",
    });

    return new Response(JSON.stringify({ success: true, id: response?.body?.script_tag?.id }), {
      status: 200,
    });
  } catch (err) {
    console.error("ScriptTag API Error", err);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
/*
  try {
    console.log("ScriptTag resource:", admin.rest);
    console.log("ScriptTag resource:", admin.rest.resources.ScriptTag);
    const response = await admin.rest.resources.ScriptTag({
      body: scriptTag,
    });
console.log(response)
    return new Response(JSON.stringify({ success: true, id: response.id }), {
      status: 200,
    });
  } catch (err) {
    console.error("ScriptTag API Error", err);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
*/
}
