// helper.js
export async function handleSaveOrder(cartProducts) {
  try {
    const res = await fetch("/api/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartProducts),
    });

    const data = await res.json();

    if (!res.ok) {
      // Handle 401 or other errors
      return { success: false, error: res.status, message: data.message };
    }

    return {
      success: true,
      message: data.message || "Order created successfully",
    };
  } catch (error) {
    console.error("Error saving order:", error);
    return { success: false, message: error.message || "Something went wrong" };
  }
}
