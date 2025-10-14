import { ChevronRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function SingleOutlineList({ name, url }) {
  const router = useRouter();
  const handleRouting = () => {
    router.push(`/admin/${url}`);
  };
  return (
    <div
      className="outline rounded-xl cursor-pointer hover:bg-gray-50 p-3 flex justify-between items-center"
      onClick={handleRouting}
    >
      <div className="info flex gap-2 items-center">
        <Plus />
        {name}
      </div>
      <div className="arr">
        <ChevronRight />
      </div>
    </div>
  );
}

export default SingleOutlineList;
