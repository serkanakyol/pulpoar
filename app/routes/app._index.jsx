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

  const [selected, setSelected] = useState(0);

  const fetcher = useFetcher();

  const shopify = useAppBridge();

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
        <TextContainer>
          <p>This is the setup tab. You can install your script here.</p>
          {/* Buraya buton eklersin */}
        </TextContainer>
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
    <Page>
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
