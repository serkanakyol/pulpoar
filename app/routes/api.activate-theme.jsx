import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";

export async function action({ request }) {
  const { session, admin } = await authenticate.admin(request);
  const result = await admin.rest.resources.Theme.all({ session });
  const themes = result.data;
  console.log(themes);
  const mainTheme = themes.find((theme) => theme.role === "main");
  if (!mainTheme) throw new Error("No main theme found.");
  const fileKey = "sections/product-template.liquid";
  const asset = await admin.rest.resources.Asset.find({
    session,
    theme_id: mainTheme.id,
    asset: { key: fileKey },
  });

  const snippetCall = `{% render 'pulpoar-tryon-snippet' %}`;

  if (asset?.value && !asset.value.includes(snippetCall)) {
    const updatedAsset = new admin.rest.resources.Asset({ session });
    updatedAsset.theme_id = mainTheme.id;
    updatedAsset.key = fileKey;
    updatedAsset.value = `${asset.value}\n${snippetCall}`;
    await updatedAsset.save();
  }

  return json({ ok: true });
}
