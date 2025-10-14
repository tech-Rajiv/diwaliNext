import React from "react";

function helper() {
  const handleSaveOrder = async (cartProducts) => {
    try {
      const res = await fetch("api/add-to-cart", {
        method: "POST",
        body: JSON.stringify({
          ...cartProducts,
        }),
      });
      const data = await res.json();
      console.log(data, "data");
    } catch (error) {}
    // dispatch(resetCart());
    // router.replace("/");
  };
  return {
    handleSaveOrder,
  };
}

export default helper;
