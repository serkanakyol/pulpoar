import { Page, Layout, Text, Card, BlockStack, List, Link } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  return (
    <Page>
      <TitleBar title="Uygulama Kontrol Paneli" />
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingLg">
                  👋 Hoş geldiniz!
                </Text>
                <Text variant="bodyMd" as="p">
                  Bu uygulama sayesinde mağazanız için özel işlevler oluşturabilirsiniz.
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>

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
        </Layout>
      </BlockStack>
    </Page>
  );
}
