"use client";
import React from "react";
import BackButton from "../BackButton";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Frown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function SomethingWentWrong() {
  const router = useRouter();
  return (
    <div>
      <BackButton />

      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Frown className="text-muted-foreground w-10 h-10" />
          </EmptyMedia>
          <EmptyTitle>Nothing to display</EmptyTitle>
          <EmptyDescription>
            We couldn’t find any data for this section. Please add new items or
            try again later.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="default" onClick={() => router.push("/")}>
            Go to home
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

export default SomethingWentWrong;
