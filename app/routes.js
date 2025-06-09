import { flatRoutes } from "@remix-run/fs-routes";

export default flatRoutes((route) => {
    route("/", "routes/index.jsx");
});
