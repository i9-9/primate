import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50">
        <div className="max-w-none mx-auto px-2.5 md:px-5 py-4">
          <div className="bg-white/80 backdrop-blur-md border border-gray-200/90 rounded-3xl px-6 py-4">
            <div className="grid grid-cols-4 md:grid-cols-12 gap-2.5 md:gap-5">
              <div className="col-span-2 md:col-span-3 flex items-center">
                <Image
                  src="/assets/SVG/primate-logo.svg"
                  alt="Primate Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
              <div className="col-span-2 md:col-span-9 flex items-center justify-end">
                <button className="text-gray-600 hover:text-gray-900 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-none mx-auto px-2.5 md:px-5">
        <div className="grid grid-cols-4 md:grid-cols-12 gap-2.5 md:gap-5">
          {/* Card 1 */}
          <div className="col-span-4 md:col-span-3">
            <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl overflow-hidden h-[500px] md:h-[700px]">
              <Image
                src="/images/one.png"
                alt="One"
                width={400}
                height={700}
                className="w-full h-full object-cover scale-105"
              />
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
              <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl overflow-hidden relative p-6">
                <Image
                  src="/images/buzo.png"
                  alt="Buzo"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover absolute inset-0"
                />
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
          <div className="col-span-4 md:col-span-3 flex items-center">
            <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl overflow-hidden h-[400px] md:h-[600px] w-full">
              <video 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/video/buzo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
