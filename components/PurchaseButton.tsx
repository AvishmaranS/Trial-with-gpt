'use client';

import { useState } from 'react';

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

async function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function PurchaseButton({ productId, amount }: { productId: string; amount: number }) {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Unable to load payment gateway.');
      setLoading(false);
      return;
    }

    const email = window.prompt('Enter email for secure download delivery:')?.trim();
    if (!email) {
      setLoading(false);
      return;
    }

    const orderResponse = await fetch('/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, email })
    });

    const orderData = await orderResponse.json();

    const razorpay = new window.Razorpay({
      key: orderData.key,
      amount: amount * 100,
      currency: 'INR',
      name: 'Avishmaran Music',
      order_id: orderData.orderId,
      handler: async (response: Record<string, string>) => {
        const verifyRes = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...response,
            email,
            productId
          })
        });

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          alert(`Payment verified. Download at: ${verifyData.downloadUrl}`);
        } else {
          alert('Payment verification failed.');
        }
      },
      theme: { color: '#1f1f25' }
    });

    razorpay.open();
    setLoading(false);
  };

  return (
    <button
      onClick={handlePurchase}
      disabled={loading}
      className="rounded-full bg-white/10 px-6 py-3 text-sm transition duration-300 hover:bg-white/20 disabled:opacity-60"
    >
      {loading ? 'Preparing...' : 'Purchase'}
    </button>
  );
}
