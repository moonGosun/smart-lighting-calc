import { motion } from 'framer-motion';

const colorMap = {
  electric: {
    border: 'border-electric/15',
    bg: 'bg-electric/5',
    text: 'text-electric',
  },
  power: {
    border: 'border-power/15',
    bg: 'bg-power/5',
    text: 'text-power',
  },
  success: {
    border: 'border-electric/15',
    bg: 'bg-electric/5',
    text: 'text-electric',
  },
  amber: {
    border: 'border-amber/15',
    bg: 'bg-amber/5',
    text: 'text-amber',
  },
  danger: {
    border: 'border-danger/15',
    bg: 'bg-danger/5',
    text: 'text-danger',
  },
};

export default function ResultCard({ label, value, unit, color, delay, highlight }) {
  const colors = colorMap[color] || colorMap.electric;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className={`relative rounded-2xl p-4 border ${colors.border} ${colors.bg} ${
        highlight ? 'ring-1 ring-amber/10' : ''
      }`}
    >
      <p className="text-[11px] text-text-muted uppercase tracking-wider font-mono-data mb-2">
        {label}
      </p>
      <div className="flex items-baseline gap-1.5">
        <span className={`font-display text-xl md:text-2xl font-bold ${colors.text}`}>
          {value}
        </span>
        {unit && (
          <span className="text-xs text-text-muted font-mono-data">
            {unit}
          </span>
        )}
      </div>
    </motion.div>
  );
}
