import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { useEffect, useState } from "react";
import createApp from "@shopify/app-bridge";

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
  const [appBridge, setAppBridge] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const app = createApp({
        apiKey,
        host,
        forceRedirect: true,
      });
      setAppBridge(app);
    }
  }, [host, apiKey]);

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {appBridge ? (
          <Outlet context={{ appBridge }} />
        ) : (
          <div>Yükleniyor...</div>
        )}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
