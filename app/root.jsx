import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import { AppBridgeProvider } from "@shopify/app-bridge-react";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const host = url.searchParams.get("host");
  return { host };
};

export default function App() {
  const { host } = useLoaderData();

  const config = {
    apiKey: process.env.SHOPIFY_API_KEY,
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
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__SHOPIFY_HOST__ = "${host}"`,
          }}
        />
      </head>
      <body>
          <AppBridgeProvider config={config}>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
          </AppBridgeProvider>
      </body>
    </html>
  );
}
