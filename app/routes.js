import { defineRoutes } from "@remix-run/fs-routes";

export default defineRoutes((route) => {
  route("/", "routes/index.jsx");
  route("/app/api/install-script", "routes/app/api/install-script.jsx");
});
