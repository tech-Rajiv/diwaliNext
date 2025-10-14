import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";

function TableRowCustom({ prod }) {
  return (
    <TableRow key={prod?.id}>
      <TableCell className="">
        <div className="div w-12 h-12 rounded-md bg-gray-300 overflow-hidden">
          <img
            src={prod?.image_url}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </TableCell>
      <TableCell>{prod?.title}</TableCell>
      <TableCell className={"hidden sm:inline"}>
        {prod?.available_stock}
      </TableCell>
      <TableCell className={"hidden sm:inline"}>
        {prod?.purchased_single_packets ?? "no pcs"}
      </TableCell>
      <TableCell>
        <div className="div">
          {
            <Sheet>
              <SheetTrigger>
                <div className="outline p-2 rounded-md cursor-pointer">
                  Edit
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit product</SheetTitle>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                  <div className="grid gap-3">
                    <Label htmlFor="sheet-demo-name">Product Name :</Label>
                    <Input id="sheet-demo-name" defaultValue={prod?.title} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="sheet-demo-username">Description :</Label>
                    <Input
                      id="sheet-demo-username"
                      defaultValue={prod?.description}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="sheet-demo-username">Image :</Label>
                    <Input type={"file"} id="sheet-demo-username" />
                    <div className="div w-25 h-25 rounded-md bg-gray-300 overflow-hidden">
                      <img
                        src={prod?.image_url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <SheetFooter>
                  <Button type="submit">Save changes</Button>
                  <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          }
        </div>
      </TableCell>
    </TableRow>
  );
}

export default TableRowCustom;
