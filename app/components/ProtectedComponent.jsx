import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

function ProtectedComponent({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  if (isLoggedIn) {
    return children;
  }
  return (
    <div className="h-60 flex flex-col items-center justify-center bg-black/20 bg-opacity-50 text-white z-50">
      <h2 className="text-xl mb-4">Login to add products.</h2>
      <Button onClick={() => router.push("/auth/login")}>Login</Button>
    </div>
  );
}

export default ProtectedComponent;
