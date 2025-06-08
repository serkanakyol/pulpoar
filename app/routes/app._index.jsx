import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, Outlet } from "@remix-run/react";
import { useFetcher } from "@remix-run/react";
import {
  Page,
  Layout,
  Tabs,
  Text,
  TextContainer,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const responseJson = await response.json();
};

export default function Index() {
  const fetcher = useFetcher();
  const shopify = useAppBridge();

  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";

  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: "overview", content: "Overview", href: "/admin/overview" },
    { id: "setup", content: "Setup", href: "/admin/setup" },
    { id: "support", content: "Support", href: "/admin/support" },
  ];

  const selectedTab = tabs.findIndex(tab =>
    location.pathname.startsWith(tab.href)
  );
  const handleTabChange = (selectedIndex) => {
    navigate(tabs[selectedIndex].href);
  };

  return (
    <Page title="PulPoar DashBoard" fullWidth>
      <TitleBar title="PulPoar DashBoard" />
      <Layout>
        <Layout.Section>
        <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange} />
        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
