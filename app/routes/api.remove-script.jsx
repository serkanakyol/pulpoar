import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { buildPulpoarScriptUrl } from "../utils/pulpoar";

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);
  const scriptUrl = buildPulpoarScriptUrl();

  const query = `
    query {
      scriptTags(first: 10) {
        edges {
          node {
            id
            src
          }
        }
      }
    }
  `;

  try {
    const gqlResponse = await admin.graphql(query);
    const jsonResponse = await gqlResponse.json();
console.log(scriptUrl);
console.log(jsonResponse.data.scriptTags.edges);
    const existingTag = jsonResponse.data.scriptTags.edges.find((edge) =>
      edge.node.src === scriptUrl
    );
console.log(existingTag);
    if (!existingTag) {
      return json({ success: false, message: "Script bulunamadı." }, { status: 404 });
    }

    const deleteMutation = `
      mutation scriptTagDelete($id: ID!) {
        scriptTagDelete(id: $id) {
          deletedScriptTagId
          userErrors {
            field
            message
          }
        }
      }
    `;

    const deleteResponse = await admin.graphql(deleteMutation, {
      variables: { id: existingTag.node.id },
    });

    const deleteJson = await deleteResponse.json();

    if (deleteJson.data.scriptTagDelete.userErrors.length > 0) {
      return json(
        { success: false, errors: deleteJson.data.scriptTagDelete.userErrors },
        { status: 400 }
      );
    }

    return json({ success: true });
  } catch (error) {
    console.error("Script silme hatası:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
