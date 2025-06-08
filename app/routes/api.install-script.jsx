import { authenticate } from "../shopify.server";

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);

  const mutation = `
    mutation scriptTagCreate($input: ScriptTagInput!) {
      scriptTagCreate(input: $input) {
        scriptTag {
          id
          src
          displayScope
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      src: "https://cdn.jsdelivr.net/gh/serkanakyol/pulpoar-try-on-js/pulpoar-try-on.js",
      displayScope: "ALL",
    },
  };

  try {
    const response = await admin.graphql(mutation, { variables });
    const result = await response.json();

    const errors = result.data.scriptTagCreate.userErrors;
    if (errors.length) {
      console.error("GraphQL User Errors:", errors);
      return new Response(JSON.stringify({ success: false, errors }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, scriptTag: result.data.scriptTagCreate.scriptTag }), {
      status: 200,
    });
  } catch (error) {
    console.error("GraphQL ScriptTag Error:", error);
    return new Response(JSON.stringify({ success: false, error }), { status: 500 });
  }
}
