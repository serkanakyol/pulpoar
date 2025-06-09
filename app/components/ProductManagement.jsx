// app/components/ProductManagement.jsx
import {
  Card,
  ResourceList,
  ResourceItem,
  Thumbnail,
  Text,
  Button,
  TextField,
  HorizontalStack,
  VerticalStack,
} from "@shopify/polaris";
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
        <HorizontalStack align="center" distribution="equalSpacing">
          <Text as="h2" variant="headingLg">
            Selected products from catalog
          </Text>
          <Button primary onClick={() => setPickerOpen(true)}>
            Choose products
          </Button>
        </HorizontalStack>
      </Card>

      <Card>
        <VerticalStack spacing="tight">
          <TextField
            placeholder="Search products"
            value={searchTerm}
            onChange={setSearchTerm}
            autoComplete="off"
          />

          <ResourceList
            resourceName={{ singular: "product", plural: "products" }}
            items={products.filter((p) =>
              p.title.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            renderItem={(item) => {
              const { id, title, image } = item;
              return (
                <ResourceItem id={id} accessibilityLabel={`View details for ${title}`}>
                  <HorizontalStack align="center">
                    <HorizontalStack.Item fill>
                      <Text variant="bodyMd" fontWeight="bold">
                        {title}
                      </Text>
                    </HorizontalStack.Item>
                    <Thumbnail source={image} alt={title} />
                    <Button
                      plain
                      destructive
                      onClick={() => handleRemoveProduct(id)}
                    >
                      Remove
                    </Button>
                  </HorizontalStack>
                </ResourceItem>
              );
            }}
          />
        </VerticalStack>
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
