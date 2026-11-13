let loader;
function loadScript() {
  if (typeof window === 'undefined') return Promise.reject(new Error('Browser only'));
  if (window.Razorpay) return Promise.resolve();
  if (!loader) {
    loader = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://checkout.razorpay.com/v1/checkout.js';
      s.onload = resolve;
      s.onerror = () => { loader = null; reject(new Error('Could not load the payment gateway. Check your connection.')); };
      document.body.appendChild(s);
    });
  }
  return loader;
}

/** Opens Razorpay Checkout. Resolves with { orderId, paymentId, signature }. */
export async function openRazorpay({ keyId, orderId, amountPaise, currency, name, description, prefill = {}, method, bank }) {
  await loadScript();
  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: keyId,
      order_id: orderId,
      amount: amountPaise,
      currency,
      name,
      description,
      prefill: { ...prefill, method, ...(bank ? { bank } : {}) },
      theme: { color: '#f26a21' },
      handler: (r) => resolve({ orderId: r.razorpay_order_id, paymentId: r.razorpay_payment_id, signature: r.razorpay_signature }),
      modal: { ondismiss: () => reject(new Error('Payment was cancelled. You can try again.')) },
    });
    rzp.on('payment.failed', (r) => reject(new Error(r?.error?.description || 'Payment failed. Please try again.')));
    rzp.open();
  });
}
