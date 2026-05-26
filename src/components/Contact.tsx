import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || isSubmitting) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#6366f1']
      });
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setNewsletterSuccess(true);
    confetti({
      particleCount: 40,
      spread: 30,
      colors: ['#ec4899', '#a855f7']
    });
    setNewsletterEmail('');
  };

  const socials = [
    {
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      ),
      href: 'https://github.com',
      color: 'hover:text-white hover:border-white/40 hover:shadow-white/5'
    },
    {
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: 'https://twitter.com',
      color: 'hover:text-cyan-400 hover:border-cyan-400/40 hover:shadow-cyan-400/5'
    },
    {
      icon: (props: React.SVGProps<SVGSVGElement>) => <MessageSquare {...props} />,
      href: 'https://discord.com',
      color: 'hover:text-indigo-400 hover:border-indigo-400/40 hover:shadow-indigo-400/5'
    },
    {
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      href: 'https://linkedin.com',
      color: 'hover:text-blue-500 hover:border-blue-500/40 hover:shadow-blue-500/5'
    }
  ];

  return (
    <section id="contact" className="relative py-28 bg-[#030014] overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-1/2 left-[-15%] w-[450px] h-[450px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Context Brief */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs uppercase font-space font-bold tracking-widest text-cyan-400 mb-3 bg-cyan-500/10 px-3 py-1 rounded-full inline-block">
                Get In Touch
              </div>
              <h2 className="text-4xl md:text-5xl font-space font-bold leading-tight mb-4">
                Connect with our <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 text-glow-cyan">
                  AI Architects
                </span>
              </h2>
              <p className="text-slate-400 font-poppins text-sm leading-relaxed">
                Have custom compliance guidelines, specific database architectures, or custom model training requests? Send our solution experts a prompt and let's map your autonomous pipeline together.
              </p>
            </div>

            {/* Quick Contacts */}
            <div className="space-y-4 font-poppins text-sm text-slate-300">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-950/40 border border-white/5">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>support@neuroai.sh</span>
              </div>
            </div>

            {/* Social Grid */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-space font-bold tracking-wider text-slate-500">Decentral Networks</h4>
              <div className="flex gap-4">
                {socials.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-11 h-11 rounded-xl bg-slate-950/40 border border-white/5 flex items-center justify-center text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${item.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form & Newsletter */}
          <div className="lg:col-span-7 space-y-10">
            {/* Contact Form Card */}
            <div className="glass-panel rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-400/10 to-indigo-500/10 blur-2xl rounded-full" />
              
              <AnimatePresence mode="wait">
                {!submitSuccess ? (
                  <motion.form
                    key="form"
                    onSubmit={handleFormSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-space font-medium text-slate-400 uppercase tracking-wider">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Sarah Jenkins"
                          className="w-full bg-[#030014]/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/25 transition-all text-white placeholder-slate-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-space font-medium text-slate-400 uppercase tracking-wider">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="sarah@vercel.com"
                          className="w-full bg-[#030014]/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/25 transition-all text-white placeholder-slate-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-space font-medium text-slate-400 uppercase tracking-wider">Operational Prompt Message</label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Draft your query instructions or project scaling request here..."
                        className="w-full bg-[#030014]/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/25 transition-all text-white placeholder-slate-600 resize-none font-poppins"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 font-semibold text-white transition-all duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Syncing Node Core...' : 'Send Message Prompt'}
                      <Send className="w-4 h-4" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center border border-emerald-500/20 text-emerald-400 mb-2">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-space font-bold text-white">Transmission Received</h3>
                    <p className="text-slate-400 max-w-sm font-poppins text-sm leading-relaxed">
                      Our system nodes compiled your message instantly. An AI Solution architect will route an answer back to your endpoint in under 2 hours.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="text-xs font-semibold uppercase tracking-wider text-cyan-400 border border-cyan-500/20 px-4 py-2 rounded-lg hover:bg-cyan-500/10 transition-all font-space"
                    >
                      Submit New Prompt
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Interactive Newsletter Subscription */}
            <div className="glass-panel rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/5">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-space font-semibold text-white text-base flex items-center justify-center sm:justify-start gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" /> Sync Developer Digest
                </h4>
                <p className="text-xs text-slate-500 font-poppins">Get edge deployment releases and model update digests.</p>
              </div>

              <AnimatePresence mode="wait">
                {!newsletterSuccess ? (
                  <motion.form
                    key="news-form"
                    onSubmit={handleNewsletterSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-2.5 w-full sm:w-auto"
                  >
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="join@digest.sh"
                      className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/20 transition-all text-white placeholder-slate-600 w-full sm:w-48"
                    />
                    <button
                      type="submit"
                      className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/35 text-xs font-semibold text-slate-300 hover:text-white transition-all shrink-0 font-space"
                    >
                      Subscribe
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="news-success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-space font-semibold text-emerald-400 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl"
                  >
                    <CheckCircle className="w-4 h-4" /> SUBSCRIBED SUCCESSFULLY
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
