import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import { AppBridgeProvider } from "@shopify/app-bridge-react";


export default function App() {

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
          <AppBridgeProvider>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
          </AppBridgeProvider>
      </body>
    </html>
  );
}
