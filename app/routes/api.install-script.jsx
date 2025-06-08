import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { buildPulpoarScriptUrl } from "../pulpoar";

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(`
    {
      scriptTags(first: 10) {
        edges {
          node {
            id
            src
          }
        }
      }
    }
  `);

  const query = `
    {
      scriptTags(first: 1, src: "https://cdn.jsdelivr.net/gh/serkanakyol/pulpoar-try-on-js/pulpoar-try-on.js") {
        edges {
          node {
            id
            src
          }
        }
      }
    }
  `;

  const data = await response.json();
  const existing = data.data.scriptTags.edges.find(edge =>
    edge.node.src.startsWith(process.env.PULPOAR_SCRIPT_BASE_URL)
  );

  return {
    installed: Boolean(existing),
    shop: session.shop,
  };
}

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();
  const scriptUrl = formData.get("scriptUrl");

  const mutation = `
    mutation scriptTagCreate($input: ScriptTagInput!) {
      scriptTagCreate(input: $input) {
        scriptTag {
          id
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
      src: scriptUrl,
      displayScope: "ALL",
    },
  };

  try {
    const response = await admin.graphql(mutation, { variables });
    const result = await response.json();

    const errors = result.data.scriptTagCreate.userErrors;
    if (errors.length) {
      console.error("GraphQL User Errors:", errors);
      return new Response(JSON.stringify({ success: false, errors }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("GraphQL ScriptTag Error:", error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
}

 export default function InstallScript() {

   const { installed, shop } = useLoaderData();
   const fetcher = useFetcher();

   const scriptUrl = buildPulpoarScriptUrl();

   const handleInstall = () => {
     fetcher.submit(
       { scriptUrl },
       { method: "post", action: "/install-script" }
     );
   };

   return (
     <div className="p-4">
       <h2 className="text-lg font-bold mb-4">Pulpoar Script</h2>
       <button
         onClick={handleInstall}
         disabled={installed}
         className={`px-4 py-2 rounded text-white ${
           installed ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
         }`}
       >
         {installed ? "Installed" : "Install Script"}
       </button>
     </div>
   );
}
