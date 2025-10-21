'use client';

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Lenis from 'lenis';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const card3VideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Detectar si es mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Autoplay en mobile, pausado en desktop
    const handleVideoPlayback = async () => {
      if (card3VideoRef.current) {
        const video = card3VideoRef.current;
        
        // Esperar a que el video esté listo
        if (video.readyState < 3) {
          video.addEventListener('canplay', () => {
            handleVideoPlayback();
          }, { once: true });
          return;
        }
        
        if (window.innerWidth < 768) {
          try {
            await video.play();
          } catch {
            // Ignorar errores de play interrumpido
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
          video.currentTime = 0;
        }
      }
    };

    handleVideoPlayback();
    window.addEventListener('resize', handleVideoPlayback);

    return () => {
      window.removeEventListener('resize', handleVideoPlayback);
    };
  }, []);

  useEffect(() => {
    // Inicializar Lenis para smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen cursor-none">
      {/* Navbar */}
      <nav className="sticky top-0 z-50">
        <div className="max-w-none mx-auto px-2.5 md:px-5 py-4">
          <div className="grid grid-cols-4 md:grid-cols-12 gap-2.5 md:gap-5">
            <div className="col-span-1 md:col-span-1"></div>
            <div className="col-span-2 md:col-span-10 bg-white/50 backdrop-blur-md border border-gray-300/80 rounded-3xl px-6 py-4">
              <div className="grid grid-cols-4 md:grid-cols-10 gap-2.5 md:gap-5">
                <div className="col-span-2 md:col-span-2 flex items-center">
                  <Image
                    src="/assets/SVG/primate-logo.svg"
                    alt="Primate Logo"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                  />
                </div>
                <div className="col-span-2 md:col-span-8 flex items-center justify-end relative">
                  <button 
                    className="text-gray-600 hover:text-gray-900 transition-colors relative z-10 cursor-none group"
                    onClick={() => {
                      if (isMobile) {
                        setIsHovered(!isHovered);
                      }
                    }}
                    onMouseEnter={() => {
                      if (!isMobile) {
                        setIsHovered(true);
                      }
                    }}
                    onMouseLeave={() => {
                      if (!isMobile) {
                        setIsHovered(false);
                      }
                    }}
                  >
                    <svg className={`w-6 h-6 transition-transform duration-300 ${isHovered ? 'rotate-45' : 'rotate-0'} md:group-hover:rotate-45`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  
                  {/* Hover/Toggle Expansion Div */}
                  <div 
                    className={`absolute right-0 top-full mt-2 bg-black rounded-2xl transition-all duration-500 ease-out flex items-center justify-center overflow-hidden origin-top-right cursor-none ${
                      isHovered 
                        ? 'w-[300px] h-[80px] opacity-100' 
                        : 'w-0 h-0 opacity-0'
                    }`}
                    onMouseEnter={() => {
                      if (!isMobile) {
                        setIsHovered(true);
                      }
                    }}
                    onMouseLeave={() => {
                      if (!isMobile) {
                        setIsHovered(false);
                      }
                    }}
                  >
                    <p 
                      className={`text-white text-sm font-sans px-6 text-center transition-opacity duration-300 ${
                        isHovered ? 'opacity-100 delay-300' : 'opacity-0'
                      }`}
                    >
                      Primate is an audiovisual company based on AI techniques
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-1"></div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-none mx-auto px-2.5 md:px-5">
        <div className="grid grid-cols-4 md:grid-cols-12 gap-2.5 md:gap-5">
          {/* Card 1 */}
          <div className="col-span-4 md:col-span-3">
            <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl overflow-hidden h-[500px] md:h-[700px]">
              <video 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/video/silueta.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-span-4 md:col-span-3">
            <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl overflow-hidden h-[500px] md:h-[700px] relative">
              <video 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/video/cyborg_vert.mp4" type="video/mp4" />
              </video>
              {/* Logo blanco en esquina superior izquierda */}
              <div className="absolute top-6 left-6 z-10">
                <Image
                  src="/assets/SVG/primate-logo.svg"
                  alt="Primate Logo"
                  width={200}
                  height={80}
                  className="h-16 w-auto brightness-0 invert"
                />
              </div>
            </div>
          </div>

          {/* Cards 3 y 4 - Dos cards pequeñas */}
          <div className="col-span-4 md:col-span-3">
            <div className="grid grid-cols-1 grid-rows-2 gap-2.5 md:gap-5 md:h-[700px]">
              {/* Card 3a */}
              <div 
                className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl overflow-hidden relative cursor-none h-[500px] md:h-auto"
                onMouseEnter={() => {
                  if (card3VideoRef.current && window.innerWidth >= 768) {
                    const video = card3VideoRef.current;
                    video.play().catch(() => {
                      // Ignorar errores de play
                    });
                  }
                }}
                onMouseLeave={() => {
                  if (card3VideoRef.current && window.innerWidth >= 768) {
                    const video = card3VideoRef.current;
                    if (!video.paused) {
                      video.pause();
                    }
                    video.currentTime = 0;
                  }
                }}
              >
                <video
                  ref={card3VideoRef}
                  className="absolute inset-0 w-full h-full object-cover object-top z-0"
                  loop
                  muted
                  playsInline
                  webkit-playsinline="true"
                >
                  <source src="/video/card3.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between">
                  <div></div>
                  <div>
                    <p className="text-white font-sans font-bold text-2xl uppercase">PRIMATE.COM</p>
                  </div>
                </div>
              </div>
              {/* Card 3b */}
              <div className="bg-dark-gray rounded-3xl p-6 flex flex-col justify-between h-[500px] md:h-auto">
                <div className="text-black">
                  <p className="text-5xl md:text-3xl font-sans font-normal leading-none">PRIMATE,</p>
                  <p className="text-5xl md:text-3xl font-sans font-normal leading-none">TECHNOLOGY</p>
                  <p className="text-5xl md:text-3xl font-sans font-normal leading-none">& CREATIVE</p>
                  <p className="text-5xl md:text-3xl font-sans font-normal leading-none">PRODUCTION</p>
                </div>
                <div className="text-black">
                  <div className="relative mb-2 w-full">
                    <Image
                      src="/assets/SVG/linea.svg"
                      alt="Línea decorativa"
                      width={400}
                      height={40}
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-xl font-sans font-bold leading-tight text-blue-gray">2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-span-4 md:col-span-3">
            <div className="border border-gray-200/50 rounded-3xl overflow-hidden h-[700px] md:h-[700px] flex flex-col relative" style={{ backgroundColor: '#e2e3e4' }}>
              {/* Forma usando SVG externo */}
              <div className="relative m-4 md:m-6 h-[30%] md:h-[40%]">
                <Image
                  src="/morph/SVG/morph.svg"
                  alt="Primate morphology"
                  fill
                  className="object-fill"
                />
                
              </div>
              
              {/* Video en la parte inferior */}
              <div className="flex-1 rounded-t-2xl overflow-hidden">
                <video 
                  className="w-full h-full object-cover"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src="/video/monkey.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-none mx-auto px-2.5 md:px-5 mt-6 mb-8">
        <div className="bg-white/80 backdrop-blur-md border border-gray-300/80 rounded-3xl px-8 md:px-12 py-12 md:py-16">
          {/* Layout horizontal en desktop, vertical en mobile */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 md:gap-8 mb-12">
            {/* Logo y descripción */}
            <div className="md:w-2/5">
              <Image
                src="/logo/logo_footer.svg"
                alt="Primate Logo"
                width={200}
                height={60}
                className="h-10 w-auto mb-4"
              />
              <p className="text-xs text-gray-900 opacity-60 leading-relaxed">
                Audiovisual company based on AI techniques,<br />creating innovative content and experiences.
              </p>
            </div>

            {/* Espaciador */}
            <div className="hidden md:block md:w-1/5"></div>

            {/* Información de contacto */}
            <div className="md:w-1/5">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider mb-4 opacity-70">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:hello@primate.com" className="text-sm text-gray-900 opacity-60 hover:opacity-100 transition-opacity cursor-none leading-relaxed block">
                    hello@primate.com
                  </a>
                </li>
                <li>
                  <a href="tel:+5255123456789" className="text-sm text-gray-900 opacity-60 hover:opacity-100 transition-opacity cursor-none leading-relaxed block">
                    +52 55 1234 5678
                  </a>
                </li>
              </ul>
            </div>

            {/* Redes sociales */}
            <div className="md:w-1/5">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider mb-4 opacity-70">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-900 opacity-60 hover:opacity-100 transition-all  cursor-none" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-900 opacity-60 hover:opacity-100 transition-all  cursor-none" aria-label="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-900 opacity-60 hover:opacity-100 transition-all  cursor-none" aria-label="Twitter">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-900 opacity-60 hover:opacity-100 transition-all  cursor-none" aria-label="Behance">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Línea separadora */}
          <div className="border-t opacity-10" style={{ borderColor: '#000000' }}></div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pt-8">
            <p className="text-xs text-gray-900 opacity-50">© 2025 Primate. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-gray-900 opacity-50 hover:opacity-100 transition-opacity cursor-none">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-900 opacity-50 hover:opacity-100 transition-opacity cursor-none">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[100] will-change-transform"
        style={{
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Borde sólido */}
        <div className="absolute w-5 h-5 rounded-full border-2 border-black mix-blend-difference" />
        {/* Interior blureado */}
        <div 
          className="absolute w-5 h-5 rounded-full bg-white/20 mix-blend-difference"
          style={{ filter: 'blur(2px)' }}
        />
      </div>
    </div>
  );
}