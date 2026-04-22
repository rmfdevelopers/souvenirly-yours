'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Package,
  Truck,
  PenTool,
  Mail,
  Instagram,
  MapPin,
  ArrowRight,
  CheckCheck,
  Loader2,
  Menu,
  X,
  ImageOff,
  Phone
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

// --- CONSTANTS ---

const BRAND = {
  name: "Souvenirly Yours",
  tagline: "Gifting Just Got Easier",
  description: "Lagos-based curators of thoughtful keepsakes and bespoke bulk gifts for life's most cherished milestones. From weddings to corporate tokens, we handle the details so you don't have to.",
  industry: "services",
  region: "nigeria",
  bn: "BN-9032014"
};

const COLORS = {
  primary: "#013220",
  secondary: "#FFFDD0",
  accent: "#B76E79"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1667104828501-fc2b32261edf?q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1610112278819-069287c86d03?q=80&w=1080",
    "https://images.unsplash.com/photo-1594396554788-9438ff92e311?q=80&w=1080",
    "https://images.unsplash.com/photo-1661200523492-45dbe7a22e55?q=80&w=1080",
    "https://images.unsplash.com/photo-1718353300038-29e379591c95?q=80&w=1080",
    "https://images.unsplash.com/photo-1720637594911-fb18f28eb913?q=80&w=1080",
    "https://images.unsplash.com/photo-1772217104209-c47231f78c71?q=80&w=1080"
  ]
};

const TESTIMONIALS = [
  { name: "Adesua O.", role: "Bride", text: "The wedding favors were the talk of the night. So elegant and perfectly packaged! Every detail felt intentional." },
  { name: "Chidi K.", role: "Marketing Director", text: "Top-tier corporate gifting. They made our 500-guest AGM feel incredibly personal. Sharp delivery to our Abuja office too." },
  { name: "Bose T.", role: "Event Planner", text: "Souvenirly Yours is my go-to for quality. They never miss a deadline and the bespoke branding is always flawless." }
];

// --- HOOKS ---

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

// --- COMPONENTS ---

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-secondary/10 ${className}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

function SectionDivider() {
  return (
    <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <span className="text-accent font-sans text-xs tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
        {BRAND.tagline}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </div>
  );
}

