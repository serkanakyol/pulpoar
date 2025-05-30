import { defineConfig } from '@shopify/shopify-app-remix';

export default defineConfig({
  app: {
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: process.env.SCOPES || 'read_products,write_script_tags',
    hostScheme: process.env.HOST_SCHEME || 'https',
    hostName: process.env.HOST?.replace(/https?:\/\//, ''),
  },
  webhooks: {
  },
  auth: {
    pathPrefix: '/api/auth',
  },
});
