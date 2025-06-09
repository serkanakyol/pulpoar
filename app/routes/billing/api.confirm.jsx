// app/routes/billing/confirm.jsx

import { json } from "@remix-run/node";

export async function loader() {
  return json({ message: "Abonelik başarıyla aktif edildi." });
}

export default function BillingConfirm() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Teşekkürler!</h1>
      <p>Aboneliğiniz başarıyla aktif edildi.</p>
    </div>
  );
}
