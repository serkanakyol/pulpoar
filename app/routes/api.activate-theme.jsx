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
console.log(mainTheme);

  const fileKey = "sections/product-template.liquid";
  const snippetKey = "snippets/pulpoar-tryon.liquid";
  const snippetCall = `{% render 'pulpoar-tryon' %}`;

  const response = await admin.rest.Asset.all({
    session,
    theme_id: mainTheme.id,
    params: { asset: { key: fileKey } }
  });

  const asset = response?.[0];
  if (!asset || !asset.value) throw new Error("Dosya alınamadı");

  if (!asset.value.includes(snippetCall)) {
    const updatedAsset = new admin.rest.Asset({ session });
    updatedAsset.theme_id = mainTheme.id;
    updatedAsset.key = fileKey;
    updatedAsset.value = `${asset.value}\n${snippetCall}`;
    await updatedAsset.save();
  }

  return json({ ok: true });
}
