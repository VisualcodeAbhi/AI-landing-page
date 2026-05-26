import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, BarChart2, MessageSquare, Sparkles, Database, Check, Clock, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChatMessage {
  sender: 'user' | 'neuro';
  text: string;
  isCode?: boolean;
}

export default function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState<'chat' | 'analytics' | 'variables'>('chat');
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  
  // Real Gemini states
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('neuro_gemini_api_key') || (import.meta.env.VITE_GEMINI_API_KEY as string) || '');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [modelType, setModelType] = useState(() => localStorage.getItem('neuro_gemini_model') || 'gemini-2.0-flash');
  const [temperature, setTemperature] = useState(0.2);

  // Dynamic metrics
  const [savings, setSavings] = useState(4824.50);
  const [activeAgents, setActiveAgents] = useState(14);
  const [efficiency, setEfficiency] = useState(94.2);

  // Chat stack
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const isLive = !!localStorage.getItem('neuro_gemini_api_key') || !!import.meta.env.VITE_GEMINI_API_KEY;
    return [
      { 
        sender: 'neuro', 
        text: isLive 
          ? "🤖 **Gemini Core Connection Established.**\n\nWelcome to NeuroAI Live. I am actively bound to your custom prompt layers and the Google Gemini API. What unscripted task would you like to solve today?" 
          : "Welcome to NeuroAI Core. I am synced with your data layers. What system would you like to automate today? (Demo Mode - Connect a Gemini Key in Prompt Variables to activate live AI)" 
      }
    ];
  });

  const presetPrompts = [
    "Draft a GraphQL resolver for user profiles",
    "Analyze pipeline compute bottlenecks",
    "Orchestrate marketing trigger workflows"
  ];

  // Auto-increment savings (makes dashboard feel alive!)
  useEffect(() => {
    const interval = setInterval(() => {
      setSavings((prev) => prev + Number((Math.random() * 0.08).toFixed(2)));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    // 1. Add User Message
    const userMsg: ChatMessage = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    const savedKey = localStorage.getItem('neuro_gemini_api_key') || (import.meta.env.VITE_GEMINI_API_KEY as string);

    if (savedKey) {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(savedKey);
        
        const model = genAI.getGenerativeModel({
          model: modelType,
          generationConfig: {
            temperature: temperature,
          },
          systemInstruction: "You are the core neural model of NeuroAI, a premium next-generation AI automation platform. Respond with high-intelligence, technical efficiency, and structure. Format code snippets in clean markdown. Always maintain the persona of an advanced computational core."
        });

        // Map messages history to Gemini format: role: "user" | "model", parts: [{ text: "..." }]
        // Exclude initial greeting and error messages
        const history = messages
          .filter(msg => !msg.text.includes('Connection Failure') && !msg.text.includes('Welcome to NeuroAI'))
          .map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          }));

        const chatSession = model.startChat({
          history: history.length > 10 ? history.slice(-10) : history, // Keep history under 10 messages for performance
        });

        const result = await chatSession.sendMessage(text);
        const responseText = await result.response.text();
        const isCode = responseText.includes('```');

        setMessages((prev) => [...prev, { sender: 'neuro', text: responseText, isCode }]);
        setIsTyping(false);

        // Success burst
        confetti({
          particleCount: 50,
          spread: 45,
          colors: ['#06b6d4', '#6366f1']
        });

        // Dynamically increment platform counters
        setActiveAgents((prev) => prev + 1);
        setEfficiency((prev) => Math.min(99.9, +(prev + Math.random() * 0.4).toFixed(1)));

      } catch (error: unknown) {
        console.error("Gemini API error:", error);
        const errMessage = error instanceof Error ? error.message : String(error);
        setMessages((prev) => [...prev, {
          sender: 'neuro',
          text: `❌ **Core Connection Failure:**\n\nFailed to authenticate with Gemini API layers.\n\n**Details**: ${errMessage}`
        }]);
        setIsTyping(false);
      }
    } else {
      // Simulate response
      setTimeout(() => {
        const input = text.toLowerCase();
        let aiText = '';
        let isCode = false;

        if (input.includes('hi') || input.includes('hello') || input.includes('hey') || input.includes('greeting') || input.includes('yo')) {
          aiText = "🤖 **System Sync Established.**\n\nHello! Welcome to the **NeuroAI Control Console**. I am your primary computational core. How can I assist you with building autonomous workflows, testing edge APIs, or indexing model cache nodes today?\n\n*Try asking about \"pricing\", \"features\", or \"integrations\" to examine my subsystems!*";
        } else if (input.includes('pricing') || input.includes('price') || input.includes('cost') || input.includes('plan') || input.includes('monthly') || input.includes('starter') || input.includes('pro') || input.includes('enterprise')) {
          aiText = "💳 **NeuroAI Computation Pricing & Plans:**\n\nWe offer three scalable computing tiers, tailored to your platform workload:\n\n1. **Starter ($19/mo)**: Ideal for visual creators and independent developers. Includes 500k monthly tokens and 3 active agent sandboxes.\n2. **Pro ($49/mo - RECOMMENDED)**: Perfect for growing startups. Includes 5,000,000 monthly tokens, optimized embeddings cache, 12 edge gateways, and Redis variable syncing.\n3. **Enterprise ($199/mo)**: Engineered for large-scale operations. Includes unlimited tokens, custom core model fine-tuning, and dedicated solutions SLA support.\n\n*Tip: Toggle annual billing inside our Pricing Section below to save 20% immediately!*";
        } else if (input.includes('features') || input.includes('capabilities') || input.includes('assistant')) {
          aiText = "🛠️ **NeuroAI Platform Core Capabilities:**\n\nOur decentralized network provides high-efficiency developer tools:\n\n*   **AI Chat Assistant**: Stream custom prompts through context-aware document directories.\n*   **Smart Automation**: Trigger event-driven logic workflows without complex backend setups.\n*   **Edge APIs**: Compile and deploy ultra-low latency gateway relays globally (sub-120ms execution).\n*   **Live Analytics**: Audit inference speeds, token cache ratios, and compute savings dynamically.";
        } else if (input.includes('ai') || input.includes('intelligence') || input.includes('llm') || input.includes('model') || input.includes('temperature')) {
          aiText = "🧠 **Core Models & Inference Settings:**\n\nNeuroAI supports direct connection with state-of-the-art LLM architectures like **Gemini 1.5/2.5 Flash** and **Pro** cores.\n\nTo fine-tune your parameters, open the **Prompt Variables** tab in this console:\n*   **Model Temperature**: Slide from 0.0 (precise logic/code compiling) to 1.0 (creative dialogue).\n*   **Credentials**: Connect your Google Gemini API Key to unlock real-world unscripted AI chat sessions!";
        } else if (input.includes('automation') || input.includes('automate') || input.includes('workflow') || input.includes('pipeline') || input.includes('node')) {
          aiText = "⚡ **Autonomous Workflow Pipelines:**\n\nWith NeuroAI, you can set up edge automation triggers instantly:\n\n1. **Connect Triggers**: Detect database commits, webhooks, or server events.\n2. **Process Prompt Layers**: Embed contextual document rules and model schemas.\n3. **Deploy Webhooks**: Automatically dispatch custom code responses, send email campaigns, or run system scripts in under 200ms.";
        } else if (input.includes('dashboard') || input.includes('console') || input.includes('analytics') || input.includes('metrics') || input.includes('logs')) {
          aiText = "📊 **Control Console Guide:**\n\nYou are currently inside our high-fidelity console showcase! Switch between active dashboard views using the sidebar tabs:\n\n*   **AI Assistant**: Test generative models and review automated script returns.\n*   **Live Pipelines**: Track AVG latency (simulating ~84ms), request throughputs, and cache ratios.\n*   **Prompt Variables**: Mask your API Key, switch computational models, and adjust temperature slide scales.";
        } else if (input.includes('integrate') || input.includes('integration') || input.includes('api') || input.includes('database') || input.includes('key')) {
          aiText = "🔌 **Developer API & Database Integrations:**\n\nConnect your stack directly into our neural edge framework:\n\n*   **Gateways**: Global edge compile paths serving queries with zero cold starts.\n*   **Variables Cache**: Store parameters securely using our integrated Redis syncing layers.\n*   **Platforms**: Continuous deploy connections supporting GitHub repositories, Vercel, and custom Docker servers.";
        } else if (input.includes('support') || input.includes('help') || input.includes('doc') || input.includes('email') || input.includes('discord')) {
          aiText = "📞 **NeuroAI Support & Resources:**\n\nWe provide 24/7 dedicated assistance to scale your system integrations:\n\n*   **Support Email**: Send queries to **support@neuroai.sh** (response latency under 2 hours).\n*   **Developer Center**: Review extensive documentation, prompt templates, and security audits.\n*   **Community**: Connect with other creators in our active Discord node (link in the Contact section).";
        } else if (input.includes('graphql') || input.includes('resolver')) {
          aiText = `\`\`\`javascript
// GraphQL Resolver for User Profiles
const userProfileResolver = {
  Query: {
    getUserProfile: async (_, { id }, { dataSources }) => {
      try {
        const cached = await redis.get(\`user:\${id}\`);
        if (cached) return JSON.parse(cached);
        
        const profile = await dataSources.db.fetchProfile(id);
        await redis.set(\`user:\${id}\`, JSON.stringify(profile), 'EX', 3600);
        return profile;
      } catch (err) {
        throw new Error("Failed to resolve user profile path: " + err.message);
      }
    }
  }
};
export default userProfileResolver;
\`\`\``;
          isCode = true;
        } else if (input.includes('bottleneck') || input.includes('pipeline')) {
          aiText = "🔍 **Bottleneck Audit Complete:**\n\n1. Found **34ms** query choke point in `orders-db-read` cluster.\n2. Proposed Fix: Establish composite index on `[user_id, status]` key matrices.\n3. Latency expected to drop to **4ms** (approx 8.5x increase in operational velocity).";
        } else {
          const bt = '`';
          aiText = `✨ **Autonomous Pipeline Drafted:**\n\nI have registered your prompt target: ${bt}"${text}"${bt}.\n\nTo execute this request live against real generative databases, please connect your Google Gemini API Key in the **Prompt Variables** tab. Otherwise, type **"features"** or **"pricing"** to explore the console capabilities!`;
        }

        setMessages((prev) => [...prev, { sender: 'neuro', text: aiText, isCode }]);
        setIsTyping(false);
        
        confetti({
          particleCount: 50,
          spread: 40,
          origin: { x: 0.75, y: 0.6 },
          colors: ['#06b6d4', '#a855f7']
        });

        setActiveAgents((prev) => prev + 1);
        setEfficiency((prev) => Math.min(99.9, +(prev + Math.random() * 0.4).toFixed(1)));
      }, 1500);
    }
  };

  return (
    <section id="solutions" className="relative py-28 bg-[#030014] overflow-hidden">
      {/* Background neon blurs */}
      <div className="absolute top-1/4 left-[-15%] w-[550px] h-[550px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-15%] w-[550px] h-[550px] bg-purple-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase font-space font-bold tracking-widest text-cyan-400 mb-3 bg-cyan-500/10 px-3 py-1 rounded-full inline-block">
              Interactive Console
            </div>
            <h2 className="text-4xl md:text-5xl font-space font-bold leading-tight">
              Test-drive the future <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 text-glow-cyan">
                in Real Time
              </span>
            </h2>
          </div>
          <p className="text-slate-400 font-poppins max-w-md md:text-right">
            Click a quick preset or type directly in our terminal frame to see how NeuroAI resolves agent workflows, compiles endpoints, and optimizes pipelines autonomously.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white/10 grid grid-cols-1 lg:grid-cols-4 min-h-[620px]">
          
          {/* Left Column: Console Sidebar Navigation */}
          <div className="lg:col-span-1 border-r border-white/10 p-6 flex flex-col gap-6 bg-slate-950/40">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-space font-semibold text-sm tracking-wider text-slate-300">NEUROAI CONSOLE</span>
            </div>

            {/* Sidebar Tabs */}
            <div className="flex flex-col gap-2 flex-grow">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-space transition-all duration-300 ${
                  activeTab === 'chat'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/10 border border-cyan-500/30 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                AI Assistant
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-space transition-all duration-300 ${
                  activeTab === 'analytics'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/10 border border-cyan-500/30 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <BarChart2 className="w-4 h-4 text-indigo-400" />
                Live Pipelines
              </button>
              <button
                onClick={() => setActiveTab('variables')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-space transition-all duration-300 ${
                  activeTab === 'variables'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/10 border border-cyan-500/30 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Database className="w-4 h-4 text-purple-400" />
                Prompt Variables
              </button>
            </div>

            {/* System Status Foot */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">API Status</span>
                <span className="text-emerald-400 font-bold">100% UP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Decentral Grid</span>
                <span className="text-cyan-400">4,912 Nodes</span>
              </div>
            </div>
          </div>

          {/* Right Area: Showcase Panel */}
          <div className="lg:col-span-3 flex flex-col justify-between bg-slate-950/20 min-h-[500px]">
            
            {/* Top Dashboard Banner - KPI Metric Badges */}
            <div className="grid grid-cols-3 border-b border-white/10 py-5 bg-slate-950/20 text-center">
              <div className="border-r border-white/10 px-4">
                <div className="text-[10px] uppercase font-space tracking-widest text-slate-500 mb-1">Savings Simulated</div>
                <div className="text-lg md:text-xl font-bold text-emerald-400 font-space tracking-tight">
                  ${savings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div className="border-r border-white/10 px-4">
                <div className="text-[10px] uppercase font-space tracking-widest text-slate-500 mb-1">Active AI Agents</div>
                <div className="text-lg md:text-xl font-bold text-white font-space">
                  {activeAgents} <span className="text-xs text-slate-500">Clusters</span>
                </div>
              </div>
              <div className="px-4">
                <div className="text-[10px] uppercase font-space tracking-widest text-slate-500 mb-1">Workflow Efficiency</div>
                <div className="text-lg md:text-xl font-bold text-cyan-400 font-space">
                  {efficiency}%
                </div>
              </div>
            </div>

            {/* Tab: Chat Interface */}
            {activeTab === 'chat' && (
              <div className="flex-grow flex flex-col justify-between overflow-hidden">
                {/* Chat Panel Box */}
                <div className="flex-grow p-6 overflow-y-auto max-h-[380px] space-y-4 no-scrollbar">
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'neuro' && (
                        <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                          <Cpu className="w-4 h-4 animate-pulse" />
                        </div>
                      )}
                      
                      <div
                        className={`max-w-[78%] rounded-2xl p-4 text-sm leading-relaxed shadow-lg ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white rounded-br-none'
                            : 'bg-slate-900/80 border border-cyan-500/20 text-slate-100 rounded-bl-none font-poppins shadow-cyan-500/5'
                        }`}
                      >
                        {msg.isCode ? (
                          <pre className="font-mono text-xs overflow-x-auto p-3 rounded-lg bg-slate-950/90 text-cyan-300 select-all leading-normal border border-white/5">
                            <code>{msg.text.replace(/```javascript|```/g, '')}</code>
                          </pre>
                        ) : (
                          <div className="whitespace-pre-line leading-relaxed">
                            {msg.text}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 justify-start"
                      >
                        <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                          <Cpu className="w-4 h-4 animate-pulse" />
                        </div>
                        
                        <div className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl rounded-bl-none p-4 flex items-center gap-1.5 shadow-lg shadow-cyan-500/5">
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div ref={chatBottomRef} />
                </div>

                {/* Bottom Actions Frame */}
                <div className="p-6 border-t border-white/10 bg-slate-950/40 space-y-4">
                  {/* Preset helpers */}
                  <div className="flex flex-wrap gap-2">
                    {presetPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(prompt)}
                        className="text-[11px] font-space font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-white/5 hover:border-cyan-500/20 px-3 py-1.5 rounded-lg transition-all duration-200"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>

                  {/* Input form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage(chatInput);
                    }}
                    className="flex gap-3"
                  >
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Prompt NeuroAI Core..."
                      className="flex-grow bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/30 transition-all font-poppins text-white placeholder-slate-500 shadow-[0_0_20px_rgba(6,182,212,0.02)] focus:shadow-[0_0_25px_rgba(6,182,212,0.12)]"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={isTyping || !chatInput.trim()}
                      className="p-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </form>
                </div>
              </div>
            )}

            {/* Tab: Live Analytics Charts */}
            {activeTab === 'analytics' && (
              <div className="flex-grow p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-space font-medium text-slate-200">Autonomous Workflow Latency</h4>
                      <p className="text-xs text-slate-500">Latency analytics over global nodes</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs bg-slate-900 px-3 py-1.5 rounded-lg border border-white/5 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" /> Auto-syncing
                    </div>
                  </div>

                  {/* Dynamic Graphic Lines */}
                  <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 h-48 flex items-end">
                    <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                      <path
                        d="M0,120 Q50,70 100,110 T200,40 T300,90 T400,30 T500,60"
                        fill="none"
                        stroke="url(#cyan-flow)"
                        strokeWidth="3"
                      />
                      <defs>
                        <linearGradient id="cyan-flow" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-center">
                    <div className="text-[10px] text-slate-500 font-space mb-1">AVG RESPONSE</div>
                    <div className="text-base font-bold font-space text-white">84.2 ms</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-center">
                    <div className="text-[10px] text-slate-500 font-space mb-1">THROUGHPUT</div>
                    <div className="text-base font-bold font-space text-white">12.4k req/m</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-center">
                    <div className="text-[10px] text-slate-500 font-space mb-1">CACHE RATIO</div>
                    <div className="text-base font-bold font-space text-cyan-400">92.4%</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-center">
                    <div className="text-[10px] text-slate-500 font-space mb-1">SAVINGS MULTIPLIER</div>
                    <div className="text-base font-bold font-space text-emerald-400">12.5x</div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Prompt Variables */}
            {activeTab === 'variables' && (
              <div className="flex-grow p-6 flex flex-col justify-between overflow-y-auto no-scrollbar max-h-[380px]">
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <h4 className="text-sm font-space font-medium text-slate-200">Gemini Platform Settings</h4>
                    <p className="text-xs text-slate-500">Bridge local sandboxes with real Google Gemini models</p>
                  </div>

                  {/* API Key Vault */}
                  <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs font-semibold text-slate-300">Google Gemini API Key</div>
                        <div className="text-[10px] text-slate-500">Stored safely in your browser localStorage</div>
                      </div>
                      {apiKey ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/25">
                          <Check className="w-3.5 h-3.5" /> LIVE CORE ACTIVE
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/25">
                          SIMULATION MODE
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={apiKey ? '••••••••••••••••••••••••••••' : apiKeyInput}
                        disabled={!!apiKey}
                        onChange={(e) => setApiKeyInput(e.target.value)}
                        placeholder="AIzaSy..."
                        className="flex-grow bg-[#030014]/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500/30 transition-all font-mono disabled:opacity-60"
                      />
                      {apiKey ? (
                        <button
                          onClick={() => {
                            localStorage.removeItem('neuro_gemini_api_key');
                            setApiKey('');
                            setApiKeyInput('');
                          }}
                          className="px-3.5 py-2.5 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/20 text-rose-400 font-space font-semibold text-xs rounded-xl transition-all"
                        >
                          Revoke
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (!apiKeyInput.trim()) return;
                            localStorage.setItem('neuro_gemini_api_key', apiKeyInput.trim());
                            setApiKey(apiKeyInput.trim());
                            confetti({
                              particleCount: 40,
                              spread: 30,
                              colors: ['#06b6d4', '#6366f1']
                            });
                          }}
                          className="px-3.5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-space font-semibold text-xs rounded-xl transition-all"
                        >
                          Sync Key
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Parameters Grid */}
                  <div className="space-y-4">
                    {/* Model Type Selector */}
                    <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-slate-300">Neural Model Core</div>
                        <div className="text-[10px] text-slate-500">Pick default computational logic engine</div>
                      </div>
                      <select
                        value={modelType}
                        onChange={(e) => {
                          const val = e.target.value;
                          localStorage.setItem('neuro_gemini_model', val);
                          setModelType(val);
                        }}
                        className="bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-cyan-400 focus:outline-none focus:border-cyan-500/30 font-space"
                      >
                        <option value="gemini-2.0-flash">Gemini 2.0 Flash (Fast)</option>
                        <option value="gemini-2.0-pro">Gemini 2.0 Pro (Deep)</option>
                        <option value="gemini-1.5-flash">Gemini 1.5 Flash (Legacy)</option>
                        <option value="gemini-1.5-pro">Gemini 1.5 Pro (Legacy)</option>
                      </select>
                    </div>

                    {/* Model Temperature Slider */}
                    <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs font-semibold text-slate-300">Model Temperature</div>
                          <div className="text-[10px] text-slate-500">Determines random generation boundaries</div>
                        </div>
                        <span className="font-mono text-xs text-cyan-400">{temperature} ({temperature === 0.2 ? 'Low Temp' : temperature > 0.6 ? 'Creative' : 'Balanced'})</span>
                      </div>
                      <input
                        type="range"
                        min="0.0"
                        max="1.0"
                        step="0.1"
                        value={temperature}
                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                        className="w-full accent-cyan-500 h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/20 to-purple-950/20 border border-indigo-500/10 text-xs text-slate-400 mt-6 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span>Changing these variables affects live inference outputs in the AI Assistant tab. Lower temperatures yield structured coding outputs, while higher variables optimize text messaging.</span>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
