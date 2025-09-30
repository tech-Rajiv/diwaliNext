import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    {
      id: 1,
      title: "Product 1",
      description: "This is good prod 1",
      price: 50,
    },
    {
      id: 2,
      title: "Product 2",
      description: "This is good prod 2",
      price: 60,
    },
    {
      id: 3,
      title: "Product 3",
      description: "This is good prod 3",
      price: 70,
    },
  ];

  return NextResponse.json(products);
}
