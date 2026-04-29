"use client";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  PieChart,
  LayoutDashboard,
  Lock,
  BarChart3,
  Diamond
} from "lucide-react";
import Link from "next/link";

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};


const StatBadge = ({ label, value, x, y, delay }: { label: string; value: string; x: number; y: number; delay: number }) => (
  <motion.div
    animate={{
      y: [0, -15, 0],
      x: [0, 10, 0]
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
    style={{ left: `${x}%`, top: `${y}%` }}
    className="absolute z-20 px-4 py-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-700/50 shadow-xl flex flex-col items-center min-w-28"
  >
    <span className="text-[10px] uppercase tracking-widest text-white font-medium opacity-80">{label}</span>
    <span className="text-lg font-serif text-white font-bold">{value}</span>
  </motion.div>
);

export function HeroVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-accent/10 blur-[80px] rounded-full scale-75" />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full max-w-lg aspect-square flex items-center justify-center"
      >
        {/* 1. Growth Chart SVG */}
        <svg viewBox="0 0 400 200" className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 1)" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,180 Q50,170 100,140 T200,120 T300,60 T400,20"
            fill="none"
            stroke="url(#chartGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          />
          <motion.path
            d="M0,180 Q50,170 100,140 T200,120 T300,60 T400,20 L400,200 L0,200 Z"
            fill="url(#chartGradient)"
            fillOpacity="0.1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </svg>
        {/* 2. Category Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full flex items-center justify-center shadow-2xl">
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `conic-gradient(
                                var(--accent) 0% 40%, 
                                var(--success) 40% 70%, 
                                var(--danger) 70% 90%, 
                                var(--warning) 90% 100%
                            )`
            }}
          />
          <div className="absolute inset-4 rounded-full bg-slate-950 flex flex-col items-center justify-center text-center p-2">
            <span className="text-[10px] uppercase tracking-tighter text-muted">Net Worth</span>
            <span className="text-xl font-serif font-bold text-white">$24,850</span>
          </div>
        </div>
        {/* 3. Floating Stat Badges (SENSICAL DATA) */}
        <StatBadge label="Savings Rate" value="22%" x={10} y={20} delay={0} />
        <StatBadge label="Monthly Spend" value="$1,840" x={80} y={15} delay={1} />
        <StatBadge label="Status" value="On Track" x={75} y={70} delay={2} />
        <StatBadge label="Net Change" value="+$1.2k" x={15} y={65} delay={3} />
      </motion.div>
    </div>
  );
}


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-125 h-125 bg-accent/10 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col gap-8">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent-soft-hover text-accent text-xs font-medium w-fit">
              <ShieldCheck size={12} />
              <span>Privacy by design. Precision by default.</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-serif leading-[1.1] tracking-tighter text-foreground">
              Design your wealth <br />
              <span className="italic text-accent">on your own terms</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted max-w-lg leading-relaxed">
              Less noise, more insight. A minimal tool to track your flow, define your limits, and reclaim control over your financial life
            </motion.p>
            <motion.div variants={fadeInUp} className="flex items-center gap-4">

              <Link href="/register" className="flex items-center gap-2 py-2 px-8 bg-accent text-accent-foreground font-bold hover:opacity-90 transition-all shadow-lg shadow-accent-soft-hover rounded-full" >
                Start Now <ArrowRight size={18} />
              </Link>

            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </section>
      {/* --- Features Grid (Based on HUs) --- */}
      <section id="features" className="py-24 px-6 bg-default/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Purpose-Built Tools</h2>
            <p className="text-muted max-w-xl mx-auto">Every feature is engineered to remove friction from your financial management.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <motion.div whileHover={{ y: -10 }} className="md:col-span-7">
              <Card className="h-full bg-surface border-border hover:border-accent/50 transition-all group">
                <div className="p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                      <LayoutDashboard size={24} />
                    </div>
                    <h3 className="text-3xl font-serif text-foreground mb-3">Real-time Balance Control</h3>
                    <p className="text-muted leading-relaxed">
                      Instantly see your current standing with a live Balance Summary.
                      Our dynamic forms and category selector make transaction logging a matter of seconds.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="md:col-span-5">
              <Card className="h-full bg-surface border-border hover:border-accent/50 transition-all group">
                <div className="p-8">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                    <BarChart3 size={24} />
                  </div>
                  <h3 className="text-2xl font-serif text-foreground mb-3">Visual Budgeting</h3>
                  <p className="text-muted leading-relaxed">
                    Stop guessing. Use progress bars to monitor your consumption in real-time
                    and receive alerts before you hit your limit.
                  </p>
                </div>
              </Card>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="md:col-span-5">
              <Card className="h-full bg-surface border-border hover:border-accent/50 transition-all group">
                <div className="p-8">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                    <PieChart size={24} />
                  </div>
                  <h3 className="text-2xl font-serif text-foreground mb-3">Behavioral Insights</h3>
                  <p className="text-muted leading-relaxed">
                    Transform raw data into clarity. Analyze your habits through
                    category-based pie charts and savings evolution lines.
                  </p>
                </div>
              </Card>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="md:col-span-7">
              <Card className="h-full bg-surface border-border hover:border-accent/50 transition-all group">
                <div className="p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                      <Lock size={24} />
                    </div>
                    <h3 className="text-3xl font-serif text-foreground mb-3">Enterprise-Grade Privacy</h3>
                    <p className="text-muted leading-relaxed">
                      Your data is encrypted and protected. With JWT session persistence
                      and role-based access, your financial identity remains exclusively yours.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      {/* --- Process --- */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">The Path to Clarity</h2>
            <p className="text-muted">A streamlined approach to mastering your money.</p>
          </div>

          <div className="relative space-y-24">
            {/* Línea central refinada: con gradiente */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-border to-transparent -translate-x-1/2 hidden md:block" />
            {[
              {
                step: "01",
                title: "Build Your Foundation",
                desc: "Set up a secure environment tailored to your financial identity. Simple, private, and ready in seconds.",
                icon: <ShieldCheck size={20} />
              },
              {
                step: "02",
                title: "Log with Precision",
                desc: "Capture every transaction the moment it happens. Use custom categories to reflect how you actually live.",
                icon: <Zap size={20} />
              },
              {
                step: "03",
                title: "Master Your Flow",
                desc: "Turn raw data into strategic growth. Identify patterns and reallocate your resources to what truly matters.",
                icon: <BarChart3 size={20} />
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Contenedor */}
                <div className={`flex-1 flex flex-col ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className={`flex items-center gap-2 text-accent mb-2 ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                    {idx % 2 === 0 && <span className="text-xs font-bold uppercase tracking-widest">Phase {item.step}</span>}
                    {item.icon}
                    {idx % 2 !== 0 && <span className="text-xs font-bold uppercase tracking-widest">Phase {item.step}</span>}
                  </div>
                  <h3 className="text-2xl font-serif text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted leading-relaxed max-w-md mx-auto md:mx-0">
                    {item.desc}
                  </p>
                </div>
                {/* Nodo Central: El ancla visual */}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-background border-2 border-accent flex items-center justify-center text-accent font-serif font-bold text-lg shadow-[0_0_20px_rgba(var(--accent),0.2)] transition-transform hover:scale-110">
                    {item.step}
                  </div>
                  {/* Efecto de brillo detrás del número */}
                  <div className="absolute inset-0 blur-md bg-accent/30 rounded-full -z-10" />
                </div>
                {/* Espaciador para mantener la simetría en desktop */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>

        </div>
      </section>
      {/* --- Footer --- */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-1">
            <Diamond className="text-accent" />
            <span className="text-lg font-serif italic text-foreground">Tracely</span>
          </div>
          <div className="text-muted text-xs flex gap-6">
            <span>© 2026 Tracely. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}