import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import NumberInput from './NumberInput';
import ResultCard from './ResultCard';

export default function DimmingCalculator() {
  const [power, setPower] = useState(1000);
  const [brightness, setBrightness] = useState(50);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [daysPerMonth, setDaysPerMonth] = useState(30);
  const [price, setPrice] = useState(0.8);
  const [cost, setCost] = useState(5000);

  const result = useMemo(() => {
    const savedPower = power * (1 - brightness / 100);
    const savedPerHour = savedPower / 1000;
    const savedPerDay = savedPerHour * hoursPerDay;
    const savedPerMonth = savedPerDay * daysPerMonth;
    const moneyPerMonth = savedPerMonth * price;
    const paybackMonths = moneyPerMonth > 0 ? cost / moneyPerMonth : Infinity;
    const totalSaved5Year = moneyPerMonth * 60;

    return {
      savedPerHour,
      savedPerDay,
      savedPerMonth,
      moneyPerMonth,
      paybackMonths,
      totalSaved5Year,
    };
  }, [power, brightness, hoursPerDay, daysPerMonth, price, cost]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <div className="space-y-6">
      {/* Parameters Panel */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-card rounded-3xl p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-8 pb-5 border-b border-border">
          <div className="w-10 h-10 rounded-2xl bg-electric/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <div>
            <h2 className="font-display text-sm font-bold text-text-primary tracking-wide">参数配置</h2>
            <p className="text-xs text-text-muted mt-0.5">输入灯具功率与使用场景</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <motion.div variants={itemVariants}>
            <NumberInput
              label="灯具功率"
              value={power}
              onChange={setPower}
              unit="W"
              min={0}
              icon="⚡"
            />
          </motion.div>
          <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1">
            <div className="mb-2">
              <label className="text-xs font-medium text-text-secondary flex items-center gap-1.5">
                <span>调光亮度</span>
                <span className="text-electric font-mono-data">({brightness}%)</span>
              </label>
            </div>
            <input
              type="range"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              min={0}
              max={100}
              className="w-full mt-3"
            />
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-text-muted font-mono-data">0%</span>
              <span className="text-[10px] text-text-muted font-mono-data">50%</span>
              <span className="text-[10px] text-text-muted font-mono-data">100%</span>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <NumberInput
              label="每天使用"
              value={hoursPerDay}
              onChange={setHoursPerDay}
              unit="小时"
              min={0}
              max={24}
              icon="🕐"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <NumberInput
              label="每月天数"
              value={daysPerMonth}
              onChange={setDaysPerMonth}
              unit="天"
              min={0}
              max={31}
              icon="📅"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <NumberInput
              label="电价"
              value={price}
              onChange={setPrice}
              unit="元/度"
              min={0}
              step={0.01}
              icon="💰"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <NumberInput
              label="系统成本"
              value={cost}
              onChange={setCost}
              unit="元"
              min={0}
              icon="🛠️"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Results Panel */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-3xl p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-8 pb-5 border-b border-border">
          <div className="w-10 h-10 rounded-2xl bg-power/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-power" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h2 className="font-display text-sm font-bold text-text-primary tracking-wide">节能分析</h2>
            <p className="text-xs text-text-muted mt-0.5">基于当前参数的精确计算</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <ResultCard
            label="每小时节省"
            value={result.savedPerHour.toFixed(3)}
            unit="度"
            color="power"
            delay={0}
          />
          <ResultCard
            label="每天节省"
            value={result.savedPerDay.toFixed(1)}
            unit="度"
            color="electric"
            delay={0.08}
          />
          <ResultCard
            label="每月节省电费"
            value={`¥${result.moneyPerMonth.toFixed(2)}`}
            unit=""
            color="success"
            delay={0.16}
          />
          <ResultCard
            label="预计回本周期"
            value={result.paybackMonths === Infinity ? '∞' : `${result.paybackMonths.toFixed(1)}`}
            unit={result.paybackMonths === Infinity ? '' : '个月'}
            color="amber"
            delay={0.24}
            highlight
          />
        </div>

        {/* Summary Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-bg-secondary rounded-2xl p-5 border border-border"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs text-text-muted font-mono-data">SUMMARY</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                安装智能调光系统后，相较于灯具全功率运行，
                <span className="text-electric font-semibold"> 每月可节省电费 ¥{result.moneyPerMonth.toFixed(2)} </span>
                {result.paybackMonths !== Infinity && (
                  <>
                    ，约 <span className="text-amber font-semibold">{result.paybackMonths.toFixed(1)} 个月</span> 收回系统成本
                  </>
                )}
              </p>
            </div>
            {result.totalSaved5Year > 0 && (
              <div className="text-right shrink-0">
                <p className="text-xs text-text-muted font-mono-data">5年总节省</p>
                <p className="font-display text-2xl font-bold text-electric">
                  ¥{result.totalSaved5Year.toFixed(0)}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
