import { AppBridgeProvider } from '@shopify/app-bridge-react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export default function App() {

    const config = {
      apiKey: process.env.SHOPIFY_API_KEY,
      host: new URLSearchParams(window.location.search).get('host'),
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
        <AppBridgeProvider config={config}>
          <Outlet />
        </AppBridgeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
