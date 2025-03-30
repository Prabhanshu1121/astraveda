'use client';

import { useState } from 'react';

export default function PaymentMethods({ onSelectMethod, onSubmit, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'card') {
      onSubmit({
        method: 'card',
        details: cardDetails,
      });
    } else {
      onSubmit({
        method: paymentMethod,
      });
    }
  };

  return (
    <div>
      <h2 className="text-lg font-medium mb-6">Payment Method</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              id="credit-card"
              name="payment-method"
              type="radio"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
              Credit Card
            </label>
          </div>

          {paymentMethod === 'card' && (
            <div className="ml-6 space-y-4">
              <div>
                <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                  Card number
                </label>
                <input
                  type="text"
                  id="card-number"
                  name="number"
                  value={cardDetails.number}
                  onChange={handleCardChange}
                  placeholder="4242 4242 4242 4242"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="card-expiry" className="block text-sm font-medium text-gray-700">
                    Expiration date
                  </label>
                  <input
                    type="text"
                    id="card-expiry"
                    name="expiry"
                    value={cardDetails.expiry}
                    onChange={handleCardChange}
                    placeholder="MM/YY"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="card-cvc" className="block text-sm font-medium text-gray-700">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="card-cvc"
                    name="cvc"
                    value={cardDetails.cvc}
                    onChange={handleCardChange}
                    placeholder="123"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="card-name" className="block text-sm font-medium text-gray-700">
                  Name on card
                </label>
                <input
                  type="text"
                  id="card-name"
                  name="name"
                  value={cardDetails.name}
                  onChange={handleCardChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
          )}

          <div className="flex items-center">
            <input
              id="paypal"
              name="payment-method"
              type="radio"
              checked={paymentMethod === 'paypal'}
              onChange={() => setPaymentMethod('paypal')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
              PayPal
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="stripe"
              name="payment-method"
              type="radio"
              checked={paymentMethod === 'stripe'}
              onChange={() => setPaymentMethod('stripe')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label htmlFor="stripe" className="ml-3 block text-sm font-medium text-gray-700">
              Stripe
            </label>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!paymentMethod}
            className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Complete Order
          </button>
        </div>
      </form>
    </div>
  );
}