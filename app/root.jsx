import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import { useAppBridge as AppBridgeProvider } from "@shopify/app-bridge-react";
import { json } from "@remix-run/node";

export async function loader({ request }) {
  const url = new URL(request.url);
  const host = url.searchParams.get("host");

  return json({
    host,
    apiKey: process.env.SHOPIFY_API_KEY,
  });
}

export default function App() {

  const { host, apiKey } = useLoaderData();

  const appBridgeConfig = {
    apiKey,
    host,
    forceRedirect: true,
  };

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <AppBridgeProvider config={appBridgeConfig}>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </AppBridgeProvider> om
      </body>
    </html>
  );
}
