'use client';

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const card3VideoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <div className="min-h-screen cursor-none">
      {/* Navbar */}
      <nav className="sticky top-0 z-50">
        <div className="max-w-none mx-auto px-2.5 md:px-5 py-4">
          <div className="grid grid-cols-4 md:grid-cols-12 gap-2.5 md:gap-5">
            <div className="col-span-4 md:col-span-1"></div>
            <div className="col-span-4 md:col-span-10 bg-white/50 backdrop-blur-md border border-gray-300/80 rounded-3xl px-6 py-4">
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
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <svg className="w-6 h-6 transition-transform duration-300 group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  
                  {/* Hover Expansion Div */}
                  <div 
                    className={`absolute right-0 top-full mt-2 bg-black rounded-2xl transition-all duration-500 ease-out flex items-center justify-center overflow-hidden origin-top-right cursor-none ${
                      isHovered 
                        ? 'w-[300px] h-[80px] opacity-100' 
                        : 'w-0 h-0 opacity-0'
                    }`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
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
            <div className="col-span-4 md:col-span-1"></div>
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
            <div className="grid grid-cols-1 grid-rows-2 gap-2.5 md:gap-5 h-[500px] md:h-[700px]">
              {/* Card 3a */}
              <div 
                className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl overflow-hidden relative p-6 cursor-none"
                onMouseEnter={() => {
                  if (card3VideoRef.current) {
                    card3VideoRef.current.play();
                  }
                }}
                onMouseLeave={() => {
                  if (card3VideoRef.current) {
                    card3VideoRef.current.pause();
                    card3VideoRef.current.currentTime = 0;
                  }
                }}
              >
                <video
                  ref={card3VideoRef}
                  className="w-full h-full object-cover object-top absolute inset-0"
                  loop
                  muted
                  playsInline
                >
                  <source src="/video/card3.mp4" type="video/mp4" />
                </video>
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div></div>
                  <div>
                    <p className="text-white font-sans font-bold text-2xl uppercase">PRIMATE.COM</p>
                  </div>
                </div>
              </div>
              {/* Card 3b */}
              <div className="bg-dark-gray rounded-3xl p-6 flex flex-col justify-between">
                <div className="text-black">
                  <p className="text-3xl font-sans font-normal leading-none">PRIMATE,</p>
                  <p className="text-3xl font-sans font-normal leading-none">TECHNOLOGY</p>
                  <p className="text-3xl font-sans font-normal leading-none">& CREATIVE</p>
                  <p className="text-3xl font-sans font-normal leading-none">PRODUCTION</p>
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
            <div className="border border-gray-200/50 rounded-3xl overflow-hidden h-[500px] md:h-[700px] flex flex-col relative" style={{ backgroundColor: '#e2e3e4' }}>
              {/* Forma usando SVG externo */}
              <div className="relative m-4 md:m-6 h-[35%] md:h-[40%]">
                <Image
                  src="/morph/SVG/morph.svg"
                  alt="Paper shape"
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
      <footer className="max-w-none mx-auto px-2.5 md:px-5 mt-10 mb-8">
        <div className="bg-white/80 backdrop-blur-md border border-gray-300/80 rounded-3xl px-8 md:px-12 pt-20 md:pt-24 flex flex-col">
          <div className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-5 mb-16 md:mb-20">
            {/* Logo */}
            <div className="md:col-span-2">
              <Image
                src="/logo/logo_footer.svg"
                alt="Primate Logo"
                width={200}
                height={60}
                className="h-12 w-auto mb-3"
              />
              <p className="text-xs text-gray-900 opacity-50 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            {/* Espaciador */}
            <div className="hidden md:block md:col-span-4"></div>

            {/* Links */}
            <div className="md:col-span-6">
              <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-4">
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider mb-4 opacity-70">Company</h4>
                  <ul className="space-y-1">
                    <li><a href="#" className="text-sm text-gray-900 opacity-60 hover:opacity-100 transition-opacity cursor-none leading-relaxed block">Work</a></li>
                    <li><a href="#" className="text-sm text-gray-900 opacity-60 hover:opacity-100 transition-opacity cursor-none leading-relaxed block">Team</a></li>
                    <li><a href="#" className="text-sm text-gray-900 opacity-60 hover:opacity-100 transition-opacity cursor-none leading-relaxed block">Careers</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider mb-4 opacity-70">Contact</h4>
                  <ul className="space-y-1">
                    <li><a href="mailto:hello@primate.com" className="text-sm text-gray-900 opacity-60 hover:opacity-100 transition-opacity cursor-none leading-relaxed block">hello@primate.com</a></li>
                    <li><a href="#" className="text-sm text-gray-900 opacity-60 hover:opacity-100 transition-opacity cursor-none leading-relaxed block">Follow us</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Línea separadora */}
          <div className="border-t opacity-10" style={{ borderColor: '#000000' }}></div>

          {/* Copyright */}
          <div className="flex items-center justify-start md:justify-center pt-6 pb-6">
            <p className="text-[10px] text-gray-900 opacity-50">© 2025 Primate.</p>
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
        <div className="absolute w-5 h-5 rounded-full border border-white mix-blend-difference" />
        {/* Interior blureado */}
        <div 
          className="absolute w-5 h-5 rounded-full bg-white/20 mix-blend-difference"
          style={{ filter: 'blur(2px)' }}
        />
      </div>
    </div>
  );
}