"use client";
import BackButton from "@/app/components/uiByMe/BackButton";
import SomethingWentWrong from "@/app/components/uiByMe/error/SomethingWentWrong";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function page() {
  const [codeLoading, setCodeLoading] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [code, setCode] = useState("");

  const params = useParams();
  const id = params["product-id"];
  const prod = useSelector((state) => state.store?.allProducts?.products).find(
    (x) => x.id == id
  );
  const [buyPrice, setBuyPrice] = useState();

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    codeError ? setCodeError("") : "";
  };

  const handleQueryCost = async () => {
    if (!code) return;
    setCodeLoading(true);
    try {
      const res = await fetch("/api/products/get-purchased-price", {
        method: "POST",
        body: JSON.stringify({ code, product_id: prod?.id }),
      });
      if (!res.ok) {
        if (res.status == 403) {
          throw new Error("Invalid code please try again");
        }
        throw new Error("Something went wrong");
      }
      const data = await res.json();

      setBuyPrice(data?.data?.buy_price);
    } catch (error) {
      setCodeError(error.message);
    } finally {
      setCodeLoading(false);
    }
  };

  if (!prod) {
    return <SomethingWentWrong />;
  }

  return (
    <div className="mt-5">
      <BackButton />
      {prod && (
        <div className="prod py-5 sm:max-w-2xl mx-auto">
          <div className="imageWrapper mx-auto sm:outline w-full sm:px-50 px-5 sm:p-0 rounded-xl h-96">
            <Image
              src={prod?.image_url}
              alt="product image"
              width={400}
              height={400}
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
            <div className="d mt-1">
              {prod.description} Lorem ipsum dolor sit, amet consectetur
              adieleniti illo nemo quis consectetur. Atque amet aliquid culpa
              iure cupiditate recusandae consequuntur qui animi consequatur?
            </div>

            <h3 className="mt-8 sm:mt-12 font-semibold text-lg">
              Other details
            </h3>
            <div className="details mt-2 flex flex-col gap-2">
              <div className="flex gap-2">
                <span className="font-medium"> Products Id :</span>
                <span>{prod?.id} </span>
              </div>

              <div className="gap-2 flex">
                <span className="font-medium"> Total single packets :</span>
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
            <label htmlFor="code">Purchased price:</label>
            {buyPrice && (
              <span className="text-lg font-medium">{buyPrice} /-</span>
            )}

            <div className="btn flex gap-2 mt-1">
              <Input
                value={code}
                onChange={handleCodeChange}
                type={"text"}
                id="code"
                placeholder="Enter Code"
              />
              <Button disabled={code ? false : true} onClick={handleQueryCost}>
                {codeLoading ? "wait..." : "Submit"}
              </Button>
            </div>
            {codeError && <p className="text-sm text-red-500"> {codeError}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
