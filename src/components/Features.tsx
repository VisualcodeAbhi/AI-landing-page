import { motion } from 'framer-motion';
import { MessageSquare, Zap, PenTool, BarChart3, Users, Terminal } from 'lucide-react';

export default function Features() {
  const featuresList = [
    {
      title: 'AI Chat Assistant',
      description: 'Engage with custom-trained LLM models that adapt to your brand voice and internal documentation seamlessly.',
      icon: MessageSquare,
      color: 'from-cyan-500 to-blue-500',
      shadow: 'rgba(6, 182, 212, 0.15)'
    },
    {
      title: 'Smart Automation',
      description: 'Build event-driven automation chains triggered by user activity, webhooks, or external database events.',
      icon: Zap,
      color: 'from-amber-500 to-orange-500',
      shadow: 'rgba(245, 158, 11, 0.15)'
    },
    {
      title: 'AI Content Generator',
      description: 'Generate production-ready copy, social campaigns, structural drafts, and clean source code in seconds.',
      icon: PenTool,
      color: 'from-pink-500 to-purple-500',
      shadow: 'rgba(236, 72, 153, 0.15)'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Monitor token bandwidth, inference latency, compute budget savings, and operational cost projections in real-time.',
      icon: BarChart3,
      color: 'from-indigo-500 to-cyan-500',
      shadow: 'rgba(99, 102, 241, 0.15)'
    },
    {
      title: 'Team Collaboration',
      description: 'Share prompts, custom parameters, operational endpoints, and secure database sandboxes with your team.',
      icon: Users,
      color: 'from-emerald-500 to-teal-500',
      shadow: 'rgba(16, 185, 129, 0.15)'
    },
    {
      title: 'API Integration',
      description: 'Deploy low-latency AI endpoints across global edge networks, serving queries in under 120 milliseconds.',
      icon: Terminal,
      color: 'from-rose-500 to-pink-500',
      shadow: 'rgba(244, 63, 94, 0.15)'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <section id="features" className="relative py-28 bg-slate-950/20 bg-dot-pattern">
      {/* Background ambient accents */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 left-0 w-[450px] h-[450px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase font-space font-bold tracking-widest text-cyan-400 mb-3 bg-cyan-500/10 px-3 py-1 rounded-full inline-block"
          >
            Core Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-space font-bold leading-tight"
          >
            Empower your team with <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 text-glow-cyan">
              Autonomous Intelligence
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-slate-400 font-poppins"
          >
            Everything you need to orchestrate agentic workflows, generate context-aware outputs, and integrate deep learning models directly into your business shell.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuresList.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative rounded-2xl p-8 bg-slate-950/40 border border-white/5 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/20 hover:-translate-y-1.5 overflow-hidden flex flex-col"
              >
                {/* Floating radial glow effect under the card */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                  style={{
                    background: `radial-gradient(150px circle at 50% 20px, ${feature.shadow}, transparent 60%)`
                  }}
                />

                {/* Animated top-border gradient strip */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Icon Circle */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feature.color} p-0.5 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-space font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-sm font-poppins text-slate-400 leading-relaxed flex-grow">
                  {feature.description}
                </p>

                {/* Bottom interactive indicator */}
                <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-cyan-400 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  <span>Learn more</span>
                  <span>→</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
