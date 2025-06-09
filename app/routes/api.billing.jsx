import { redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { getSessionToken } from "@shopify/shopify-app-remix/server";

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  const mutation = `
    mutation {
      appSubscriptionCreate(
        name: "PulpoAR Try-On Premium",
        returnUrl: "/api/billing/confirm",
        test: true,
        lineItems: [{
          plan: {
            appRecurringPricingDetails: {
              price: { amount: 9.99, currencyCode: USD }
            }
          }
        }]
      ) {
        confirmationUrl
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await admin.graphql(mutation);
  const body = await response.json();

  const confirmationUrl =
    body?.data?.appSubscriptionCreate?.confirmationUrl;

  if (!confirmationUrl) {
    throw new Error("Abonelik oluşturulamadı.");
  }

  return redirect(confirmationUrl);
}

export default function BillingRedirect() {
  return <p>Abonelik sayfasına yönlendiriliyorsunuz...</p>;
}
