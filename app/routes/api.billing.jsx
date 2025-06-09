export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  const url = new URL(request.url);
  const returnUrl = `${url.protocol}//${url.host}/api/confirm`;

  const mutation = `
    mutation {
      appSubscriptionCreate(
        name: "PulpoAR Try-On Premium",
        returnUrl: "${returnUrl}",
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

  console.log("Shopify Subscription response:", JSON.stringify(body, null, 2));

  const confirmationUrl = body?.data?.appSubscriptionCreate?.confirmationUrl;

  if (!confirmationUrl) {
    throw new Error(
      "Abonelik oluşturulamadı: " +
        (body?.data?.appSubscriptionCreate?.userErrors
          ?.map((err) => `${err.field}: ${err.message}`)
          .join(", ") || "Bilinmeyen hata")
    );
  }

  return redirect(confirmationUrl);
}
