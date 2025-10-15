"use client";
import { ArrowUpRightIcon, SmilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useRouter } from "next/navigation";
function OrderCreatedSuccessfully() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center ">
      {" "}
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SmilePlus />
          </EmptyMedia>
          <EmptyTitle>Order placed successfully.</EmptyTitle>
          <EmptyDescription>
            🎉 Order placed! You can check the details anytime in your Orders
            section.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button onClick={() => router.replace("/")}>Shop more</Button>
            <Button variant="outline" onClick={() => router.replace("/")}>
              Go home
            </Button>
          </div>
        </EmptyContent>
        <Button
          variant="link"
          asChild
          className="text-muted-foreground"
          size="sm"
        >
          <button onClick={() => router.replace("/orders")}>
            veiw orders <ArrowUpRightIcon />
          </button>
        </Button>
      </Empty>
    </div>
  );
}

export default OrderCreatedSuccessfully;
