import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DimmingCalculator from './components/DimmingCalculator';
import ReplacementCalculator from './components/ReplacementCalculator';

const scenes = [
  { id: 'dimming', label: '智能调光', desc: '通过智能控制系统调节亮度实现节能' },
  { id: 'replacement', label: '灯具替换 + 调光', desc: '新灯具功率更低且支持智能调光，双重节能' },
];

export default function App() {
  const [scene, setScene] = useState('dimming');

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="relative max-w-5xl mx-auto px-4 py-8 md:py-14">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-electric/10 text-electric">
            <div className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse-glow" />
            <span className="text-xs font-mono-data tracking-wider uppercase">
              Smart Lighting ROI
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-text-primary mb-3 tracking-tight">
            智能照明
            <span className="text-electric">节能计算器</span>
          </h1>
          <p className="text-text-secondary text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            精确计算节能收益与投资回报周期，让每一次节能决策都有据可依
          </p>
        </motion.header>

        {/* Scene Selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            {scenes.map((s) => (
              <button
                key={s.id}
                onClick={() => setScene(s.id)}
                className={`relative flex-1 p-5 rounded-2xl border text-left transition-all duration-300 ${
                  scene === s.id
                    ? 'border-electric/30 bg-electric/5'
                    : 'border-border bg-bg-card hover:border-text-muted/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-display text-sm font-bold tracking-wide ${
                      scene === s.id ? 'text-electric' : 'text-text-primary'
                    }`}
                  >
                    {s.label}
                  </span>
                  {scene === s.id && (
                    <div className="w-2 h-2 rounded-full bg-electric" />
                  )}
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {s.desc}
                </p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Calculator Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={scene}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {scene === 'dimming' && <DimmingCalculator />}
            {scene === 'replacement' && <ReplacementCalculator />}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-14 pt-8 border-t border-border"
        >
          <p className="text-xs text-text-muted font-mono-data">
            Smart Lighting ROI Calculator v1.0
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
