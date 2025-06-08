import { Card, BlockStack, Box, Text, Button } from "@shopify/polaris";

export default function SetupTab() {
  return (
    <Card sectioned>
      <BlockStack gap="400">
        <Box padding="400" background="bg-surface" borderRadius="200">
          <Text as="h2" variant="headingMd">
            Script Kurulumu
          </Text>
          <Text>Script'i Storefront'a eklemek için aşağıdaki butonu tıklayın.</Text>
          <Button onClick={() => alert("Script yüklendi!")}>Install Script</Button>
        </Box>
      </BlockStack>
    </Card>
  );
}
