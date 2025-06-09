import { useCallback } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { ResourcePicker } from "@shopify/app-bridge/actions";
import { Card, Button } from "@shopify/polaris";

export default function ProductPicker({ onSelect }) {
  const app = useAppBridge();

  const handleOpen = useCallback(() => {
    const picker = ResourcePicker.create(app, {
      resourceType: "Product",
      showVariants: false,
      selectMultiple: true,
    });

    picker.subscribe(ResourcePicker.Action.SELECT, ({ selection }) => {
      onSelect?.(selection); // seçilen ürünleri dışarı gönder
      picker.unsubscribe();
    });

    picker.subscribe(ResourcePicker.Action.CANCEL, () => {
      picker.unsubscribe();
    });

    picker.dispatch(ResourcePicker.Action.OPEN);
  }, [app, onSelect]);

  return (
    <Card sectioned>
      <Button onClick={handleOpen} primary>
        Ürün Seç
      </Button>
    </Card>
  );
}
