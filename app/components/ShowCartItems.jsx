export default function ShowCartItems({ cartItems }) {
  console.log("cartItems: ", cartItems);

  //   function remove(id) {
  //     setItems((prev) => prev.filter((it) => it.id !== id));
  //   }

  //   const total = cartItems.reduce((sum, it) => sum + it.price * it.qty, 0);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Your cart is empty.
        </div>
      ) : (
        <ul className="space-y-3">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 p-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium truncate">{item.title}</h3>

                  <div className="text-right">
                    <div className="text-sm text-gray-500">Price</div>
                    <div className="font-semibold">₹{item.price}</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                    <button
                      onClick={() => decrease(item.id)}
                      aria-label={`Decrease quantity of ${item.title}`}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
                    >
                      −
                    </button>
                    <div className="px-3 font-medium">{item.quantity}</div>
                    <button
                      onClick={() => increase(item.id)}
                      aria-label={`Increase quantity of ${item.title}`}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-500">Subtotal</div>
                    <div className="font-semibold">
                      ₹{item.price * item.quantity}
                    </div>

                    <button
                      onClick={() => remove(item.id)}
                      aria-label={`Remove ${item.title}`}
                      className="ml-2 p-2 rounded-md hover:bg-red-50 text-red-600"
                    >
                      {/* simple trash icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H3.5A1.5 1.5 0 002 5.5V6a1 1 0 001 1h12a1 1 0 001-1v-.5A1.5 1.5 0 0016.5 4H15V3a1 1 0 00-1-1H6zm2 6a1 1 0 10-2 0v6a1 1 0 102 0V8zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <div>
          <div className="text-sm text-gray-500">Total</div>
          {/* <div className="text-xl font-semibold">₹{total}</div> */}
        </div>

        <button
          className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
          //   disabled={items.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