// --- SECTIONS ---

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="bg-primary selection:bg-accent selection:text-white">
      {/* HEADER */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-xl py-4 shadow-xl border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-accent text-primary flex items-center justify-center rounded-lg font-heading font-black text-xl group-hover:scale-105 transition-transform">S</div>
            <span className="font-heading text-lg font-bold tracking-tight text-white hidden sm:block">Souvenirly Yours</span>
          </a>

          <div className="hidden md:flex gap-10 items-center">
            {['Gallery', 'Features', 'Products', 'Consultation'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-white/70 hover:text-accent transition-colors text-sm font-medium uppercase tracking-widest">{link}</a>
            ))}
            <a href="#contact" className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-accent/10">
              Book Call
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-white p-2">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-primary" />
        <div className="relative h-full flex flex-col p-8">
          <div className="flex justify-between items-center mb-12">
            <div className="w-10 h-10 bg-accent text-primary flex items-center justify-center rounded-lg font-heading font-black text-xl">S</div>
            <button onClick={() => setIsMenuOpen(false)} className="text-white"><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {['Gallery', 'Features', 'Products', 'Consultation'].map((link) => (
              <a key={link} onClick={() => setIsMenuOpen(false)} href={`#${link.toLowerCase()}`} className="font-heading text-4xl font-bold text-white hover:text-accent transition-colors">{link}</a>
            ))}
          </div>
          <div className="mt-auto pt-12 border-t border-white/10">
            <p className="text-accent font-mono text-xs tracking-widest uppercase mb-4">Lagos, Nigeria</p>
            <p className="text-white/50 text-sm">Every gift tells a story. Let us help you write yours perfectly.</p>
          </div>
        </div>
      </div>

      {/* HERO - HR-C Pattern */}
      <section id="home" className="relative min-h-screen grid md:grid-cols-[1fr_1fr] items-stretch bg-primary overflow-hidden">
        <div className="relative z-20 flex flex-col justify-center px-8 md:px-16 py-24 md:py-24 bg-primary/40 md:bg-transparent backdrop-blur-[2px] md:backdrop-blur-none min-h-screen md:min-h-0">
          <div className="animate-slideUp">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tighter">
              Gifting Just Got <br /><span className="text-accent">Easier</span>
            </h1>
            <p className="text-secondary/60 mt-8 text-lg max-w-md leading-relaxed">
              {BRAND.description}
            </p>
            <div className="flex gap-4 mt-12 flex-wrap">
              <a href="#contact" className="bg-accent text-primary px-10 py-4 font-bold text-base
                hover:brightness-110 hover:translate-y-[-2px] transition-all duration-300 rounded-full shadow-2xl shadow-accent/20">
                Book a Consultation
              </a>
              <a href="#products" className="border border-white/20 text-white px-10 py-4 font-medium text-base
                hover:bg-white/5 transition-all duration-300 rounded-full">
                View Collection
              </a>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 md:relative md:inset-auto z-10 min-h-full overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-primary/80 via-primary/20 to-primary/80 md:bg-gradient-to-r md:from-primary md:via-primary/20 md:to-transparent" />
          <SafeImage src={IMAGES.hero} alt={BRAND.name} fill className="object-cover scale-110 animate-float" priority />
        </div>
      </section>

      {/* GALLERY - Masonry Bonus Section */}
      <section id="gallery" className="py-28 px-6 bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="font-heading text-5xl font-black text-white mb-4">The Keepsake Gallery</h2>
            <p className="text-secondary/40 text-lg">A glimpse into our curated world of thoughtful tokens.</p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {IMAGES.products.map((src, i) => {
              const { ref, isVisible } = useScrollReveal(0.1);
              return (
                <div key={i} ref={ref as any}
                  className={`break-inside-avoid group relative rounded-3xl overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}>
                  <SafeImage src={src} alt={`Gallery ${i + 1}`} width={600} height={400}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-all duration-500" />
                  <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-accent/90 backdrop-blur px-4 py-1.5 rounded-full text-primary text-xs font-bold uppercase tracking-widest">Bespoke</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* FEATURES - F-ICON-GRID */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl font-black text-white">The Souvenirly Standard</h2>
            <p className="text-secondary/40 mt-4 text-lg">Professional gifting solutions for every scale.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Package, title: "Bulk Order Specialists", desc: "Seamlessly managing large-scale gift production with a 30+ piece minimum." },
              { icon: Truck, title: "Nationwide Delivery", desc: "Safe and timely transit from our Lagos hub to your doorstep anywhere in Nigeria." },
              { icon: PenTool, title: "Bespoke Branding", desc: "Every gift is customized to reflect your personal theme or corporate identity." }
            ].map((f, i) => {
              const { ref, isVisible } = useScrollReveal();
              return (
                <div key={i} ref={ref as any}
                  className={`p-10 rounded-3xl border border-white/5 bg-secondary/5 hover:bg-secondary/10 hover:border-accent/30 transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                    <f.icon size={32} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-4 leading-tight">{f.title}</h3>
                  <p className="text-secondary/45 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCTS - P-ASYMMETRIC */}
      <section id="products" className="py-28 px-6 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="font-heading text-5xl font-black text-white">Occasions We Celebrate</h2>
              <p className="text-accent font-bold mt-2 uppercase tracking-widest text-sm">Minimum 30 Pieces per order</p>
            </div>
            <p className="text-secondary/40 max-w-xs md:text-right">Discover the perfect match for your upcoming event with our curated selections.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Featured */}
            <div className="md:col-span-7 group relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
              <SafeImage src={IMAGES.products[0]} alt="Wedding Favors" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent" />
              <div className="absolute bottom-0 p-10">
                <span className="text-accent font-mono text-sm uppercase tracking-widest mb-2 block">Our Signature Suite</span>
                <h3 className="font-heading text-4xl font-black text-white mb-2">The Wedding Suite</h3>
                <p className="text-secondary/60 max-w-md mb-6">Elegant personalized favors tailored for your big day. Designed to leave a lasting impression on every guest.</p>
                <div className="flex items-center gap-6">
                  <span className="text-accent font-black text-3xl">₦4,500 <span className="text-xs text-white/40 uppercase font-normal tracking-widest">/ pc</span></span>
                  <a href="#contact" className="bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold hover:bg-accent hover:text-primary transition-all">Order Now</a>
                </div>
              </div>
            </div>
            {/* Small Grid */}
            <div className="md:col-span-5 grid grid-rows-2 gap-6">
              {[
                { name: "Corporate Token Box", price: "₦12,500", img: IMAGES.products[1], desc: "Premium branding meets utility for AGMs." },
                { name: "Birthday Keepsake Tin", price: "₦3,800", img: IMAGES.products[2], desc: "Curated delights for your milestones." }
              ].map((p, i) => (
                <div key={i} className="group relative rounded-3xl overflow-hidden shadow-xl border border-white/5">
                  <SafeImage src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <h3 className="font-heading text-xl font-bold text-white">{p.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-accent font-black">{p.price}</span>
                      <a href="#contact" className="text-xs text-white/60 hover:text-accent transition-colors font-bold uppercase tracking-widest">Inquire →</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS - How We Deliver Joy */}
      <section id="process" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-5xl font-black text-white mb-16 text-center md:text-left">How We Deliver Joy</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/10 to-transparent hidden md:block" />
            <div className="space-y-16">
              {[
                { n: "01", t: "Gift Consultation", d: "Share your vision, guest count (min 30 pcs), and budget with our lead curator." },
                { n: "02", t: "Curation & Design", d: "We source high-quality items and brand them with artisanal precision at our Lagos studio." },
                { n: "03", t: "Nationwide Dispatch", d: "Hand-checked and securely packed, we dispatch from Lagos to any state in Nigeria." }
              ].map((step, i) => {
                const { ref, isVisible } = useScrollReveal();
                return (
                  <div key={i} ref={ref as any} className={`flex gap-8 items-start group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: `${i * 200}ms` }}>
                    <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center shrink-0 relative z-10 font-heading font-black shadow-xl shadow-accent/20 group-hover:scale-110 transition-transform">
                      {step.n}
                    </div>
                    <div className="pt-2">
                      <h3 className="font-heading text-3xl font-bold text-white mb-3">{step.t}</h3>
                      <p className="text-secondary/50 text-lg leading-relaxed max-w-2xl">{step.d}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* TESTIMONIALS - T-MASONRY */}
      <section className="py-28 px-6 bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl font-black text-white">Kind Words</h2>
            <p className="text-secondary/40 mt-4">From our beloved clients across the nation.</p>
          </div>
          <div className="relative overflow-hidden py-10">
            <div className="flex animate-slide-left w-fit gap-8 whitespace-nowrap">
              {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => {
                return (
                  <div key={i}
                    className="w-[400px] flex-shrink-0 p-10 rounded-[2.5rem] bg-primary border border-white/5 relative overflow-hidden group transition-all duration-700 whitespace-normal">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
                    <p className="text-white/80 text-xl leading-relaxed italic relative z-10 font-medium">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-4 border-t border-white/5 pt-8 mt-10 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-heading font-black">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white">{t.name}</p>
                        <p className="text-accent text-xs font-mono tracking-widest uppercase mt-0.5">{t.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT - Consultation Hub - C2 Pattern */}
      <section id="consultation" className="relative py-32 bg-primary overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="animate-slideUp">
              <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-8">
                Let's Craft Your <br /><span className="text-accent">Legacy</span> Gift
              </h2>
              <p className="text-secondary/60 text-lg md:text-xl leading-relaxed mb-12 max-w-lg">
                From corporate gala souvenirs to intimate wedding favors, we curate high-end collections that resonate. Fill out the brief and our specialists will handle the rest.
              </p>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-accent/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Instagram size={24} className="text-accent" />
                  </div>
                  <h4 className="text-white font-bold mb-2">Social Hub</h4>
                  <p className="text-secondary/40 text-sm tracking-widest uppercase font-black">@souvenirly_yours</p>
                </div>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-accent/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Mail size={24} className="text-accent" />
                  </div>
                  <h4 className="text-white font-bold mb-2">Direct Inquiry</h4>
                  <p className="text-secondary/40 text-sm tracking-widest uppercase font-black truncate">hello@souvenirly.com</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full pointer-events-none opacity-20" />
              <div className="relative z-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - Refined F2 */}
      <footer className="bg-primary pt-24 pb-12 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-12 h-12 bg-accent text-primary flex items-center justify-center rounded-xl font-heading font-black text-2xl">S</div>
                <span className="font-heading text-2xl font-bold tracking-tight text-white">Souvenirly Yours</span>
              </div>
              <p className="text-secondary/40 max-w-xs leading-relaxed">
                Curating memories through bespoke bulk gifts for the most important milestones of your life.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="text-accent font-mono text-xs tracking-[0.3em] uppercase mb-8 opacity-60">Navigate</h4>
                <ul className="space-y-4">
                  {['Gallery', 'Features', 'Products', 'Consultation'].map(l => (
                    <li key={l}><a href={`#${l.toLowerCase()}`} className="text-secondary/60 hover:text-white transition-colors text-sm">{l}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-accent font-mono text-xs tracking-[0.3em] uppercase mb-8 opacity-60">Legal</h4>
                <ul className="space-y-4">
                  <li className="text-secondary/60 text-sm">{BRAND.bn}</li>
                  <li className="text-secondary/60 text-sm">Privacy Policy</li>
                </ul>
              </div>
            </div>

            <div className="bg-secondary/5 rounded-3xl p-8 border border-white/5">
              <h4 className="font-heading text-xl font-bold text-white mb-4">Gifting is an Art</h4>
              <p className="text-secondary/40 text-sm leading-relaxed mb-6">Join our mailing list for gift ideas and seasonal collections.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm flex-1 outline-none focus:border-accent transition-colors" />
                <button className="bg-accent p-3 rounded-xl text-primary hover:scale-105 transition-transform"><ArrowRight size={20} /></button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6 text-center">
            <p className="text-secondary/30 text-xs font-mono uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} SOUVENIRLY YOURS. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-secondary/30 hover:text-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-secondary/30 hover:text-accent transition-colors"><Phone size={20} /></a>
              <a href="#" className="text-secondary/30 hover:text-accent transition-colors"><Mail size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', count: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-primary rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden min-h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-50" />
        <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mb-8 border border-accent/40 relative z-10">
          <CheckCheck size={40} className="text-accent" />
        </div>
        <h3 className="font-heading text-4xl font-black text-white mb-4 relative z-10">Request Received</h3>
        <p className="text-secondary/60 max-w-sm text-lg relative z-10">Thank you. Our curator will review your details and reach out to start your gifting journey.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/[0.03] backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative">
      <div className="relative z-10">
        <div className="mb-10">
          <h3 className="font-heading text-3xl font-black text-white mb-2">Briefing Desk</h3>
          <p className="text-secondary/40 text-sm">We'll get back to you within 24 hours.</p>
        </div>

        <div className="space-y-5">
          <div className="relative group">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
              required
              className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-white placeholder-white/20 text-sm outline-none transition-all duration-300 group-hover:bg-white/10 focus:bg-white/10 focus:border-accent/50 focus:ring-4 focus:ring-accent/5"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              required
              className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-white placeholder-white/20 text-sm outline-none transition-all duration-300 group-hover:bg-white/10 focus:bg-white/10 focus:border-accent/50 focus:ring-4 focus:ring-accent/5"
            />
            <input
              type="number"
              placeholder="Pieces (Min 30)"
              value={form.count}
              onChange={e => setForm(prev => ({ ...prev, count: e.target.value }))}
              required
              className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-white placeholder-white/20 text-sm outline-none transition-all duration-300 group-hover:bg-white/10 focus:bg-white/10 focus:border-accent/50 focus:ring-4 focus:ring-accent/5"
            />
          </div>

          <textarea
            rows={5}
            placeholder="Tell us about your event (Date, Theme, Specific items)..."
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            required
            className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-white placeholder-white/20 text-sm outline-none resize-none transition-all duration-300 group-hover:bg-white/10 focus:bg-white/10 focus:border-accent/50 focus:ring-4 focus:ring-accent/5"
          />
        </div>

        <button type="submit" disabled={loading}
          className="w-full mt-10 bg-accent text-primary py-6 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-accent/20 transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-3">
          {loading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <>
              Initialize Project <ArrowRight size={22} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}