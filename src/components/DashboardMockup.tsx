import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Zap, Activity, ShieldCheck, Sparkles } from 'lucide-react';

export default function DashboardMockup() {
  const [tokensSec, setTokensSec] = useState(128.5);
  const [latency, setLatency] = useState(94);
  const [cpuUsage, setCpuUsage] = useState(38);
  const [logLines, setLogLines] = useState<string[]>([
    'Initializing NeuroAI v2.4.0 Engine...',
    'System status: Fully Operational',
    'Connected to primary neuron clusters.'
  ]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Dynamic status simulations
  useEffect(() => {
    const interval = setInterval(() => {
      setTokensSec((prev) => +(prev + (Math.random() - 0.5) * 8).toFixed(1));
      setLatency((prev) => Math.floor(Math.max(75, Math.min(120, prev + (Math.random() - 0.5) * 6))));
      setCpuUsage((prev) => Math.floor(Math.max(25, Math.min(65, prev + (Math.random() - 0.5) * 8))));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // System Log Simulator
  useEffect(() => {
    const logs = [
      'Model requested: neuro-llm-ultra-v3',
      'Context token length: 84,291 tokens',
      'Active prompt caching: 94.2% HIT',
      'Optimizing prompt latency...',
      'Scaling agent workflow clusters...',
      'Auto-generating dynamic component layout...',
      'Deploying API endpoints: OK',
      'Syncing analytics with decentralized grid...'
    ];

    const interval = setInterval(() => {
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      const timestamp = new Date().toLocaleTimeString();
      setLogLines((prev) => {
        const next = [...prev, `[${timestamp}] ${randomLog}`];
        if (next.length > 5) next.shift();
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Mouse Parallax/Tilt Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const card = containerRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Divide by scale factor to keep rotations subtle (max 8 degrees)
    setRotateX(-y / (box.height / 8));
    setRotateY(x / (box.width / 8));
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 md:px-0">
      {/* Intense glow background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-3/5 bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Main 3D Tilt Container */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 1000,
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full bg-[#080718]/60 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ease-out"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/40">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="ml-4 text-xs font-mono text-slate-400 tracking-wider">neuro-console.sh</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-space font-medium text-cyan-400 uppercase tracking-widest">Active Core</span>
          </div>
        </div>

        {/* Dashboard Grid Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visual Display */}
          <div className="lg:col-span-2 space-y-6" style={{ transform: 'translateZ(20px)' }}>
            {/* Charts Simulator */}
            <div className="bg-slate-950/50 border border-white/5 rounded-xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-space font-medium text-slate-300">Inference Bandwidth</h4>
                  <p className="text-xs text-slate-500">Live operational data flow</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <Activity className="w-3.5 h-3.5" /> Core A
                  </span>
                  <span className="flex items-center gap-1.5 text-indigo-400">
                    <Zap className="w-3.5 h-3.5" /> Core B
                  </span>
                </div>
              </div>

              {/* Sparkline Graphic (SVG track) */}
              <div className="h-44 flex items-end">
                <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="cyan-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="indigo-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Waveforms */}
                  <motion.path
                    d="M0,80 Q30,120 60,60 T120,90 T180,40 T240,110 T300,50 T360,70 L400,90 L400,150 L0,150 Z"
                    fill="url(#cyan-gradient)"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                  />
                  <motion.path
                    d="M0,110 Q40,50 80,90 T160,30 T240,80 T320,60 T400,40 L400,150 L0,150 Z"
                    fill="url(#indigo-gradient)"
                    stroke="#6366f1"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, ease: 'easeOut' }}
                  />
                </svg>
              </div>
            </div>

            {/* Terminal Console */}
            <div className="bg-slate-950/70 border border-white/5 rounded-xl p-5 font-mono text-xs text-slate-300 space-y-2.5 shadow-inner">
              <div className="flex items-center justify-between text-slate-500 border-b border-white/5 pb-2 mb-2">
                <span className="flex items-center gap-2"><Terminal className="w-3.5 h-3.5" /> Output Logs</span>
                <span>tty1</span>
              </div>
              <div className="space-y-1.5 h-28 overflow-hidden select-none">
                {logLines.map((line, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-start gap-2 ${idx === logLines.length - 1 ? 'text-cyan-400' : 'text-slate-400'}`}
                  >
                    <span className="text-cyan-500/60 select-none">&gt;</span>
                    <span>{line}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Metrics Column */}
          <div className="space-y-6" style={{ transform: 'translateZ(10px)' }}>
            {/* Metric 1 */}
            <div className="bg-slate-950/40 border border-white/5 rounded-xl p-5 flex items-center justify-between hover:border-cyan-500/20 transition-colors duration-300">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-space tracking-widest text-slate-400">Tokens Processed</span>
                <div className="text-2xl font-bold font-space">{tokensSec} T/s</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-slate-950/40 border border-white/5 rounded-xl p-5 flex items-center justify-between hover:border-indigo-500/20 transition-colors duration-300">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-space tracking-widest text-slate-400">Network Latency</span>
                <div className="text-2xl font-bold font-space">{latency} ms</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-indigo-400 animate-bounce" />
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-slate-950/40 border border-white/5 rounded-xl p-5 flex items-center justify-between hover:border-purple-500/20 transition-colors duration-300">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-space tracking-widest text-slate-400">Security Cluster</span>
                <div className="text-2xl font-bold font-space text-emerald-400">AES-256</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
            </div>

            {/* Active Task Simulator Card */}
            <div className="bg-gradient-to-br from-indigo-950/30 to-purple-950/30 border border-indigo-500/20 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 blur-2xl rounded-full" />
              <h5 className="font-space font-medium text-slate-200 text-sm mb-2">Neuro-Engine Load</h5>
              <div className="w-full bg-slate-900 rounded-full h-1.5 mb-3 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-1.5 rounded-full"
                  style={{ width: `${cpuUsage}%` }}
                  transition={{ ease: 'easeInOut' }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>Memory usage: 4.8GB</span>
                <span className="text-indigo-300">{cpuUsage}% CPU</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Decorative Cards */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -top-10 -left-6 md:-left-16 bg-[#030014]/80 backdrop-blur-md border border-cyan-500/30 shadow-2xl p-4 rounded-xl flex items-center gap-3 w-48 pointer-events-none"
      >
        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center font-bold text-cyan-400">⚡</div>
        <div>
          <div className="text-[10px] text-slate-400">Response Speed</div>
          <div className="text-sm font-bold text-white font-space">8.4x Faster</div>
        </div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5
        }}
        className="absolute -bottom-10 -right-6 md:-right-16 bg-[#030014]/80 backdrop-blur-md border border-purple-500/30 shadow-2xl p-4 rounded-xl flex items-center gap-3 w-52 pointer-events-none"
      >
        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center font-bold text-purple-400">🤖</div>
        <div>
          <div className="text-[10px] text-slate-400">Autonomous Tasks</div>
          <div className="text-sm font-bold text-white font-space">99.8% Efficiency</div>
        </div>
      </motion.div>
    </div>
  );
}
