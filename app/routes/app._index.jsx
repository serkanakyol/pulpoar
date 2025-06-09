import { json } from "@remix-run/node";
import { useEffect, useState, useCallback } from "react";
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
  Divider,
  ResourceList,
  ResourceItem
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const query = `
    query {
      scriptTags(first: 50) {
        edges {
          node {
            id
            src
          }
        }
      }
    }
  `;

    const gqlResponse = await admin.graphql(query);
    const jsonResponse = await gqlResponse.json();

    const scriptUrl = process.env.PULPOAR_SCRIPT_BASE_URL || "";
console.log(scriptUrl);
console.log(jsonResponse.data.scriptTags.edges);
    const matchingTags = jsonResponse.data.scriptTags.edges.filter((edge) =>
      edge.node.src.includes('pulpoar-try-on.js')
    );
console.log('matchingTags: ', matchingTags);
    const installed = false;

    if(matchingTags)
    {
      installed = true;
    }

    return json({ scriptTagInstalled: installed });
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const responseJson = await response.json();
};

export default function Index() {

  const { scriptTagInstalled } = useLoaderData();
  const [selected, setSelected] = useState(0);
  const [installed, setInstalled] = useState(scriptTagInstalled);
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const app = useAppBridge();
  const fetcher = useFetcher();
  const shopify = useAppBridge();

  const handleInstall = async () => {
    setLoading(true);
    const res = await fetch("/api/install-script", { method: "POST" });
    const data = await res.json();
    setInstalled(data.success);
    setLoading(false);
  };

  async function handleRemove() {
    setLoading(true);
    const res = await fetch("/api/remove-script", { method: "POST" });
    const data = await res.json();
    if (data.success) setInstalled(false);
    setLoading(false);
  }

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
              Component Installation
            </Text>
          {!installed && (
            <Button
              onClick={handleInstall}
              loading={loading}
            >
              Install Script
            </Button>
          )}
          {installed && (
            <Button
              onClick={handleRemove}
              loading={loading}
            >
              Remove Script
            </Button>
          )}
          </Box>
        </div>
      </Card>
    ),
    3: (
      <Card sectioned>
        <TextContainer>
          <p>This is the support tab.</p>
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
