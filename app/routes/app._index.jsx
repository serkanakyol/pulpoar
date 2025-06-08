// app/routes/app._index.tsx
import {
  BlockStack,
  Button,
  Card,
  Page,
  Tabs,
  Text,
} from "@shopify/polaris";
import { useState } from "react";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [installResult, setInstallResult] = useState("");

  const handleTabChange = (selectedTabIndex: number) => {
    setSelectedTab(selectedTabIndex);
    setInstallResult("");
  };

  const handleInstallScript = async () => {
    try {
      const res = await fetch("/app/api/install-script", { method: "POST" });
      const data = await res.json();
      setInstallResult(data.message);
    } catch (error) {
      setInstallResult("Script yüklenirken bir hata oluştu.");
    }
  };

  const tabs = [
    {
      id: "overview",
      content: "Overview",
      panelID: "overview-content",
    },
    {
      id: "setup",
      content: "Setup",
      panelID: "setup-content",
    },
  ];

  return (
    <Page title="Demo App Dashboard">
      <Card>
        <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
          <Card.Section>
            {selectedTab === 0 && (
              <BlockStack gap="200">
                <Text variant="headingMd">Overview</Text>
                <Text>Bu sayfa genel bilgi ekranıdır.</Text>
              </BlockStack>
            )}

            {selectedTab === 1 && (
              <BlockStack gap="200">
                <Text variant="headingMd">Setup</Text>
                <Text>Uygulamanın ilk kurulumunu yapmak için aşağıdaki butonu kullanın.</Text>
                <Button onClick={handleInstallScript}>Install Script</Button>
                {installResult && <Text tone="success">{installResult}</Text>}
              </BlockStack>
            )}
          </Card.Section>
        </Tabs>
      </Card>
    </Page>
  );
}
