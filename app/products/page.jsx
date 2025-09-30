"use client";
import React, { useEffect, useState } from "react";
import SingleProductBox from "../components/SingleProductBox";

function page() {
  const [allProducts, setAllProducts] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchAllProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("error occured while fetching the products");
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchAllProducts();
  }, []);

  if (loading) {
    return "Loading...";
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      <h2>Products</h2>
      <div className="allPRods grid grid-cols-2 sm:grid-cols-6 gap-5 mt-5">
        {allProducts?.map((prod, i) => (
          <SingleProductBox key={i} prod={prod} />
        ))}
      </div>
    </div>
  );
}

export default page;
