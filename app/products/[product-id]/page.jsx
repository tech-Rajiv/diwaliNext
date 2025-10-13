"use client";
import BackButton from "@/app/components/uiByMe/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function page() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [prod, setProd] = useState();
  const params = useParams();
  const [code, setCode] = useState("");
  const [buyPrice, setBuyPrice] = useState();
  const id = params["product-id"];
  console.log("id: ", id);
  const allProducts = useSelector((state) => state.allProducts?.products);
  console.log(allProducts, "aaa");
  useEffect(() => {
    const product = allProducts.find((x) => x?.id == id);
    if (product) {
      setLoading(false);
      setProd(product);
    }
  }, [id, allProducts]);
  console.log(prod, "prod");
  if (loading) {
    return "Loading...";
  }
  if (error) {
    return "Cannot find any product";
  }
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  const handelShowCode = () => {
    if (code === "cost") {
      setShowCost(true);
    }
  };
  return (
    <div className="mt-5">
      <BackButton />
      {prod && (
        <div className="prod py-5 sm:max-w-2xl mx-auto">
          <div className="imageWrapper mx-auto sm:outline w-full sm:px-50 px-5 sm:p-0 rounded-xl h-96">
            <img
              src={prod?.image_url}
              alt="image"
              className="mx-auto w-full h-full object-cover rounded-xl sm:rounded-none"
            />
          </div>
          <div className="details px-5">
            <div className="title flex flex-col sm:flex-row justify-between  mt-3 sm:mt-5 gap-2">
              <h2 className="title ">{prod?.title}</h2>
              <div className="price">
                <span className="text-xl font-semibold">
                  {prod?.sell_price}
                </span>
                <span> rs</span>
              </div>
            </div>

            <h3 className="mt-8 sm:mt-12 font-semibold text-lg">
              Other details
            </h3>
            <div className="details mt-2 flex flex-col gap-2">
              <div className="flex gap-2">
                <span className="font-medium"> Products Id :</span>
                <span>{prod?.id} </span>
              </div>
              <div className=" flex  gap-2">
                <span className="font-medium">
                  {" "}
                  Purchase boxes (kitna bandha) :
                </span>
                <span>{prod?.purchased_box} </span>
              </div>
              <div className=" flex  gap-2">
                <span className="font-medium">
                  {" "}
                  Packets per boxes (ek bandha m kitne packets) :
                </span>
                <span>{prod?.packet_per_box} </span>
              </div>
              <div className="gap-2 flex">
                <span className="font-medium"> Total packets :</span>
                <span>{prod?.purchased_single_packets} </span>
              </div>
              <div className=" flex  gap-2">
                <span className="font-medium"> Purchased from seller :</span>
                <span>{prod?.purchased_from} Traders</span>
              </div>
              <div className=" flex  gap-2">
                <span className="font-medium"> Purchased year :</span>
                <span>{prod?.purchased_year} year</span>
              </div>
              <div className=" flex  gap-2">
                <span className="font-medium"> Available stock :</span>
                <span>{prod?.available_stock}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-medium"> Description :</span>
                <span>{prod?.description} </span>
              </div>
            </div>
          </div>
          <div className="inp mt-10 px-5">
            <label htmlFor="code">Purchased price:</label>{" "}
            <span>{buyPrice ? buyPrice : "no price"}</span>
            <div className="btn flex gap-2 mt-1">
              <Input
                onChange={handleCodeChange}
                type={"text"}
                id="code"
                placeholder="Enter Code"
              />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
