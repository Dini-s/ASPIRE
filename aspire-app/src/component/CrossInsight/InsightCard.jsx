import React from "react";
import { AlertTriangle, ArrowRight, Network, ShieldAlert } from "lucide-react";

const severityConfig = {
  High: {
    icon: ShieldAlert,
    badge: "bg-red-50 text-red-600",
    border: "border-red-200",
  },

  Medium: {
    icon: AlertTriangle,
    badge: "bg-orange-50 text-orange-600",
    border: "border-orange-200",
  },

  Low: {
    icon: Network,
    badge: "bg-emerald-50 text-emerald-600",
    border: "border-emerald-200",
  },
};

const InsightCard = ({ insight, selected, onClick }) => {
  const config = severityConfig[insight.severity] || severityConfig.Low;

  const Icon = config.icon;

  return (
    <button
      type="button"
      onClick={() => onClick(insight)}
      className={`
        group
        w-full
        rounded-xl
        border
        bg-white
        p-3
        text-left
        transition-all
        duration-200
        hover:-translate-y-[1px]
        hover:shadow-sm

        ${
          selected
            ? "border-blue-300 bg-blue-50/40 shadow-sm"
            : "border-slate-200"
        }
      `}
    >
      <div className="flex gap-3">
        <div
          className={`
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            ${config.badge}
          `}
        >
          <Icon size={15} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`
                rounded-md
                px-2
                py-1
                text-[11px]
                font-semibold
                ${config.badge}
              `}
            >
              {insight.severity}
            </span>

            <span className="text-[11px] text-slate-400">
              {insight.confidence}% confidence
            </span>
          </div>

          <h3 className="mt-2 text-[12px] font-bold text-slate-800">
            {insight.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-[12px] leading-4 text-slate-500">
            {insight.description}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="rounded bg-indigo-50 px-2 py-1 text-[11px] font-medium text-indigo-600">
              {insight.category}
            </span>

            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              {insight.relationship}
            </span>
          </div>
        </div>

        <ArrowRight
          size={12}
          className="
            mt-5
            shrink-0
            text-slate-300
            transition
            group-hover:translate-x-0.5
            group-hover:text-blue-500
          "
        />
      </div>
    </button>
  );
};

export default InsightCard;
