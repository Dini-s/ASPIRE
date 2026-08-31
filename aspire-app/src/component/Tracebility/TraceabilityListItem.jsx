export const TraceabilityListItem = ({
  item,
  selected,
  onClick,
}) => {

  const statusStyle = {
    VERIFIED: "bg-emerald-50 text-emerald-600",
    DECAYED: "bg-red-50 text-red-500",
    ORPHAN: "bg-orange-50 text-orange-500",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full
        border-t
        border-slate-100
        p-3
        text-left
        transition-all
        duration-200
        ${
          selected
            ? "bg-indigo-50/80"
            : "bg-white hover:bg-slate-50"
        }
      `}
    >

      <div className="flex items-start justify-between gap-3">

        <div className="min-w-0 flex-1">

          <div className="flex items-center gap-2">

            <span className="text-[6px] font-bold text-indigo-500">
              {item.id}
            </span>

            <span className="text-[6px] text-slate-400">
              {item.rvu}
            </span>

          </div>

          <h3 className="mt-2 text-[11px] font-bold text-slate-800">
            {item.title}
          </h3>

          <p className="mt-1 truncate text-[6px] text-slate-400">
            {item.code}
          </p>

        </div>

        <span
          className={`
            shrink-0
            rounded-full
            px-2
            py-1
            text-[6px]
            font-bold
            ${statusStyle[item.status]}
          `}
        >
          {item.status}
        </span>

      </div>


      {/* confidence */}

      <div className="mt-3 flex items-center gap-2">

        <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200">

          <div
            className={`
              h-full
              rounded-full
              transition-all
              duration-500
              ${
                item.status === "VERIFIED"
                  ? "bg-indigo-500"
                  : item.status === "DECAYED"
                    ? "bg-red-500"
                    : "bg-slate-300"
              }
            `}
            style={{
              width: `${item.confidence}%`,
            }}
          />

        </div>

        <span className="text-[6px] font-medium text-slate-400">
          {item.confidence}%
        </span>

      </div>

    </button>
  );
};