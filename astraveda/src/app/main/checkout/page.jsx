'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/cart-context';
import AddressForm from '@/components/checkout/AddressForm';
import PaymentMethods from '@/components/checkout/PaymentMethods';
import OrderSummary from '@/components/checkout/OrderSummary';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleAddressSubmit = (address) => {
    setShippingAddress(address);
    setStep(2);
  };

  const handlePaymentSubmit = async (paymentDetails) => {
    try {
      // In a real app, you would process the payment here
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          total: cartTotal,
          shippingAddress,
          paymentMethod,
          paymentDetails,
        }),
      });

      if (response.ok) {
        clearCart();
        router.push('/checkout/success');
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      // Handle error
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-8">
            <div className="flex items-center mb-6">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
              </div>
              <div className={`ml-2 ${step >= 1 ? 'text-indigo-600' : 'text-gray-600'}`}>Shipping Address</div>
              <div className="flex-1 border-t-2 border-gray-200 mx-4"></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <div className={`ml-2 ${step >= 2 ? 'text-indigo-600' : 'text-gray-600'}`}>Payment Method</div>
            </div>

            {step === 1 && (
              <AddressForm 
                initialValues={shippingAddress}
                onSubmit={handleAddressSubmit}
              />
            )}

            {step === 2 && (
              <PaymentMethods 
                onSelectMethod={setPaymentMethod}
                onSubmit={handlePaymentSubmit}
                onBack={() => setStep(1)}
              />
            )}
          </div>
        </div>
        <div className="lg:col-span-1">
          <OrderSummary cart={cart} total={cartTotal} />
        </div>
      </div>
    </div>
  );
}