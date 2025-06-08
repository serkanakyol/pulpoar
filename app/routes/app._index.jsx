import { useEffect, useState, useCallback } from "react";
import { useFetcher } from "@remix-run/react";
import {
  Page,
  Layout,
  Tabs,
  Text,
  TextContainer,
  Card,
  Button,
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

  const [selected, setSelected] = useState(0);
  const [installed, setInstalled] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetcher = useFetcher();
  const shopify = useAppBridge();
  const handleInstall = async () => {
    setLoading(true);
    const res = await fetch("/api/install-script", { method: "POST" });

    if (res.ok) {
      setInstalled(true);
    }
    setLoading(false);
  };
  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";

  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelected(selectedTabIndex);
  }, []);

  const tabs = [
    {
      id: "overview",
      content: "Overview",
      accessibilityLabel: "Overview tab",
      panelID: "overview-content",
    },
    {
      id: "setup",
      content: "Setup",
      panelID: "setup-content",
    },
    {
      id: "support",
      content: "Support",
      panelID: "support-content",
    },
  ];

  const tabContent = {
    0: (
      <Card sectioned>
        <TextContainer>
          <p>This is the overview tab content.</p>
        </TextContainer>
      </Card>
    ),
    1: (
      <Card sectioned>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Box padding="400" background="bg-surface" borderRadius="200">
            <Text as="h2" variant="headingMd">
              Script Kurulumu
            </Text>
            <Text>Script'i Storefront'a eklemek için aşağıdaki butonu tıklayın.</Text>
            <Button onClick={handleInstall} loading={loading} disabled={installed}>
              {installed ? "Yüklendi" : "Install Script"}
            </Button>
          </Box>
        </div>
      </Card>
    ),
    2: (
      <Card sectioned>
        <TextContainer>
          <p>This is the support tab. Contact us at support@example.com.</p>
        </TextContainer>
      </Card>
    ),
  };

  return (
    <Page title="PulPoar DashBoard" fullWidth>
      <TitleBar title="PulPoar DashBoard" />
      <Layout>
        <Layout.Section>
          <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
            {tabContent[selected]}
          </Tabs>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
