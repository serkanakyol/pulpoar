import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { buildPulpoarScriptUrl } from "../utils/pulpoar";

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);
  const buildPulpoarScriptUrl = buildPulpoarScriptUrl();

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
      src: { buildPulpoarScriptUrl },
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
