import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PricingProps {
  onPlanSelect?: (plan: string) => void;
}

export default function Pricing({ onPlanSelect }: PricingProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      priceMonthly: 19,
      priceYearly: 15,
      description: 'Ideal for independent developers, prompt designers, and visual creators.',
      features: [
        '500,000 monthly tokens',
        '3 active AI agent sandboxes',
        'Standard prompt compiler',
        '2 regional edge gateways',
        'Email & Discord support'
      ],
      color: 'border-white/5',
      glow: 'rgba(255, 255, 255, 0.02)',
      isPopular: false
    },
    {
      name: 'Pro',
      priceMonthly: 49,
      priceYearly: 39,
      description: 'Best for growth startups, collaborative teams, and system automators.',
      features: [
        '5,000,000 monthly tokens',
        '15 active AI agent sandboxes',
        'Optimized prompt embedding cache',
        '12 regional edge gateways (100ms)',
        'Redis database variable syncing',
        '24/7 dedicated support'
      ],
      color: 'border-cyan-500/30',
      glow: 'rgba(6, 182, 212, 0.15)',
      isPopular: true
    },
    {
      name: 'Enterprise',
      priceMonthly: 199,
      priceYearly: 159,
      description: 'Built for enterprise scales, secure workloads, and custom core models.',
      features: [
        'Unlimited monthly tokens',
        'Unlimited active agent sandboxes',
        'Custom fine-tuned core models',
        'Global edge gateways (zero cold starts)',
        'Enterprise VPC & SOC2 compliance',
        'Dedicated Solutions Architect'
      ],
      color: 'border-white/5',
      glow: 'rgba(168, 85, 247, 0.05)',
      isPopular: false
    }
  ];

  const handleSelectPlan = (planName: string) => {
    if (planName === 'Pro') {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#6366f1', '#a855f7']
      });
    }
    if (onPlanSelect) onPlanSelect(planName);
  };

  return (
    <section id="pricing" className="relative py-28 bg-slate-950/20 bg-dot-pattern">
      {/* Visual glowing meshes */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase font-space font-bold tracking-widest text-cyan-400 mb-3 bg-cyan-500/10 px-3 py-1 rounded-full inline-block">
            Flexible Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-space font-bold leading-tight mb-4">
            Transparent Pricing for <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 text-glow-cyan">
              Teams of Any Scale
            </span>
          </h2>
          <p className="text-slate-400 font-poppins">
            Choose the computational scale that fits your workload. Upgrade or downgrade your active clusters at any time.
          </p>
        </div>

        {/* Billing Switcher Toggle */}
        <div className="flex items-center justify-center gap-4 mb-20">
          <span className={`text-sm font-medium transition-colors duration-200 ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-500'}`}>
            Monthly Billing
          </span>
          
          <button
            onClick={() => setBillingCycle((prev) => (prev === 'monthly' ? 'yearly' : 'monthly'))}
            className="w-14 h-8 rounded-full bg-slate-900 border border-white/10 p-1 flex items-center relative transition-colors duration-300 hover:border-cyan-500/30"
          >
            <motion.div
              layout
              className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-md"
              animate={{
                x: billingCycle === 'yearly' ? 22 : 0
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>

          <span className={`text-sm font-medium flex items-center gap-2 transition-colors duration-200 ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-500'}`}>
            Yearly Billing
            <span className="text-[10px] font-space font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => {
            const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as any }}
                className={`relative flex flex-col justify-between rounded-3xl p-8 bg-slate-950/40 border backdrop-blur-md transition-all duration-300 hover:border-cyan-500/20 hover:-translate-y-1.5 ${
                  plan.isPopular ? 'border-cyan-500/30 ring-1 ring-cyan-500/20' : 'border-white/5'
                }`}
                style={{
                  boxShadow: `0 0 45px -12px ${plan.glow}`
                }}
              >
                {/* Popular Glow Ring Header */}
                {plan.isPopular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 border border-cyan-500/20 shadow-lg text-[10px] font-space font-bold uppercase tracking-wider text-white">
                    <Sparkles className="w-3 h-3 text-white animate-pulse" />
                    Most Popular
                  </div>
                )}

                {/* Plan Core Info */}
                <div>
                  <h3 className="text-xl font-space font-semibold text-white mb-2">{plan.name}</h3>
                  <p className="text-xs font-poppins text-slate-400 leading-relaxed mb-6 min-h-[40px]">{plan.description}</p>
                  
                  {/* Price Block */}
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl md:text-5xl font-bold font-space text-white tracking-tight">${price}</span>
                    <span className="text-sm font-poppins text-slate-500">/ month</span>
                  </div>

                  {/* Divider line */}
                  <div className="w-full h-[1px] bg-white/5 mb-8" />

                  {/* Feature Checkmarks */}
                  <div className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-cyan-400" />
                        </div>
                        <span className="text-sm font-poppins text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button Block */}
                <div className="mt-10">
                  <button
                    onClick={() => handleSelectPlan(plan.name)}
                    className={`w-full py-4 px-6 rounded-xl font-semibold font-space text-sm tracking-wider uppercase transition-all duration-300 ${
                      plan.isPopular
                        ? 'bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/15'
                        : 'bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/20 text-slate-200'
                    }`}
                  >
                    Select {plan.name}
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
