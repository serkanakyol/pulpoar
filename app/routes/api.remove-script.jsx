import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);

  const query = `
    query {
      scriptTags(first: 50) {
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

    const scriptUrl = process.env.PULPOAR_SCRIPT_BASE_URL || "";
console.log(scriptUrl);
console.log(jsonResponse.data.scriptTags.edges);
    const matchingTags = jsonResponse.data.scriptTags.edges.filter((edge) =>
      edge.node.src.startsWith(scriptUrl)
    );
console.log(matchingTags);
    if (matchingTags.length === 0) {
      return json({ success: false, message: "Script bulunamadı." }, { status: 404 });
    }

    const deletionResults = [];

    for (const tag of matchingTags) {
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
console.log(tag.node.id);
      const deleteResponse = await admin.graphql(deleteMutation, {
        variables: { id: tag.node.id },
      });

        const deleteJson = await deleteResponse.json();

        if (deleteJson.data.scriptTagDelete.userErrors.length > 0) {
          console.error("Silme hatası:", deleteJson.data.scriptTagDelete.userErrors);
        } else {
          console.log(`Silindi: ${tag.node.id}`);
        }
    }

    const allSuccessful = deletionResults.every((r) => r.success);

    return json({
      success: allSuccessful,
      deleted: deletionResults,
    });

  } catch (error) {
     console.error("Script silme hatası:", error);
     return json({ success: false, error: error.message }, { status: 500 });
  }
}
