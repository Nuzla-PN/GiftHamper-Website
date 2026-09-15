'use client';

export default function StatsCard({ icon: Icon, label, value, color = 'primary' }) {
  const colorStyles = {
    primary: {
      iconBg: 'bg-[#8B3A62]/10',
      iconText: 'text-[#8B3A62]',
      bar: 'bg-[#8B3A62]',
    },
    secondary: {
      iconBg: 'bg-[#D4AF37]/10',
      iconText: 'text-[#D4AF37]',
      bar: 'bg-[#D4AF37]',
    },
    green: {
      iconBg: 'bg-emerald-50',
      iconText: 'text-emerald-600',
      bar: 'bg-emerald-500',
    },
    blue: {
      iconBg: 'bg-blue-50',
      iconText: 'text-blue-600',
      bar: 'bg-blue-500',
    },
  };

  const style = colorStyles[color] || colorStyles.primary;

  return (
    <div className="stat-card group">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 flex items-center justify-center ${style.iconBg} ${style.iconText}`}>
          <Icon size={22} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 font-mono">{label}</p>
          <p className="text-2xl font-bold text-[#1a1a2e] mt-0.5">{value ?? 0}</p>
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${style.bar}`} />
    </div>
  );
}
