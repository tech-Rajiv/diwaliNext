"use client";
import BackButton from "@/app/components/uiByMe/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";

function page() {
  const [input, setInput] = useState();
  const [imageFile, setImageFile] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };
  const handleSubmit = async () => {
    if (!input || !imageFile) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    // const urlfromCloudinary = await getUrlFromCloudinary(imageFile);
    const newCategory = {
      name: input,
      image_url:
        "https://res.cloudinary.com/db3uycxd3/image/upload/v1759492514/mif8idxcz59kkq9xe4ni.jpg",
    };
    console.log(newCategory, "newCate");
    await createNewCategory(newCategory);
    setOpen(false);
  };

  const createNewCategory = async (newCategory) => {
    console.log("(newCategory: ", newCategory);

    try {
      const res = await fetch("/api/category/new-category", {
        method: "POST",
        body: JSON.stringify(newCategory),
      });
      if (!res.ok) {
        throw new Error();
      }
      console.log(res, "ressss");
      toast.success("Category added successfully");
      setAddedNewCategory((prev) => !prev);
    } catch (error) {
      toast.error("failed to new category");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <BackButton justOneStepBack={true} />
      <div className="wrapper px-5">
        <h2 className="font-medium mb-5 text-center">New category</h2>
        <div className="max-w-lg flex gap-5 flex-col mx-auto ">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="flex flex-col gap-2">
              Category name :
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="new category"
              onChange={(e) => setInput(e.target.value)}
              name="available_stock"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="maxWidth" className="">
              Image :
            </Label>
            <Input
              id="picture"
              name="image"
              type="file"
              onChange={handleImageSelect}
            />
          </div>
          <Button
            className={"cursor-pointer"}
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "wait..." : "Create"}
          </Button>
        </div>
        {error && <p className="text-sm test-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default page;
