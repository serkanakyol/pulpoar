/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",
  serverModuleFormat: "esm",
  serverBuildPath: "build/index.mjs",
  serverBuildTarget: "node",
  dev: { port: process.env.HMR_SERVER_PORT || 8002 },
  future: {},
};
