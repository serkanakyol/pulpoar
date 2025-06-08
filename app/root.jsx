import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";

export function links() {
  return [
    { rel: "stylesheet", href: polarisStyles },
    {
      rel: "preconnect",
      href: "https://cdn.shopify.com/",
    },
    {
      rel: "stylesheet",
      href: "https://cdn.shopify.com/static/fonts/inter/v4/styles.css",
    },
  ];
}


export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProvider i18n={enTranslations}>
          <Outlet />
        </AppProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
