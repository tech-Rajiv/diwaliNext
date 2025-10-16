import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

function SpinnerLoader() {
  return (
    <div className="flex items-center items-center w-full h-96 sm:h-[500px] justify-center gap-4">
      <Spinner />
    </div>
  );
}

export default SpinnerLoader;
