import { GitBranch, Sparkles, TriangleAlert } from "lucide-react";

export const BottomCard = ({ card }) => {
  const iconMap = {
    graph: GitBranch,
    warning: TriangleAlert,
    sparkles: Sparkles,
  };

  const Icon = iconMap[card.icon];

  return (
    <div
      className="
        group
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-indigo-200
        hover:shadow-md
      "
    >
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Icon size={14} />
        </div>

        <div>
          <h3 className="text-[12px] font-bold text-slate-800">{card.title}</h3>

          <p className="mt-1 text-[11px] leading-4 text-slate-400">
            {card.description}
          </p>
        </div>
      </div>
    </div>
  );
};
