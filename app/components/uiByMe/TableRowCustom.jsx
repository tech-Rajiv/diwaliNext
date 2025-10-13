import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { Drawer } from "vaul";

function TableRowCustom({ prod }) {
  console.log(prod, "prod");
  return (
    <TableRow key={prod?.id}>
      <TableCell className="font-medium">{prod?.id}</TableCell>
      <TableCell>{prod?.title}</TableCell>
      <TableCell>
        <div className="div">
          {
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Edit</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="leading-none font-medium">
                      Prdouct details
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Set the dimensions for the layer.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        defaultValue={prod?.title}
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxWidth">Max. width</Label>
                      <Input
                        id="maxWidth"
                        defaultValue="300px"
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        defaultValue="25px"
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxHeight">Max. height</Label>
                      <Input
                        id="maxHeight"
                        defaultValue="none"
                        className="col-span-2 h-8"
                      />
                    </div>
                  </div>
                  <div className="btns">
                    <div className="delete flex flex-col w-full gap-3 sm:flex-row">
                      <Button variant={"destructive"} className="flex-1">
                        Delete product
                      </Button>
                      <Button className="flex-1">Save changes</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          }
        </div>
      </TableCell>
    </TableRow>
  );
}

export default TableRowCustom;
