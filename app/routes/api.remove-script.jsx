import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { buildPulpoarScriptUrl } from "../utils/pulpoar";

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);
  const scriptUrl = buildPulpoarScriptUrl();

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
console.log(scriptUrl);
console.log(jsonResponse.data.scriptTags.edges);
    const matchingTags = jsonResponse.data.scriptTags.edges.filter(
      (edge) => edge.node.src === scriptUrl
    );
console.log("Matching Tags:", matchingTags);

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

      const deleteResponse = await admin.graphql(deleteMutation, {
        variables: { id: tag.node.id },
      });

      const deleteJson = await deleteResponse.json();

      if (deleteJson.data.scriptTagDelete.userErrors.length > 0) {
        deletionResults.push({
          id: tag.node.id,
          success: false,
          errors: deleteJson.data.scriptTagDelete.userErrors,
        });
      } else {
        deletionResults.push({
          id: tag.node.id,
          success: true,
        });
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
