import { getUrlFromCloudinary } from "@/app/helper/addProductHelpers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import React, { useState } from "react";

function DialogBoxWithInput({ name, onClickYesFn, heading, content }) {
  const [input, setInput] = useState();
  const [imageFile, setImageFile] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const onYesHandle = async () => {
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

    await onClickYesFn(newCategory, setLoading);
    setOpen(false);
  };
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{name}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{heading}</DialogTitle>
            <DialogDescription>{content}</DialogDescription>
            <Input
              type="text"
              placeholder="new category"
              onChange={(e) => setInput(e.target.value)}
              name="available_stock"
            />

            <Input
              id="picture"
              name="image"
              type="file"
              onChange={handleImageSelect}
            />
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Back</Button>
            </DialogClose>
            <Button
              className={"cursor-pointer"}
              type="submit"
              disabled={loading}
              onClick={onYesHandle}
            >
              {loading ? "wait..." : "Create"}
            </Button>
          </DialogFooter>
          {error && (
            <div className="err text-center text-red-400 text-sm">{error}</div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DialogBoxWithInput;
