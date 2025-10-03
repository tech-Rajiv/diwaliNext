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
import { DialogClose } from "@radix-ui/react-dialog";
import React, { useState } from "react";

function DialogBox({ name, onClickYesFn, heading, content, loading }) {
  const [open, setOpen] = useState(false);

  const handleYes = async () => {
    await onClickYesFn();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{name}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{heading}</DialogTitle>
          <DialogDescription>{content}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Back</Button>
          </DialogClose>
          <Button
            className={"cursor-pointer"}
            type="submit"
            disabled={loading}
            onClick={handleYes}
          >
            {loading ? "wait..." : "Yes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogBox;
