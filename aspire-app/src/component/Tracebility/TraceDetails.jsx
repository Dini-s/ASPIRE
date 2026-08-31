import { Check, RefreshCcw, Sparkles } from "lucide-react";
import { LLMJustification } from "./LLMJustification";
import { TracePath } from "./TracePath";

export const TraceDetails = ({ trace, confirmed, onConfirm }) => {
  if (!trace) {
    return (
      <div className="flex h-full items-center justify-center text-xs text-slate-400">
        Select a traceability link.
      </div>
    );
  }

  return (
    <div className="h-full">
      {/* HEADER */}

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-indigo-600">
              {trace.id}
            </span>

            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[6px] font-bold text-emerald-600">
              {trace.status}
            </span>
          </div>

          <h2 className="mt-2 text-sm font-bold text-slate-800">
            Verified trace path
          </h2>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600">
          <Sparkles size={12} />
          Confidence {trace.confidence}%
        </div>
      </div>

      {/* TRACE PATH */}

      <TracePath trace={trace} />

      {/* LLM JUSTIFICATION */}

      <LLMJustification trace={trace} />

      {/* ACTIONS */}

      <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={onConfirm}
          disabled={confirmed}
          className={`
            flex
            items-center
            gap-2
            rounded-lg
            px-3
            py-2
            text-[12px]
            font-semibold
            text-white
            transition
            ${
              confirmed ? "bg-emerald-500" : "bg-indigo-600 hover:bg-indigo-700"
            }
          `}
        >
          {confirmed ? (
            <>
              <Check size={11} />
              Decision Confirmed
            </>
          ) : (
            <>
              <Check size={11} />
              Confirm decision
            </>
          )}
        </button>

        <button
          className="
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-slate-200
            bg-white
            px-3
            py-2
            text-[12px]
            font-medium
            text-slate-600
            transition
            hover:bg-slate-50
          "
        >
          <RefreshCcw size={10} />
          Re-verify
        </button>
      </div>
    </div>
  );
};
