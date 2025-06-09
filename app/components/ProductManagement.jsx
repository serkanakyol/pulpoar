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
import { useState, useCallback, useEffect } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { ResourcePicker } from "@shopify/app-bridge/actions";

export default function ProductManagement() {
  const app = useAppBridge();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [picker, setPicker] = useState(null);

  // 1️⃣ App Bridge ResourcePicker örneğini oluştur ve event’leri dinle
  useEffect(() => {
    const pickerInstance = ResourcePicker.create(app, {
      resourceType: ResourcePicker.ResourceType.Product,
      showVariants: false,
      open: false,
      selectMultiple: true,
    });

    pickerInstance.subscribe(ResourcePicker.Action.SELECT, (payload) => {
      const selection = payload.selection;
      const newProducts = selection.map((p) => ({
        id: p.id,
        title: p.title,
        image: p.images?.[0]?.originalSrc || "",
      }));
      setProducts((prev) => [...prev, ...newProducts]);
      pickerInstance.dispatch(ResourcePicker.Action.CLOSE);
    });

    pickerInstance.subscribe(ResourcePicker.Action.CANCEL, () => {
      pickerInstance.dispatch(ResourcePicker.Action.CLOSE);
    });

    setPicker(pickerInstance);

    return () => pickerInstance.unsubscribe(); // cleanup
  }, [app]);

  // 2️⃣ Butonla picker’ı aç
  const handleOpenPicker = useCallback(() => {
    if (picker) picker.dispatch(ResourcePicker.Action.OPEN);
  }, [picker]);

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
          <Button primary onClick={handleOpenPicker}>
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
    </>
  );
}
