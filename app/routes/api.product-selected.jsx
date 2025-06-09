import { json } from "@remix-run/node";
import prisma from "../db.server";

export async function loader() {
  const products = await prisma.selectedProduct.findMany();
  return json({ products });
}
