import { useState, useCallback } from "react";
import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
  List,
  Link,
  Tabs,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  const tabs = [
    {
      id: "general-info",
      content: "Genel Bilgiler",
      panelID: "general-info-content",
    },
    {
      id: "guide",
      content: "Kullanım Kılavuzu",
      panelID: "guide-content",
    },
    {
      id: "support",
      content: "Destek",
      panelID: "support-content",
    },
  ];

  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = useCallback((selectedTabIndex) => setSelectedTab(selectedTabIndex), []);

  return (
    <Page>
      <TitleBar title="Uygulama Kontrol Paneli" />
      <BlockStack gap="500">
        <Layout>
          {/* Sol taraf: Hızlı Erişim */}
          <Layout.Section variant="oneThird">
            <BlockStack gap="500">
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Hızlı Erişim
                  </Text>
                  <List>
                    <List.Item>
                      <Link url="/app/scripts" removeUnderline>
                        Script Yönetimi
                      </Link>
                    </List.Item>
                    <List.Item>
                      <Link url="/app/settings" removeUnderline>
                        Ayarlar
                      </Link>
                    </List.Item>
                  </List>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>

          {/* Sağ taraf: Tablı İçerik */}
          <Layout.Section>
            <Card>
              <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
                <Card.Section>
                  {selectedTab === 0 && (
                    <BlockStack gap="200">
                      <Text variant="headingMd">Genel Bilgiler</Text>
                      <Text>Bu uygulama mağazanızda özelleştirmeler yapmanızı sağlar.</Text>
                    </BlockStack>
                  )}
                  {selectedTab === 1 && (
                    <BlockStack gap="200">
                      <Text variant="headingMd">Kullanım Kılavuzu</Text>
                      <Text>
                        Menüden ilgili bölümlere giderek işlemlerinizi gerçekleştirebilirsiniz. Yardım
                        için "Destek" sekmesini ziyaret edin.
                      </Text>
                    </BlockStack>
                  )}
                  {selectedTab === 2 && (
                    <BlockStack gap="200">
                      <Text variant="headingMd">Destek</Text>
                      <Text>
                        Herhangi bir sorun yaşarsanız{" "}
                        <Link url="mailto:destek@example.com" removeUnderline>
                          destek@example.com
                        </Link>{" "}
                        adresine e-posta atabilirsiniz.
                      </Text>
                    </BlockStack>
                  )}
                </Card.Section>
              </Tabs>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
