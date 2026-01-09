import SunglassesScroll from '@/components/SunglassesScroll';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      {/* Navigation - Minimalist & Glassmorphism */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center pointer-events-auto">
        <div className="text-xl font-bold tracking-tighter text-white">ZENITH X</div>
        <div className="flex gap-8 text-sm font-medium tracking-widest text-white/60 uppercase">
          <a href="#" className="hover:text-white transition-colors">Technology</a>
          <a href="#" className="hover:text-white transition-colors">Design</a>
          <a href="#" className="hover:text-white transition-colors">Shop</a>
        </div>
        <button className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold tracking-widest uppercase rounded-full transition-all border border-white/10">
          Order Now
        </button>
      </nav>

      {/* Main Experience */}
      <SunglassesScroll />

      {/* Footer / Extra Content */}
      <section className="relative h-[100vh] flex flex-col items-center justify-center p-8 bg-[#050505]">
        <div className="max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white/90 mb-8">
            Engineered for the Infinite.
          </h2>
          <p className="text-xl md:text-2xl text-white/60 leading-relaxed mb-12">
            The Zenith X series represents the pinnacle of optical engineering.
            Blending form and function into a singular, indestructible masterpiece.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div>
              <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-sm">Lightweight</h3>
              <p className="text-white/40 text-sm">24g of pure titanium alloy for all-day comfort.</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-sm">Indestructible</h3>
              <p className="text-white/40 text-sm">Impact-resistant sapphire coating and frame structure.</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-sm">Pure Clarity</h3>
              <p className="text-white/40 text-sm">Zero-distortion lenses with infinite horizon tech.</p>
            </div>
          </div>
        </div>

        <footer className="absolute bottom-8 text-white/20 text-xs tracking-widest uppercase">
          © 2026 Zenith X Optics. All rights reserved.
        </footer>
      </section>
    </main>
  );
}
