import { Cpu } from 'lucide-react';

export default function Footer() {
  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'Core Engine', href: '#features' },
        { name: 'Console API', href: '#solutions' },
        { name: 'Custom Models', href: '#features' },
        { name: 'System Pricing', href: '#pricing' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'Security Audit', href: '#' },
        { name: 'Decentral Network', href: '#' },
        { name: 'Changelog V2.4', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About NeuroAI', href: '#' },
        { name: 'Press Kit', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Contact Sales', href: '#contact' }
      ]
    }
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="relative bg-[#02000d] border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Footer Ambient Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[150px] bg-gradient-to-t from-cyan-500/5 to-transparent blur-[70px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Grid Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12 pb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-3 space-y-6">
            <a href="#" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300">
                <Cpu className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-space text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Neuro<span className="text-cyan-400">AI</span>
              </span>
            </a>
            <p className="text-slate-400 font-poppins text-xs leading-relaxed max-w-sm">
              Next-generation autonomous AI platform hosting custom models, event-driven integrations, and low-latency API compilers at global edge networks.
            </p>
            
            {/* System Status Node */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900 border border-white/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-space font-semibold tracking-wider text-slate-400 uppercase">
                System Status: <span className="text-emerald-400">OPERATIONAL</span>
              </span>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((col, index) => (
            <div key={index} className="lg:col-span-1 space-y-4">
              <h4 className="text-xs uppercase font-space font-bold tracking-wider text-white">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-xs font-poppins text-slate-400">
                {col.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className="hover:text-cyan-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Separator Gradient Strip */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom copyright & network socials */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-poppins text-slate-500">
          <div>
            © {new Date().getFullYear()} NeuroAI Inc. All rights reserved. Secure cryptographic grids active.
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Security Registry</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
