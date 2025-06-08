import { flatRoutes } from "@remix-run/fs-routes";

export default flatRoutes((route) => {
    route("/", "routes/index.jsx");
    route("/api/install-script", "routes/api/install-script.jsx");
    route("/api/remove-script", "routes/api/remove-script.jsx");
});
