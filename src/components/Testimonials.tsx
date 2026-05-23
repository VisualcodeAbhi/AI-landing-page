import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'VP of Product at Vercel',
      text: 'NeuroAI completely transformed our pipeline efficiency. We reduced our API inference latency by 45% and saved over 100 hours of development engineering in our first month alone.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120',
      borderGlow: 'rgba(6, 182, 212, 0.2)'
    },
    {
      name: 'Dr. Marcus Vance',
      role: 'Lead AI Engineer at Anthropic',
      text: 'The glassmorphic terminal sandbox is a masterpiece. Being able to visualize streaming LLM tokens, adjust variables, and test edge resolvers dynamically has unified our team workflow.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
      borderGlow: 'rgba(99, 102, 241, 0.2)'
    },
    {
      name: 'Elena Rostova',
      role: 'Founder at Linear Sync',
      text: 'Creating custom autonomous automation chains used to require months of custom script development. With NeuroAI, we synced our entire data hub and trained system nodes in 3 hours flat.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120',
      borderGlow: 'rgba(168, 85, 247, 0.2)'
    },
    {
      name: 'David Chen',
      role: 'Chief Architect at Retool',
      text: 'Outstanding dev-centric architecture. Deploying low-latency AI endpoints across regional edge clouds without custom backend overhead feels like absolute magic. Superb developer DX.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120',
      borderGlow: 'rgba(236, 72, 153, 0.2)'
    },
    {
      name: 'Tariq Al-Mansoor',
      role: 'Head of Engineering at Dub.co',
      text: 'We index massive relational sets and stream prompts constantly. NeuroAIs caching hitting 94.2% cut our direct inference provider costs in half. The best investment we made this fiscal year.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120',
      borderGlow: 'rgba(16, 185, 129, 0.2)'
    }
  ];

  // Double testimonials array for infinite marquee looping
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="relative py-28 bg-[#030014] overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-1/2 left-[-10%] w-[450px] h-[450px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-[-10%] w-[450px] h-[450px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="text-xs uppercase font-space font-bold tracking-widest text-cyan-400 mb-3 bg-cyan-500/10 px-3 py-1 rounded-full inline-block">
            Client Success
          </div>
          <h2 className="text-4xl md:text-5xl font-space font-bold leading-tight">
            Trusted by Leaders at <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 text-glow-cyan">
              World-Class Tech Startups
            </span>
          </h2>
        </div>
      </div>

      {/* Infinite Horizontal Scroll Container */}
      <div className="flex w-full overflow-hidden relative py-6 mask-fade-edges">
        {/* Ambient fade filters on sides of marquee */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030014] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030014] to-transparent z-20 pointer-events-none" />

        <div
          className="animate-marquee hover:[animation-play-state:paused] flex gap-8 whitespace-nowrap min-w-full"
        >
          {marqueeItems.map((testimonial, idx) => (
            <div
              key={idx}
              className="inline-block w-[380px] md:w-[420px] bg-slate-950/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:border-cyan-500/25 shrink-0"
              style={{
                boxShadow: `0 0 30px -10px ${testimonial.borderGlow}`,
                whiteSpace: 'normal'
              }}
            >
              {/* Star Rating Row */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text review */}
              <p className="text-slate-300 text-sm font-poppins leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Profile Bio */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-11 h-11 rounded-full object-cover border border-white/10"
                />
                <div>
                  <h4 className="text-sm font-space font-semibold text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs font-poppins text-slate-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
