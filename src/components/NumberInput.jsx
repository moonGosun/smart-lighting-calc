import { useState } from 'react';

export default function NumberInput({ label, value, onChange, unit, min = 0, max, step = 1, icon, helper }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <label className="text-xs font-medium text-text-secondary flex items-center gap-1 mb-2">
        {icon && <span className="text-[10px] leading-none">{icon}</span>}
        <span>{label}</span>
        {helper && <span className="text-[10px] text-text-muted ml-1">({helper})</span>}
      </label>
      <div
        className={`relative flex items-center bg-bg-input rounded-xl border transition-all duration-200 ${
          isFocused
            ? 'border-electric/40'
            : 'border-border hover:border-text-muted/40'
        }`}
      >
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          min={min}
          max={max}
          step={step}
          className="w-full bg-transparent px-4 py-3 text-sm font-mono-data text-text-primary outline-none rounded-xl"
        />
        {unit && (
          <span className="pr-4 text-xs text-text-muted font-mono-data shrink-0">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
