import { flatRoutes } from "@remix-run/fs-routes";

export default flatRoutes((route) => {
  route("/", "routes/index.jsx");
  route("/app/api/install-script", "routes/app/api/install-script.jsx");
});
