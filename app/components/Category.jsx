import React, { useEffect, useState } from "react";
import SingleCategory from "./SingleCategory";
import SkeletonForCategories from "./uiByMe/SkeletonForCategories";

function Category({ selectedCategoryId, setSelectedCategoryId }) {
  const [allCategories, setAllCategories] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAllCategories = async () => {
    try {
      const res = await fetch("/api/category/getcategories");
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setAllCategories(data?.data);
    } catch (error) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchAllCategories();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      <h2 className="font-medium">Products</h2>
      <div className="all flex gap-5 mt-5">
        {loading && <SkeletonForCategories />}
        {allCategories?.map((category, index) => (
          <div key={index}>
            <SingleCategory
              category={category}
              setSelectedCategoryId={setSelectedCategoryId}
              selectedCategoryId={selectedCategoryId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
