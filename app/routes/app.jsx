import { useState } from "react";
import { Page, Layout, Tabs, Card, Button, Text } from "@shopify/polaris";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { authenticate } from "../shopify.server";

// Shopify admin güvenliği için
export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return json({});
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  await admin.rest.request({
    path: "/admin/api/2024-04/script_tags.json",
    method: "POST",
    data: {
      script_tag: {
        event: "onload",
        src: "https://example.com/your-app-script.js",
        display_scope: "all",
      },
    },
  });

  return json({ success: true });
};

export default function AppTabsPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const fetcher = useFetcher();
  const isInstalling = fetcher.state === "submitting";

  const tabs = [
    {
      id: "dashboard",
      content: "Dashboard",
      panelID: "dashboard-content",
    },
    {
      id: "setup",
      content: "Setup",
      panelID: "setup-content",
    },
  ];

  const handleTabChange = (selectedIndex) => setSelectedTab(selectedIndex);

  return (
    <Page title="App Panel">
      <Layout>
        <Layout.Section>
          <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
            <div style={{ paddingTop: 20 }}>
              {selectedTab === 0 && (
                <Card sectioned>
                  <Text variant="headingLg" as="h2">
                    Welcome to the Dashboard
                  </Text>
                  <Text variant="bodyMd">
                    This is the default tab with general information.
                  </Text>
                </Card>
              )}

              {selectedTab === 1 && (
                <Card sectioned>
                  <Text variant="headingLg" as="h2">Setup Instructions</Text>
                  <Text variant="bodyMd" tone="subdued" as="p">
                    Click below to inject the storefront script.
                  </Text>
                  <fetcher.Form method="post">
                    <Button submit loading={isInstalling}>
                      Install Script
                    </Button>
                  </fetcher.Form>
                </Card>
              )}
            </div>
          </Tabs>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
