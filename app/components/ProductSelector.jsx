import { useEffect, useState } from "react";
import {
  Card,
  ResourceList,
  ResourceItem,
  Spinner,
  Button,
  Text,
} from "@shopify/polaris";

export default function ProductSelector() {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/product")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    const res = await fetch("/api/selected-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productIds: selectedItems }),
    });

    if (res.ok) {
      alert("Seçilen ürünler başarıyla kaydedildi.");
    } else {
      alert("Kayıt sırasında hata oluştu.");
    }
  };

  if (loading) {
    return <Spinner accessibilityLabel="Ürünler yükleniyor" size="large" />;
  }

  return (
    <Card title="Try-On Aktif Ürünleri Seç">
      <ResourceList
        resourceName={{ singular: "ürün", plural: "ürünler" }}
        items={products}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
        renderItem={(item) => (
          <ResourceItem id={item.id}>
            <Text variant="bodyMd">{item.title}</Text>
          </ResourceItem>
        )}
      />
      <Button onClick={handleSave} primary fullWidth>
        Seçilen Ürünleri Kaydet
      </Button>
    </Card>
  );
}
