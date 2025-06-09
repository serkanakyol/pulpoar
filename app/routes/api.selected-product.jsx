import { useState } from "react";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { Card, Page } from "@shopify/polaris";

export default function SelectProducts() {
  const [open, setOpen] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelection = (resources) => {
    setOpen(false);
    setSelectedProducts(resources.selection);
    console.log("Selected Products:", resources.selection);
    // Burada seçilen ürünleri DB'ye kaydetmek için API çağrısı yapabilirsin
  };

  return (
    <Page title="Ürün Seçimi">
      <Card sectioned>
        <p>Ürünleri seçmek için modal açılacaktır.</p>
      </Card>

      <ResourcePicker
        resourceType="Product"
        open={open}
        onCancel={() => setOpen(false)}
        onSelection={handleSelection}
        showVariants={false}
      />
    </Page>
  );
}
