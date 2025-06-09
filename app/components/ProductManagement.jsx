// components/ProductManagement.jsx
import {
  Card,
  ResourceList,
  ResourceItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Stack,
  TextField,
} from "@shopify/polaris";
import { SearchMinor, DeleteMinor, SettingsMinor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import { ResourcePicker } from "@shopify/app-bridge-react";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleProductSelection = useCallback(({ selection }) => {
    const newProducts = selection.map((p) => ({
      id: p.id,
      title: p.title,
      image: p.images?.[0]?.originalSrc || "",
    }));
    setProducts((prev) => [...prev, ...newProducts]);
    setPickerOpen(false);
  }, []);

  const handleRemoveProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <Card sectioned>
        <Stack alignment="center" distribution="equalSpacing">
          <Text variant="headingLg" as="h2">
            Selected products from catalog
          </Text>
          <Button primary onClick={() => setPickerOpen(true)}>
            Choose products
          </Button>
        </Stack>
      </Card>

      <Card>
        <TextField
          placeholder="Search items"
          value={searchTerm}
          prefix={<Icon source={SearchMinor} />}
          onChange={setSearchTerm}
          autoComplete="off"
        />
        <ResourceList
          resourceName={{ singular: "product", plural: "products" }}
          items={products.filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))}
          renderItem={(item) => {
            const { id, title, image } = item;
            return (
              <ResourceItem id={id}>
                <Stack alignment="center">
                  <Stack.Item fill>
                    <Text variant="bodyMd" fontWeight="bold">
                      {title}
                    </Text>
                  </Stack.Item>
                  <Thumbnail source={image} alt={title} />
                  <Icon source={DeleteMinor} color="critical" onClick={() => handleRemoveProduct(id)} />
                  <Icon source={SettingsMinor} />
                </Stack>
              </ResourceItem>
            );
          }}
        />
      </Card>

      <ResourcePicker
        resourceType="Product"
        open={pickerOpen}
        onCancel={() => setPickerOpen(false)}
        onSelection={handleProductSelection}
        showVariants={false}
      />
    </>
  );
}
