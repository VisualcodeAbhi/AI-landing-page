import { motion } from 'framer-motion';
import { Link2, Sparkles, Zap, ArrowDown } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Connect Your Workflow',
      description: 'Integrate your datasets, third-party databases, and app repositories in under 3 minutes. Our secure edge nodes encrypt and stream data streams instantly.',
      icon: Link2,
      color: 'from-cyan-500 to-blue-500',
      glow: 'rgba(6, 182, 212, 0.25)'
    },
    {
      step: '02',
      title: 'Train AI System',
      description: 'Define prompt parameters, index custom knowledge structures, and establish security constraints. Our compiler optimizes the pipeline for ultra-low latency.',
      icon: Sparkles,
      color: 'from-indigo-500 to-purple-500',
      glow: 'rgba(99, 102, 241, 0.25)'
    },
    {
      step: '03',
      title: 'Automate Everything',
      description: 'Sit back as NeuroAI routes incoming queries, resolves custom scripts, and manages pipelines autonomously with 99.9% uptime and operational reliability.',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      glow: 'rgba(168, 85, 247, 0.25)'
    }
  ];

  return (
    <section className="relative py-28 bg-slate-950/20 overflow-hidden bg-grid-pattern">
      {/* Background visual indicators */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <div className="text-xs uppercase font-space font-bold tracking-widest text-cyan-400 mb-3 bg-cyan-500/10 px-3 py-1 rounded-full inline-block">
            Seamless Setup
          </div>
          <h2 className="text-4xl md:text-5xl font-space font-bold leading-tight">
            Deploy Automation in <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 text-glow-cyan">
              Three Simple Steps
            </span>
          </h2>
        </div>

        {/* Steps Timeline Grid */}
        <div className="relative mt-12">
          {/* Vertical Glowing Line (Visible on Desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-gradient-to-b from-cyan-500 via-indigo-500 to-purple-500 opacity-20 hidden lg:block" />
          
          <div className="space-y-16 lg:space-y-28">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Step visual Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    className="w-full lg:w-1/2 flex justify-end"
                  >
                    <div 
                      className="w-full max-w-xl rounded-2xl p-8 bg-slate-950/40 border border-white/5 backdrop-blur-md relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-300"
                      style={{
                        boxShadow: `0 0 40px -15px ${item.glow}`
                      }}
                    >
                      {/* Floating backdrop glow */}
                      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} blur-2xl rounded-full opacity-10 group-hover:opacity-20 transition-opacity`} />

                      {/* Header row */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} p-0.5 flex items-center justify-center`}>
                          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <span className={`text-4xl font-space font-bold bg-clip-text text-transparent bg-gradient-to-br ${item.color} opacity-40 font-mono`}>
                          {item.step}
                        </span>
                      </div>

                      {/* Title & Desc */}
                      <h3 className="text-2xl font-space font-semibold text-white mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm font-poppins text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Center Node (Glow Circle) */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
                    <motion.div
                      whileInView={{ scale: [0.8, 1.1, 1], opacity: [0.4, 1] }}
                      viewport={{ once: true }}
                      className={`w-12 h-12 rounded-full bg-slate-950 border-2 border-indigo-500/40 flex items-center justify-center shadow-lg group`}
                      style={{
                        boxShadow: `0 0 20px ${item.glow}`
                      }}
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 animate-pulse" />
                    </motion.div>
                  </div>

                  {/* Spacer for standard desktop grid balance */}
                  <div className="w-full lg:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA direction indicator */}
        <div className="mt-20 flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-slate-500 cursor-pointer hover:text-cyan-400 transition-colors"
            onClick={() => {
              const pricing = document.querySelector('#pricing');
              pricing?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest font-space">Inspect Pricing Plans</span>
            <ArrowDown className="w-4 h-4 text-cyan-400" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
