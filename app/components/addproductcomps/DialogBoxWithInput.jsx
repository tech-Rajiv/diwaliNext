import Image from "next/image";
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
import { CircleCheckBig, UserPen } from "lucide-react";

function DialogBoxWithInput({ name, onClickYesFn, loading, heading, content }) {
  const [cName, setCName] = useState("Guest");
  const [cPhone, setCPhone] = useState(999999999);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    onClickYesFn(cName, cPhone);
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button className={"flex gap-2 items-center w-full"}>
            {" "}
            <CircleCheckBig />
            {name}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{heading}</DialogTitle>
            <DialogDescription>{content}</DialogDescription>
            <div className="wrapper flex flex-col sm:flex-row gap-2">
              <div className="imgDiv bg-gray-200 flex justify-center rounded-xl">
                <Image
                  src={"/qrr.jpg"}
                  width={100}
                  height={100}
                  alt="qr"
                  className="w-full sm:w-60"
                />
              </div>
              <div className="infos">
                <h2 className="font-medium gap-2 hidden sm:flex mb-5">
                  <UserPen />
                  Details
                </h2>
                <label htmlFor="cname" className="mt-5 hidden sm:flex">
                  Customer name:
                </label>
                <Input
                  id={"cname"}
                  className={"mt-2 sm:mb-5"}
                  type="text"
                  value={cName}
                  placeholder="customer name"
                  onChange={(e) => setCName(e.target.value)}
                  name="available_stock"
                />
                <label htmlFor="cphone" className="mt-5 hidden sm:flex">
                  Phone no:
                </label>
                <Input
                  id={"cphone"}
                  className={"mt-2"}
                  type="number"
                  value={cPhone}
                  placeholder="phone no"
                  onChange={(e) => setCPhone(e.target.value)}
                  name="available_stock"
                />
              </div>
            </div>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              className={"cursor-pointer"}
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "wait..." : "Place order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DialogBoxWithInput;
