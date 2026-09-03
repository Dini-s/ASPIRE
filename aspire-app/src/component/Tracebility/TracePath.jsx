import { Check, ChevronRight } from "lucide-react";

export const TracePath = ({ trace }) => {
  return (
    <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3">
      <div className="grid grid-cols-[1fr_20px_1fr_20px_1fr] items-center gap-1">
        <TraceNode label="REQUIREMENT" value={trace.requirement} />

        <ChevronRight size={12} className="text-slate-300" />

        <TraceNode label="RVU · FROM C3" value={trace.rvu} />

        <ChevronRight size={12} className="text-slate-300" />

        <TraceNode label="CODE · C4 LINK" value={trace.component} />
      </div>

      <div className="mt-3 border-t border-slate-200 pt-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
            <Check size={11} />
          </div>

          <div>
            <p className="text-[6px] font-bold uppercase text-indigo-500">
              Evidence · From C4
            </p>

            <p className="mt-0.5 text-[11px] font-semibold text-slate-700">
              {trace.evidence}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TraceNode = ({ label, value }) => (
  <div className="min-w-0">
    <p className="text-[5px] font-semibold uppercase text-slate-400">{label}</p>

    <p className="mt-1 truncate text-[11px] font-semibold text-slate-700">
      {value}
    </p>
  </div>
);
