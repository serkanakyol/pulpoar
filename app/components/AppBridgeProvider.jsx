// app/components/AppBridgeProvider.jsx
import { AppBridgeProvider as ShopifyAppBridgeProvider } from "@shopify/app-bridge-react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "@remix-run/react";

export function AppBridgeProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const config = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    const host = searchParams.get("host");

    return {
      host,
      apiKey:process.env.SHOPIFY_API_KEY || '',
      forceRedirect: true,
    };
  }, [location.search]);

  return (
    <ShopifyAppBridgeProvider config={config}>
      {children}
    </ShopifyAppBridgeProvider>
  );
}
