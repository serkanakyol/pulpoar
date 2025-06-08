import { ScriptTag } from "@shopify/shopify-api/rest/admin/2025-04";

/**
 * Shopify mağazasına CDN üzerinden bir script yükler.
 *
 * @param {Session} session - Shopify oturum nesnesi (afterAuth'tan alınır)
 */
export async function createScriptTag(session) {
  const existingScripts = await ScriptTag.all({ session });

  const targetSrc =
    "https://cdn.jsdelivr.net/gh/serkanakyol/pulpoar-try-on-js/pulpoar-try-on.js";

  const alreadyExists = existingScripts.some((tag) => tag.src === targetSrc);

  if (!alreadyExists) {
    await ScriptTag.create({
      session,
      event: "onload",
      src: targetSrc,
      display_scope: "all",
    });

    console.log("✅ Script başarıyla eklendi:", targetSrc);
  } else {
    console.log("⚠️ Script zaten mevcut:", targetSrc);
  }
}
