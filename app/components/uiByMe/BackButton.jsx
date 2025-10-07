"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function BackButton() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="py-5">
      <button onClick={handleBack} className="flex gap-2 cursor-pointer">
        <ChevronLeft />
        Back
      </button>
    </div>
  );
}

export default BackButton;
