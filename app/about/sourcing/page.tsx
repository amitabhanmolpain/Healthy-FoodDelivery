import { ShieldCheck, TestTube, Users, ScanLine } from "lucide-react"

export default function SourcingPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-brand-red py-32 text-center relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#ce1126] via-red-500 to-red-700 opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <span className="bg-white text-[#ce1126] px-6 py-2 rounded-full font-bold tracking-wider text-xs uppercase mb-8 inline-block shadow-lg">
            Transparency First
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tight">
            Know What <span className="text-red-200">You Eat</span>
          </h1>
          <p className="text-2xl text-red-100 max-w-2xl mx-auto leading-relaxed font-medium">
            We don't just say "organic." We prove it. Every meal comes with a complete chain of custody from seed to
            spoon.
          </p>
        </div>
      </div>

      {/* The Process */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto space-y-32">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row gap-20 items-center group">
            <div className="flex-1 order-2 md:order-1">
              <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center text-[#ce1126] mb-10 group-hover:bg-[#ce1126] group-hover:text-white transition-all duration-300 shadow-sm">
                <Users size={48} />
              </div>
              <h2 className="text-5xl font-black mb-8 text-gray-900">1. Direct Partner Farms</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-10">
                We contract directly with local farms, bypassing industrial wholesalers. We visit every partner farm
                quarterly to inspect soil quality and sustainable practices personally.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-gray-800 text-lg font-bold">
                  <div className="w-3 h-3 rounded-full bg-[#ce1126] shadow-lg shadow-red-500/50"></div> No Middlemen
                </li>
                <li className="flex items-center gap-4 text-gray-800 text-lg font-bold">
                  <div className="w-3 h-3 rounded-full bg-[#ce1126] shadow-lg shadow-red-500/50"></div> Fair Wages for
                  Farmers
                </li>
                <li className="flex items-center gap-4 text-gray-800 text-lg font-bold">
                  <div className="w-3 h-3 rounded-full bg-[#ce1126] shadow-lg shadow-red-500/50"></div> 100% Organic
                  Certified
                </li>
              </ul>
            </div>
            <div className="flex-1 order-1 md:order-2 relative">
              <div className="absolute inset-0 bg-[#ce1126] rounded-[3rem] rotate-6 opacity-10 group-hover:rotate-12 transition-transform duration-500"></div>
              <img
                src="/organic-farm-aerial.jpg"
                alt="Partner Farm Aerial View"
                className="relative rounded-[3rem] shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500 object-cover w-full h-[500px]"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row gap-20 items-center group">
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-[#ce1126] rounded-[3rem] -rotate-6 opacity-5 group-hover:-rotate-12 transition-transform duration-500"></div>
              <img
                src="/scientist-lab-food-test.jpg"
                alt="Lab Testing"
                className="relative rounded-[3rem] shadow-2xl -rotate-2 group-hover:rotate-0 transition-transform duration-500 object-cover w-full h-[500px]"
              />
            </div>
            <div className="flex-1">
              <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center text-[#ce1126] mb-10 group-hover:bg-[#ce1126] group-hover:text-white transition-all duration-300 shadow-sm">
                <TestTube size={48} />
              </div>
              <h2 className="text-5xl font-black mb-8 text-gray-900">2. Lab Testing Every Batch</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-10">
                Before ingredients enter our kitchen, samples are sent to our independent lab partners. We test for
                heavy metals, pesticides, and antibiotics. If it fails, we reject the entire lot.
              </p>
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-lg">
                <div className="flex justify-between text-base font-bold text-gray-500 mb-4">
                  <span>Pesticide Levels</span>
                  <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full">0.00% (Not Detected)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full w-[0%] animate-[pulse_2s_infinite]"></div>
                </div>
                <div className="mt-4 text-xs text-gray-400 font-mono text-center">LAB REPORT ID: #882-XJ-2025</div>
              </div>
            </div>
          </div>

          {/* Step 3 - Fake Scanner */}
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="flex-1 order-2 md:order-1">
              <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center text-[#ce1126] mb-10 shadow-sm">
                <ShieldCheck size={48} />
              </div>
              <h2 className="text-5xl font-black mb-8 text-gray-900">3. The PurePlate Scanner</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-10">
                Every meal you order generates a unique QR code. Use our app to scan it and instantly verify the entire
                journey of your food.
              </p>

              <div className="flex items-center gap-6 bg-gray-900 text-white p-6 rounded-3xl w-fit shadow-2xl hover:scale-105 transition-transform cursor-pointer">
                <div className="bg-white/10 p-4 rounded-2xl">
                  <ScanLine size={32} />
                </div>
                <div>
                  <div className="font-bold text-xl">Scan Now</div>
                  <div className="text-gray-400">Try it with the demo code</div>
                </div>
              </div>
            </div>

            <div className="flex-1 order-1 md:order-2 flex justify-center perspective-1000">
              <div className="relative mx-auto border-gray-900 bg-gray-900 border-[14px] rounded-[3rem] h-[650px] w-[340px] shadow-2xl flex flex-col overflow-hidden transform rotate-y-12 hover:rotate-y-0 transition-transform duration-700">
                <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>

                {/* Screen Content */}
                <div className="flex-1 bg-black relative overflow-hidden">
                  {/* Camera View Simulation */}
                  <img
                    src="/healthy-salad-bowl.png"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                    alt="Camera Feed"
                  />

                  {/* Scanner Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
                    <div className="w-72 h-72 border-2 border-[#ce1126]/80 rounded-[2rem] relative shadow-[0_0_100px_rgba(239,68,68,0.3)]">
                      {/* Corners */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#ce1126] -mt-0.5 -ml-0.5 rounded-tl-xl"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#ce1126] -mt-0.5 -mr-0.5 rounded-tr-xl"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#ce1126] -mb-0.5 -ml-0.5 rounded-bl-xl"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#ce1126] -mb-0.5 -mr-0.5 rounded-br-xl"></div>

                      {/* Scanning Line */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#ce1126] shadow-[0_0_20px_rgba(239,68,68,1)] animate-[scan_2s_ease-in-out_infinite]"></div>

                      {/* Detected Points */}
                      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-green-400 rounded-full animate-ping delay-300"></div>

                      {/* Data HUD */}
                      <div className="absolute -right-24 top-10 bg-black/80 backdrop-blur text-white text-[10px] p-2 rounded-lg font-mono border border-white/10 animate-pulse">
                        PROTEIN: 24g
                        <br />
                        CARBS: 45g
                      </div>
                    </div>

                    <div className="mt-12 bg-black/60 backdrop-blur-md px-8 py-3 rounded-full text-white text-sm font-medium border border-white/10 animate-bounce">
                      Align food within frame
                    </div>
                  </div>

                  {/* Bottom Sheet */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2rem] p-8 transform translate-y-4 hover:translate-y-0 transition-transform duration-300">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 animate-pulse">
                        <ShieldCheck size={28} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">Verified Organic</h4>
                        <p className="text-sm text-gray-500 font-medium">Analysis complete • 100% Safe</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
