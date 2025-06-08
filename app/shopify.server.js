import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import prisma from "./db.server";
import { shopifyApi } from "@shopify/shopify-api";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.January25,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  future: {
    unstable_newEmbeddedAuthStrategy: true,
    removeRest: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),

  hooks: {
    afterAuth: async ({ session }) => {
      console.log("🛠 afterAuth: ScriptTag ekleniyor...");
      await createScriptTag(session); // bu fonksiyonu yukarıda anlattık
    },
  },
});

export default shopify;
export const apiVersion = ApiVersion.January25;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;

async function createScriptTag(session) {
  const client = new shopifyApi.clients.Rest({ session });

  try {
    const existing = await client.get({ path: "script_tags" });

    const alreadyExists = existing.body?.script_tags?.some(
      (tag) =>
        tag.src ===
        "https://cdn.jsdelivr.net/gh/serkanakyol/pulpoar-try-on-js/pulpoar-try-on.js"
    );

    if (!alreadyExists) {
      await client.post({
        path: "script_tags",
        data: {
          script_tag: {
            event: "onload",
            src: "https://cdn.jsdelivr.net/gh/serkanakyol/pulpoar-try-on-js/pulpoar-try-on.js",
          },
        },
        type: "application/json",
      });

      console.log("✅ ScriptTag başarıyla eklendi.");
    } else {
      console.log("ℹ️ ScriptTag zaten var.");
    }
  } catch (error) {
    console.error("❌ ScriptTag eklenemedi:", error);
  }
}
