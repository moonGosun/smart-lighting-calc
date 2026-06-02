import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import NumberInput from './NumberInput';
import ResultCard from './ResultCard';

export default function ReplacementCalculator() {
  const [oldPower, setOldPower] = useState(1000);
  const [newPower, setNewPower] = useState(400);
  const [brightness, setBrightness] = useState(60);
  const [quantity, setQuantity] = useState(10);
  const [newUnitCost, setNewUnitCost] = useState(800);
  const [oldUnitCost, setOldUnitCost] = useState(50);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [daysPerMonth, setDaysPerMonth] = useState(30);
  const [price, setPrice] = useState(0.8);

  const totalCost = useMemo(() => (newUnitCost + oldUnitCost) * quantity, [newUnitCost, oldUnitCost, quantity]);

  const result = useMemo(() => {
    const oldTotalPower = oldPower * quantity;
    const newActualPower = newPower * (brightness / 100) * quantity;
    const savedPower = oldTotalPower - newActualPower;
    const savedPerHour = savedPower / 1000;
    const savedPerDay = savedPerHour * hoursPerDay;
    const savedPerMonth = savedPerDay * daysPerMonth;
    const moneyPerMonth = savedPerMonth * price;
    const paybackMonths = moneyPerMonth > 0 ? totalCost / moneyPerMonth : Infinity;
    const totalSaved5Year = moneyPerMonth * 60;
    const baseEfficiency = oldPower > 0 ? ((oldPower - newPower) / oldPower * 100).toFixed(1) : '0';
    const dimmingExtra = newPower > 0 ? ((newPower - newPower * brightness / 100) / oldPower * 100).toFixed(1) : '0';

    return {
      savedPower,
      savedPerHour,
      savedPerDay,
      savedPerMonth,
      moneyPerMonth,
      paybackMonths,
      totalSaved5Year,
      baseEfficiency,
      dimmingExtra,
      oldTotalPower,
      newActualPower,
    };
  }, [oldPower, newPower, brightness, quantity, hoursPerDay, daysPerMonth, price, totalCost]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
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
            <p className="text-xs text-text-muted mt-0.5">输入新旧灯具参数与使用场景</p>
          </div>
        </div>

        {/* Power Section */}
        <div className="mb-6">
          <p className="text-[11px] font-mono-data text-text-muted uppercase tracking-wider mb-4">功率对比</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <motion.div variants={itemVariants}>
              <NumberInput label="旧灯具功率" value={oldPower} onChange={setOldPower} unit="W/盏" min={0} icon="🔴" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <NumberInput label="新灯具功率" value={newPower} onChange={setNewPower} unit="W/盏" min={0} icon="🟢" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <NumberInput label="灯具数量" value={quantity} onChange={setQuantity} unit="盏" min={1} icon="💡" />
            </motion.div>
          </div>
        </div>

        {/* Brightness Slider */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="mb-2">
            <label className="text-xs font-medium text-text-secondary flex items-center gap-1.5">
              <span>新灯具调光亮度</span>
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

        {/* Cost Section */}
        <div className="mb-6">
          <p className="text-[11px] font-mono-data text-text-muted uppercase tracking-wider mb-4">成本核算</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <motion.div variants={itemVariants}>
              <NumberInput label="一盏新灯成本" value={newUnitCost} onChange={setNewUnitCost} unit="元" min={0} icon="🛒" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <NumberInput
                label="一盏旧灯处理"
                value={oldUnitCost}
                onChange={setOldUnitCost}
                unit="元"
                icon="🔧"
                helper="负值=回收残值"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="bg-bg-secondary rounded-2xl border border-border p-4 h-full flex flex-col justify-center">
                <p className="text-[10px] text-text-muted font-mono-data uppercase tracking-wider">总成本</p>
                <p className="font-display text-xl font-bold text-electric mt-1">¥{totalCost.toLocaleString()}</p>
                <p className="text-[10px] text-text-muted mt-1">({quantity} × {newUnitCost}+{oldUnitCost > 0 ? oldUnitCost : oldUnitCost})</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Usage Section */}
        <div>
          <p className="text-[11px] font-mono-data text-text-muted uppercase tracking-wider mb-4">使用场景</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <motion.div variants={itemVariants}>
              <NumberInput label="每天使用" value={hoursPerDay} onChange={setHoursPerDay} unit="小时" min={0} max={24} icon="🕐" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <NumberInput label="每月天数" value={daysPerMonth} onChange={setDaysPerMonth} unit="天" min={0} max={31} icon="📅" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <NumberInput label="电价" value={price} onChange={setPrice} unit="元/度" min={0} step={0.01} icon="💰" />
            </motion.div>
          </div>
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
            <p className="text-xs text-text-muted mt-0.5">替换 + 调光双重节能收益</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <ResultCard
            label="功率降低"
            value={`${result.baseEfficiency}%`}
            unit="基础"
            color="power"
            delay={0}
          />
          <ResultCard
            label="调光额外节省"
            value={`${result.dimmingExtra}%`}
            unit="额外"
            color="electric"
            delay={0.08}
          />
          <ResultCard
            label="每小时省电"
            value={result.savedPerHour.toFixed(2)}
            unit="度"
            color="success"
            delay={0.16}
          />
          <ResultCard
            label="每月省电费"
            value={`¥${result.moneyPerMonth.toFixed(2)}`}
            unit=""
            color="success"
            delay={0.24}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <ResultCard
            label="旧灯全开功率"
            value={result.oldTotalPower}
            unit="W"
            color="danger"
            delay={0.32}
          />
          <ResultCard
            label="新灯实际功率"
            value={Math.round(result.newActualPower)}
            unit="W"
            color="power"
            delay={0.4}
          />
          <ResultCard
            label="5年总节省"
            value={`¥${result.totalSaved5Year.toFixed(0)}`}
            unit=""
            color="success"
            delay={0.48}
          />
          <ResultCard
            label="预计回本"
            value={result.paybackMonths === Infinity ? '∞' : `${result.paybackMonths.toFixed(1)}`}
            unit={result.paybackMonths === Infinity ? '' : '个月'}
            color="amber"
            delay={0.56}
            highlight
          />
        </div>

        {/* Summary Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-bg-secondary rounded-2xl p-5 border border-border"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs text-text-muted font-mono-data">SUMMARY</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                更换智能灯具后，功率从
                <span className="text-danger font-semibold"> {result.oldTotalPower}W </span>
                降至
                <span className="text-power font-semibold"> {Math.round(result.newActualPower)}W </span>
                （{result.baseEfficiency}% 功率优势 + 调光 {100 - brightness}%），
                每月节省电费
                <span className="text-electric font-semibold"> ¥{result.moneyPerMonth.toFixed(2)} </span>
                {result.paybackMonths !== Infinity && (
                  <>
                    ，约 <span className="text-amber font-semibold">{result.paybackMonths.toFixed(1)} 个月</span> 收回成本
                  </>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
