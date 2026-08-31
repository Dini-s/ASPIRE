import { Sparkles } from "lucide-react";

export const LLMJustification = ({ trace }) => {
  const isOrphan = trace.status === "ORPHAN";

  return (
    <section className="mt-3 rounded-xl border border-purple-100 bg-purple-50/60 p-3">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-purple-600 shadow-sm">
          <Sparkles size={14} />
        </div>

        <div>
          <p className="text-[6px] font-bold uppercase tracking-wider text-purple-600">
            LLM Trace Justification
          </p>

          <p className="mt-0.5 text-[12px] font-bold text-slate-800">
            {isOrphan ? "No verified decision" : "Verified decision"}
          </p>
        </div>
      </div>

      <p className="mt-3 text-[12px] leading-4 text-purple-700">
        {isOrphan
          ? "The requirement currently has no verified implementation or evidence link. Additional repository evidence is required."
          : "The method handles the required behaviour and records the relevant evidence. Its behaviour directly implements the RVU and the evidence supports the expected outcome."}
      </p>
    </section>
  );
};
