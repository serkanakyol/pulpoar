if (
  process.env.HOST &&
  (!process.env.SHOPIFY_APP_URL || process.env.SHOPIFY_APP_URL === process.env.HOST)
) {
  process.env.SHOPIFY_APP_URL = process.env.HOST;
  delete process.env.HOST;
}
/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",
  serverModuleFormat: "esm",
  serverBuildPath: "build/index.js",
  serverBuildTarget: "node-cjs",
  dev: { port: process.env.HMR_SERVER_PORT || 8002 },
  future: {},
};
