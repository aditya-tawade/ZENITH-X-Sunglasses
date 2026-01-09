'use client';

import SunglassesScroll from '@/components/SunglassesScroll';

export default function Home() {
  const handleOrderNow = async () => {
    try {
      const response = await fetch('/api/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.id) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: data.currency,
          name: "Zenith X Optics",
          description: "Zenith X Sunglasses Purchase",
          order_id: data.id,
          handler: function (response: any) {
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          },
          prefill: {
            name: "Customer",
            email: "customer@example.com",
            contact: "+919876543210"
          },
          theme: {
            color: "#050505"
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        alert('Failed to create order: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error initiating purchase:', error);
      alert('An error occurred while initiating the purchase. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-[#050505]">
      {/* Navigation - Minimalist & Glassmorphism */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 sm:px-8 sm:py-6 flex justify-between items-center pointer-events-auto">
        <div className="text-lg sm:text-xl font-bold tracking-tighter text-white">ZENITH X</div>
        <div className="hidden sm:flex gap-8 text-sm font-medium tracking-widest text-white/60 uppercase">
          <a href="#" className="hover:text-white transition-colors">Technology</a>
          <a href="#" className="hover:text-white transition-colors">Design</a>
          <a href="#" className="hover:text-white transition-colors">Shop</a>
        </div>
        <button
          onClick={handleOrderNow}
          className="px-4 py-2 sm:px-5 sm:py-2 bg-white/10 hover:bg-white/20 text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase rounded-full transition-all border border-white/10 backdrop-blur-md cursor-pointer"
        >
          Order Now
        </button>
      </nav>

      {/* Main Experience */}
      <SunglassesScroll />

      {/* Footer / Extra Content */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 sm:p-8 bg-[#050505]">
        <div className="max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-white/90 mb-6 sm:mb-8">
            Engineered for the Infinite.
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/60 leading-relaxed mb-10 sm:mb-12">
            The Zenith X series represents the pinnacle of optical engineering.
            Blending form and function into a singular, indestructible masterpiece.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 text-left">
            <div className="border-l border-white/10 pl-4">
              <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-xs sm:text-sm">Lightweight</h3>
              <p className="text-white/40 text-xs sm:text-sm">24g of pure titanium alloy for all-day comfort.</p>
            </div>
            <div className="border-l border-white/10 pl-4">
              <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-xs sm:text-sm">Indestructible</h3>
              <p className="text-white/40 text-xs sm:text-sm">Impact-resistant sapphire coating and frame structure.</p>
            </div>
            <div className="border-l border-white/10 pl-4">
              <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-xs sm:text-sm">Pure Clarity</h3>
              <p className="text-white/40 text-xs sm:text-sm">Zero-distortion lenses with infinite horizon tech.</p>
            </div>
          </div>
        </div>

        <footer className="mt-20 text-white/20 text-[10px] tracking-widest uppercase text-center pb-8">
          © 2026 Zenith X Optics. All rights reserved.
        </footer>
      </section>
    </main>
  );
}
