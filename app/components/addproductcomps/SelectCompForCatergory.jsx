import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectCompForCatergory({ selectData, handleOnChangeOfInputs }) {
  return (
    <Select
      onValueChange={(value) => {
        handleOnChangeOfInputs({ target: { name: "category_id", value } });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>category</SelectLabel>
          {selectData.map((data) => (
            <SelectItem key={data?.id} value={data?.id}>
              {data?.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectCompForCatergory;
