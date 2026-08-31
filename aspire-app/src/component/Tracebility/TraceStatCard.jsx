import {
  Activity,
  GitBranch,
  Link2,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

export const TraceStatCard = ({ stat }) => {
  const iconMap = {
    activity: Activity,
    link: Link2,
    decay: GitBranch,
    warning: TriangleAlert,
    sparkles: Sparkles,
  };

  const Icon = iconMap[stat.icon];

  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-600",
    green: "bg-emerald-50 text-emerald-600",
    red: "bg-red-50 text-red-500",
    orange: "bg-orange-50 text-orange-500",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center gap-2">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${colorMap[stat.color]}`}
        >
          <Icon size={15} />
        </div>

        <div>
          <p className="text-[11px] text-slate-400">{stat.label}</p>

          <p className="text-lg font-bold leading-5 text-slate-900">
            {stat.value}
          </p>
        </div>
      </div>

      <p className="mt-2 text-[11px] text-slate-400">{stat.subtitle}</p>
    </div>
  );
};
