'use client';

export default function OrderSummary({ cart, total }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">Free</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900">$0.00</span>
        </div>
        <div className="border-t border-gray-200 pt-4 flex justify-between">
          <span className="text-lg font-medium">Total</span>
          <span className="text-lg font-bold">${total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-md font-medium mb-2">Items in Cart</h3>
        <ul className="divide-y divide-gray-200">
          {cart.map((item) => (
            <li key={item._id} className="py-2 flex justify-between">
              <span className="text-gray-600">
                {item.name} × {item.quantity}
              </span>
              <span className="text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}