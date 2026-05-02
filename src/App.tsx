import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import { 
  LineChart, 
  Wallet, 
  ChevronDown, 
  Globe, 
  ArrowRight,
  X,
  Star,
  Trophy,
  Target,
  ExternalLink,
  Instagram,
  Twitter,
  MessageSquare,
  Sparkles,
  Zap,
  Copy,
  Check,
  Edit2,
  Cloud,
  LayoutDashboard,
  ShieldCheck,
  Loader2
} from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [inputText, setInputText] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { text: 'أهلاً بك في منصتنا! كيف يمكنني مساعدتك في اختيار أفضل شركة تمويل أو وسيط تداول اليوم؟', isBot: true },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isLoading]);

  const [ratings, setRatings] = useState(() => {
    const saved = localStorage.getItem('companyRatings');
    const defaultRatings = {
      "FTMO": 4.8,
      "Funding Pips": 4.9,
      "Funded Trading Plus": 4.7,
      "The 5ers": 4.6,
      "FunderPro": 4.5,
      "Earn2Trade": 4.8,
      "We Master Trade": 4.3,
      "Finotive Funding": 4.4,
      "Exness": 5.0,
      "IC Markets": 4.9,
      "Headway": 4.6,
      "TradingView": 5.0
    };
    return saved ? { ...defaultRatings, ...JSON.parse(saved) } : defaultRatings;
  });

  const [discountCodes, setDiscountCodes] = useState(() => {
    const saved = localStorage.getItem('companyDiscounts');
    const defaultCodes: Record<string, string> = {
      "FTMO": "FTMO10",
      "Funding Pips": "9d311e95",
      "Funded Trading Plus": "FTP5",
      "The 5ers": "5ERS_GIFT",
      "FunderPro": "nilihani",
      "Earn2Trade": "HANI",
      "We Master Trade": "MASTER",
      "Finotive Funding": "FINO",
      "Exness": "NO_CODE",
      "IC Markets": "NO_CODE",
      "Headway": "HWP6"
    };
    return saved ? { ...defaultCodes, ...JSON.parse(saved) } : defaultCodes;
  });

  const handleUpdateDiscount = (name: string, newCode: string) => {
    setDiscountCodes(prev => {
      const updated = { ...prev, [name]: newCode };
      localStorage.setItem('companyDiscounts', JSON.stringify(updated));
      return updated;
    });
  };

  const handleCopyCode = (e: React.MouseEvent, code: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!code || code === "NO_CODE") return;
    
    try {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleRate = (e: React.MouseEvent, name: string, rating: number) => {
    e.preventDefault();
    e.stopPropagation();
    const newRatings = { ...ratings, [name]: rating };
    setRatings(newRatings);
    localStorage.setItem('companyRatings', JSON.stringify(newRatings));
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const affiliateLinks = [
    {
      category: "أفضل شركات التمويل (Prop Firms)",
      links: [
        { 
          name: "FTMO", 
          desc: "المعيار الذهبي لشركات التمويل عالمياً والأكثر وثوقية.", 
          url: "#", 
          tag: "عالمي", 
          icon: Globe, 
          color: "from-blue-600 to-indigo-900",
          logo: "https://www.google.com/s2/favicons?domain=ftmo.com&sz=128",
          features: ["تحدي من مرحلتين", "لا قيود زمنية", "دعم فني ممتاز"],
          profitSplit: "80% - 90%",
          drawdown: "10% Max",
          leverage: "1:100",
          steps: "2 Phases"
        },
        { 
          name: "Funding Pips", 
          desc: "شروط مرنة وسحوبات سريعة جداً. مثالية للنمو السريع.", 
          url: "https://app.fundingpips.com/register?ref=9d311e95", 
          tag: "الأكثر توفيراً", 
          icon: Zap, 
          color: "from-zinc-700 to-zinc-900", 
          badge: "سحب فوري",
          logo: "https://www.google.com/s2/favicons?domain=fundingpips.com&sz=128",
          features: ["سحب أسبوعي", "أقل سعر للتحدي", "رافعة 1:100"],
          profitSplit: "80% - 90%",
          drawdown: "10% Max",
          leverage: "1:100",
          steps: "2 Phases"
        },
        { 
          name: "Funded Trading Plus", 
          desc: "برامج بريطانية عريقة بدون حدود زمنية للتقييم.", 
          url: "https://www.fundedtradingplus.com?ref=649", 
          tag: "مرونة عالية", 
          icon: ShieldCheck, 
          color: "from-indigo-600 to-purple-800",
          logo: "https://www.google.com/s2/favicons?domain=fundedtradingplus.com&sz=128",
          features: ["تقييم مرحلة واحدة", "لا حدود زمنية", "تغطية الخسارة"],
          profitSplit: "80% ثابت",
          drawdown: "6% - 10%",
          leverage: "1:30",
          steps: "1 or 2"
        },
        { 
          name: "The 5ers", 
          desc: "نظام نمو حقيقي وتمويل فوري من اليوم الأول.", 
          url: "#", 
          tag: "نمو حقيقي", 
          icon: Zap, 
          color: "from-emerald-500 to-teal-700",
          logo: "https://www.google.com/s2/favicons?domain=the5ers.com&sz=128",
          features: ["تمويل فوري متاح", "خدمة عملاء 24/5", "نمو مضاعف"],
          profitSplit: "50% - 100%",
          drawdown: "6% - 10%",
          leverage: "1:30",
          steps: "Instant/2"
        },
        { 
          name: "FunderPro", 
          desc: "تكنولوجيا حديثة وسبريد منخفض لمتداولي اليوم الواحد.", 
          url: "https://funderpro.cxclick.com/visit/?bta=35544&brand=funderpro", 
          tag: "تقنية متطورة", 
          icon: LayoutDashboard, 
          color: "from-cyan-600 to-blue-700",
          logo: "https://www.google.com/s2/favicons?domain=funderpro.com&sz=128",
          features: ["تداول STP حقيقي", "منصة Tradovate", "لا ضغوط زمنية"],
          profitSplit: "80% ثابت",
          drawdown: "10%",
          leverage: "1:100",
          steps: "2 Phases"
        },
        { 
          name: "Earn2Trade", 
          desc: "الشركة الرائدة في تمويل متداولي العقود الآجلة بنظام شفاف.", 
          url: "https://www.earn2trade.com/?a_pid=Hani", 
          tag: "Futures", 
          icon: Target, 
          color: "from-red-600 to-red-800",
          logo: "https://www.google.com/s2/favicons?domain=earn2trade.com&sz=128",
          features: ["عقود آجلة (CME)", "توجيه مهني", "دعم كامل للمبتدئين"],
          profitSplit: "80% للمتداول",
          drawdown: "Trailing",
          leverage: "N/A (Futures)",
          steps: "1 Phase"
        },
        { 
          name: "We Master Trade", 
          desc: "حلول تمويل مبتكرة للمتداولين الطموحين في الأسواق المالية.", 
          url: "https://my.wemastertrade.com/register?ref=193585", 
          tag: "ابتكار", 
          icon: Zap, 
          color: "from-orange-500 to-orange-700",
          logo: "https://www.google.com/s2/favicons?domain=wemastertrade.com&sz=128",
          features: ["أدوات ذكية", "توزيع أرباح مرن", "تحديات سريعة"],
          profitSplit: "70% - 90%",
          drawdown: "8% - 12%",
          leverage: "1:100",
          steps: "2 Phases"
        },
        { 
            name: "Finotive Funding", 
            desc: "تمويل فوري وخيارات نمو تصل لمدى بعيد جداً.", 
            url: "https://finotivefunding.com/pYrWo8k", 
            tag: "تمويل فوري", 
            icon: Zap, 
            color: "from-blue-700 to-indigo-900",
            logo: "https://www.google.com/s2/favicons?domain=finotivefunding.com&sz=128",
            features: ["تمويل فوري بدون تحدي", "عملات مشفرة 24/7", "سكالبينج مسموح"],
            profitSplit: "75% - 95%",
            drawdown: "8% - 10%",
            leverage: "1:100",
            steps: "Instant/1/2"
        }
      ]
    },
    {
      category: "منصات التداول الموثوقة (Brokers)",
      links: [
        { 
          name: "Exness", 
          desc: "الوسيط الأكبر عالمياً بسحب فوري وسبريد يقارب الصفر.", 
          url: "https://one.exnessonelink.com/a/s351vqtmrt", 
          tag: "عالمي", 
          icon: Wallet, 
          color: "from-yellow-500 to-zinc-900", 
          badge: "الأفضل سرعة",
          logo: "https://www.google.com/s2/favicons?domain=exness.com&sz=128",
          features: ["سحب آلي فوري", "رافعة مالية غير محدودة", "حسابات إسلامية"],
          profitSplit: "تداول مباشر"
        },
        { 
          name: "IC Markets", 
          desc: "الوجهة المثالية لمتداولي السكالبينج مع تنفيذ فائق.", 
          url: "#", 
          tag: "Raw Spread", 
          icon: LineChart, 
          color: "from-zinc-800 to-black",
          logo: "https://www.google.com/s2/favicons?domain=icmarkets.com&sz=128",
          features: ["سبريد خام (Raw)", "خوادم Equinix NY4", "تنفيذ ECN حقيقي"],
          profitSplit: "تداول مباشر"
        },
        { 
          name: "Headway", 
          desc: "تداول برافعة مالية مرنة وحسابات إسلامية حقيقية.", 
          url: "https://headway.partners/user/signup?hwp=6efbc6", 
          tag: "إسلامي", 
          icon: Globe, 
          color: "from-sky-500 to-blue-700",
          logo: "https://www.google.com/s2/favicons?domain=headway.partners&sz=128",
          features: ["بونص إيداع متاح", "تداول نسخ صفقات", "دعم فني محلي"],
          profitSplit: "تداول مباشر"
        }
      ]
    },
    {
        category: "أدوات التحليل الأساسية",
        links: [
          { 
            name: "TradingView", 
            desc: "المنصة رقم 1 عالمياً للرسوم البيانية وتحليل الأسواق.", 
            url: "#", 
            tag: "أساسي", 
            icon: Target, 
            color: "from-blue-400 to-blue-600",
            logo: "https://www.google.com/s2/favicons?domain=tradingview.com&sz=128"
          }
        ]
      }
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = { text: inputText, isBot: false };
    setChatMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const companyData = affiliateLinks.flatMap(section => 
        section.links.map(link => `- ${link.name}: ${link.desc} (Tag: ${link.tag})`)
      ).join('\n');

      const systemInstruction = `أنت مساعد ذكي لمنصة تداول وتمويل. 
      هنا معلومات عن الشركات التي نوفرها:
      ${companyData}
      
      تعليمات:
      - تحدث باللغة العربية بأسلوب احترافي وودود.
      - ساعد المستخدم في اختيار الشركة المناسبة بناءً على احتياجاته (تمويل، سكالبيج، حساب إسلامي، إلخ).
      - كن موجزاً ومفيداً.
      - إذا سألك المستخدم عن رابط، أخبره أنه يمكنه العثور عليه في البطاقات الموضحة في الصفحة.`;

      const history = chatMessages.map(msg => ({
        role: msg.isBot ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...history, { role: 'user', parts: [{ text: inputText }] }],
        config: {
          systemInstruction: systemInstruction,
        }
      });

      const botResponse = { text: response.text || 'عذراً، حدث خطأ ما. حاول مرة أخرى.', isBot: true };
      setChatMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, { text: 'عذراً، لا يمكنني الاتصال بالخادم الآن.', isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen font-arabic selection:bg-green-500/20 bg-[#09090b] text-[#fafafa] relative overflow-x-hidden" dir="rtl">
      {/* Background Decor */}
      <div className="fixed inset-0 bg-grid-slate opacity-[0.05] pointer-events-none" />
      <div className="fixed top-[-15%] right-[-10%] w-[50%] h-[50%] bg-green-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-15%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Chat Widget */}
      <div className="fixed bottom-24 right-6 sm:bottom-8 sm:right-auto sm:left-8 z-[60] flex flex-col items-end gap-4" dir="rtl">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-[calc(100vw-3rem)] sm:w-[400px] h-[550px] bg-[#121214] rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/5 flex flex-col overflow-hidden ring-1 ring-white/10"
            >
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-8 text-white flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl leading-none">مساعدك الذكي</h3>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]" />
                      <span className="text-xs text-green-50 font-medium lowercase tracking-wide">مدعوم بالذكاء الاصطناعي</span>
                    </div>
                  </div>
                </div>
                <button onClick={toggleChat} className="p-2.5 hover:bg-white/10 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#09090b] scroll-smooth">
                {chatMessages.map((msg, i) => (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] p-5 rounded-[1.8rem] text-sm leading-relaxed shadow-lg ${
                      msg.isBot 
                        ? 'bg-[#1c1c1f] text-gray-200 rounded-tr-none border border-white/5' 
                        : 'bg-green-600 text-white rounded-tl-none shadow-[0_4px_15_rgba(34,197,94,0.3)]'
                    }`}>
                      {msg.isBot ? (
                        <div className="markdown-body space-y-3 prose-sm max-w-none text-gray-200">
                          <Markdown
                            components={{
                              ul: ({ children }) => <ul className="list-disc list-inside space-y-1">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal list-inside space-y-1">{children}</ol>,
                              li: ({ children }) => <li className="text-gray-300">{children}</li>,
                              strong: ({ children }) => <strong className="font-bold text-green-400">{children}</strong>,
                              a: ({ children, href }) => <a href={href} className="text-green-500 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>
                            }}
                          >
                            {msg.text}
                          </Markdown>
                        </div>
                      ) : (
                        msg.text
                      )}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                    <div className="bg-[#1c1c1f] text-green-500/50 p-5 rounded-[1.8rem] rounded-tr-none border border-white/5 shadow-lg flex items-center gap-2">
                       <Loader2 size={16} className="animate-spin" />
                       <span className="text-xs font-medium animate-pulse">جاري التفكير...</span>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="p-6 bg-[#121214] border-t border-white/5">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                  className="flex gap-3 bg-[#1c1c1f] p-3 rounded-2xl border border-white/5 focus-within:border-green-500/50 transition-all shadow-inner"
                >
                  <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="اكتب استفسارك هنا..."
                    className="flex-1 bg-transparent border-none outline-none text-sm px-3 text-gray-200 placeholder:text-gray-500 font-normal"
                    disabled={isLoading}
                  />
                  <button 
                    type="submit"
                    disabled={isLoading || !inputText.trim()}
                    className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-900/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
                  >
                    {isLoading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <ArrowRight size={20} className="rotate-180" />
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={toggleChat}
          className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-[0_15px_35px_rgba(34,197,94,0.4)] hover:scale-110 active:scale-95 transition-all relative overflow-hidden group border border-white/10"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <AnimatePresence mode="wait">
            {isChatOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={28} />
              </motion.div>
            ) : (
              <motion.div key="chat" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                <div className="relative">
                  <MessageSquare size={28} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Header / Hero */}
      <header className="relative pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative inline-block mb-12">
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }}
              onClick={() => setIsAdminMode(!isAdminMode)}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              className={`w-32 h-32 rounded-[2.8rem] bg-gradient-to-br from-green-400 via-green-600 to-emerald-800 p-[1.5px] shadow-[0_0_50px_rgba(34,197,94,0.2)] mx-auto overflow-hidden cursor-pointer ${isAdminMode ? 'ring-4 ring-green-500 ring-offset-4 ring-offset-[#09090b]' : ''}`}
            >
              <div className="w-full h-full bg-[#09090b] rounded-[2.7rem] flex items-center justify-center">
                 <ShieldCheck size={48} className={`${isAdminMode ? 'text-green-400' : 'text-green-500'} fill-green-500/10`} />
              </div>
            </motion.div>
            <AnimatePresence>
              {isAdminMode && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-500 text-black text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-lg"
                >
                  وضع المدير مفعل
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="absolute -bottom-3 -right-3 bg-white text-black text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.25em] shadow-xl border-4 border-[#09090b]"
            >
              VIP Access
            </motion.div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-8 tracking-tight leading-[1.1]">
            أهلاً بك في <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 relative">
              FundCloud
            </span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            أرشيف خاص يجمع لك أفضل الأدوات وشركات التمويل الموثوقة التي أعتمد عليها شخصياً. اختر طريقك وباشر بالتداول اليوم.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowComparison(!showComparison)}
            className="mt-12 group relative inline-flex items-center gap-3 bg-white/5 hover:bg-green-500/10 border border-white/10 hover:border-green-500/30 px-8 py-4 rounded-2xl transition-all shadow-2xl"
          >
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
              <LineChart size={20} />
            </div>
            <span className="font-bold text-gray-200 group-hover:text-white transition-colors">
              {showComparison ? "إخفاء المقارنة" : "مقارنة الشركات (Prop Firms)"}
            </span>
          </motion.button>
        </motion.div>
      </header>

      {/* Comparison Drawer */}
      <AnimatePresence>
        {showComparison && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="relative max-w-5xl mx-auto px-6 mb-24 overflow-hidden"
          >
            <div className="bg-[#121214] border border-white/10 rounded-[2.5rem] p-1 shadow-2xl overflow-x-auto scrollbar-hide">
              <table className="w-full text-right border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-white/5">
                    <th className="p-6 text-xs font-black text-gray-500 uppercase tracking-widest text-right">الشركة</th>
                    <th className="p-6 text-xs font-black text-gray-500 uppercase tracking-widest">توزيع الأرباح</th>
                    <th className="p-6 text-xs font-black text-gray-500 uppercase tracking-widest">أقصى تراجع (Max DD)</th>
                    <th className="p-6 text-xs font-black text-gray-500 uppercase tracking-widest">الرافعة</th>
                    <th className="p-6 text-xs font-black text-gray-500 uppercase tracking-widest">المراحل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {affiliateLinks[0].links.map((link: any, idx: number) => (
                    <motion.tr 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.color} p-2 flex items-center justify-center`}>
                            {link.logo ? (
                              <img src={link.logo} alt={link.name} className="w-full h-full object-contain" />
                            ) : (
                              <link.icon size={16} />
                            )}
                          </div>
                          <span className="font-bold text-white text-lg">{link.name}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="text-green-400 font-black font-mono">{link.profitSplit}</span>
                      </td>
                      <td className="p-6">
                        <span className="text-red-400 font-bold font-mono">{link.drawdown}</span>
                      </td>
                      <td className="p-6">
                        <span className="text-gray-300 font-medium font-mono">{link.leverage}</span>
                      </td>
                      <td className="p-6">
                        <span className="text-blue-400 font-bold">{link.steps}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative max-w-3xl mx-auto px-6 pb-48">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-24"
        >
          {affiliateLinks.map((section, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-6 mb-10">
                <h2 className="text-[12px] font-black text-gray-500 uppercase tracking-[0.4em] whitespace-nowrap">
                  {section.category}
                </h2>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-white/10 via-white/5 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.links.map((link, lIdx) => (
                  <motion.a
                    key={lIdx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative flex flex-col bg-[#161619] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl hover:shadow-green-500/20 hover:border-green-500/50 transition-all overflow-hidden h-full"
                  >
                    {/* Badge */}
                    {link.badge && (
                      <div className="absolute top-6 left-6 z-20">
                        <span className="text-[9px] font-black bg-green-500 text-black px-3 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                          {link.badge}
                        </span>
                      </div>
                    )}

                    {/* Card Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon/Logo Section */}
                      <div className="mb-8 flex justify-center sm:justify-start">
                        <div className="relative">
                          <div className={`w-20 h-20 rounded-[2.2rem] bg-gradient-to-br ${link.color} flex items-center justify-center text-white shadow-2xl relative z-10 overflow-hidden group-hover:scale-110 transition-transform duration-500`}>
                            {link.logo ? (
                              <img src={link.logo} alt={link.name} className="w-12 h-12 object-contain" referrerPolicy="no-referrer" />
                            ) : (
                              <link.icon size={36} />
                            )}
                          </div>
                          <div className={`absolute inset-0 blur-3xl opacity-20 scale-150 bg-gradient-to-br ${link.color} group-hover:opacity-40 transition-opacity`} />
                        </div>
                      </div>

                      {/* Text Section */}
                      <div className="flex-1 text-right">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex gap-0.5 items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <motion.button
                                key={star}
                                onClick={(e) => handleRate(e, link.name, star)}
                                whileHover={{ scale: 1.4, rotate: 15 }}
                                whileTap={{ scale: 0.7 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="group/star px-0.5 outline-none relative"
                              >
                                <Star 
                                  size={12} 
                                  className={`${
                                    star <= Math.round(ratings[link.name as keyof typeof ratings] || 0)
                                      ? "fill-green-500 text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]" 
                                      : "text-gray-700"
                                  } transition-colors duration-300`}
                                />
                                {star <= Math.round(ratings[link.name as keyof typeof ratings] || 0) && (
                                  <motion.div
                                    layoutId={`star-glow-${link.name}`}
                                    className="absolute inset-0 bg-green-500/20 blur-md rounded-full -z-10"
                                  />
                                )}
                              </motion.button>
                            ))}
                            <AnimatePresence mode="wait">
                              <motion.span 
                                key={ratings[link.name as keyof typeof ratings]}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 5 }}
                                className="text-[10px] text-gray-500 mr-2 font-mono"
                              >
                                ({ratings[link.name as keyof typeof ratings] || 0})
                              </motion.span>
                            </AnimatePresence>
                          </div>
                          <h3 className="font-black text-white text-2xl tracking-tight group-hover:text-green-400 transition-colors">
                            {link.name}
                          </h3>
                        </div>

                        {/* Discount Section */}
                        <div className="mb-4">
                          {isAdminMode ? (
                            <div 
                              className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all" 
                              onClick={e => e.stopPropagation()}
                            >
                              <Edit2 size={12} className="text-green-500" />
                              <input 
                                type="text"
                                value={discountCodes[link.name] || ""}
                                onChange={(e) => handleUpdateDiscount(link.name, e.target.value)}
                                className="bg-transparent border-none outline-none text-[11px] font-bold text-white w-full placeholder:text-gray-600 focus:ring-0"
                                placeholder="اكتب الكود هنا..."
                                autoFocus
                              />
                            </div>
                          ) : (
                            discountCodes[link.name] && discountCodes[link.name] !== "NO_CODE" && (
                              <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={(e) => handleCopyCode(e, discountCodes[link.name])}
                                className="group/copy w-full flex items-center justify-between bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 px-4 py-2.5 rounded-2xl transition-all"
                              >
                                <div className="flex items-center gap-2">
                                  {copiedCode === discountCodes[link.name] ? (
                                    <Check size={14} className="text-green-400" />
                                  ) : (
                                    <Copy size={14} className="text-green-500 group-hover/copy:scale-110 transition-transform" />
                                  )}
                                  <span className="text-[10px] font-bold text-green-500 uppercase">كود الخصم</span>
                                </div>
                                <span className="text-[12px] font-black text-white tracking-widest font-mono">
                                  {copiedCode === discountCodes[link.name] ? "تم النسخ!" : discountCodes[link.name]}
                                </span>
                              </motion.button>
                            )
                          )}
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 group-hover:text-gray-300 transition-colors">
                          {link.desc}
                        </p>

                        {/* Features & Profit Share */}
                        {link.features && (
                          <div className="space-y-4 mb-6">
                            <div className="flex flex-wrap gap-2">
                              {link.features.map((feat, fIdx) => (
                                <div key={fIdx} className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                  <div className="w-1 h-1 bg-green-500 rounded-full" />
                                  <span className="text-[10px] text-gray-400 whitespace-nowrap">{feat}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center justify-between bg-green-500/5 border border-green-500/10 p-3 rounded-xl">
                               <div className="flex items-center gap-2">
                                 <Trophy size={14} className="text-green-500" />
                                 <span className="text-[11px] font-bold text-gray-300">تقسيم الأرباح</span>
                               </div>
                               <span className="text-[12px] font-black text-green-400 font-mono">{link.profitSplit}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Footer Section */}
                      <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl group-hover:text-green-400 group-hover:bg-green-500/10 transition-all">
                          {link.tag}
                        </span>
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-green-500 group-hover:text-black transition-all group-hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                          <ExternalLink size={20} />
                        </div>
                      </div>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Modern Dark Footer */}
      <footer className="fixed bottom-0 w-full glass-morphism py-8 z-40 border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-3xl mx-auto px-8 flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="flex gap-5">
             <motion.a whileHover={{ scale: 1.15, y: -4 }} href="https://wa.me/qr/MXPOZFMGHXKTF1" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-green-500 hover:border-green-500/40 hover:bg-green-500/5 transition-all shadow-lg">
               <MessageSquare size={24} />
             </motion.a>
             <motion.a whileHover={{ scale: 1.15, y: -4 }} href="#" className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-pink-500 hover:border-pink-500/40 hover:bg-pink-500/5 transition-all shadow-lg">
               <Instagram size={24} />
             </motion.a>
             <motion.a whileHover={{ scale: 1.15, y: -4 }} href="#" className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400/40 hover:bg-blue-400/5 transition-all shadow-lg">
               <Twitter size={24} />
             </motion.a>
          </div>
          <div className="text-center sm:text-left flex flex-col items-center sm:items-end">
            <div className="text-[12px] font-black text-gray-500 uppercase tracking-[0.5em] mb-2">
              Verified Partner
            </div>
            <div className="text-[11px] text-gray-600 font-medium">
               © 2026 جميع الروابط موثوقة ومفحوصة
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
