import React from "react";

import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Download,
  Filter,
  Search,
  Sparkles,
} from "lucide-react";

/* ================================================================
   BADGE STYLES
================================================================ */

const badgeStyles = {
  Adequate:
    "bg-emerald-50 text-emerald-700 border-emerald-200",

  Good:
    "bg-emerald-50 text-emerald-700 border-emerald-200",

  PASS:
    "bg-emerald-50 text-emerald-700 border-emerald-200",

  Strong:
    "bg-emerald-50 text-emerald-700 border-emerald-200",

  Reusable:
    "bg-emerald-50 text-emerald-700 border-emerald-200",

  Keep:
    "bg-emerald-50 text-emerald-700 border-emerald-200",

  Partial:
    "bg-amber-50 text-amber-700 border-amber-200",

  Moderate:
    "bg-amber-50 text-amber-700 border-amber-200",

  Medium:
    "bg-amber-50 text-amber-700 border-amber-200",

  Modify:
    "bg-amber-50 text-amber-700 border-amber-200",

  Update:
    "bg-amber-50 text-amber-700 border-amber-200",

  Recommended:
    "bg-amber-50 text-amber-700 border-amber-200",

  "Needs Attention":
    "bg-amber-50 text-amber-700 border-amber-200",

  High:
    "bg-rose-50 text-rose-700 border-rose-200",

  Inadequate:
    "bg-rose-50 text-rose-700 border-rose-200",

  Unsatisfied:
    "bg-rose-50 text-rose-700 border-rose-200",

  Outdated:
    "bg-rose-50 text-rose-700 border-rose-200",

  Replace:
    "bg-rose-50 text-rose-700 border-rose-200",

  Required:
    "bg-rose-50 text-rose-700 border-rose-200",

  Poor:
    "bg-rose-50 text-rose-700 border-rose-200",

  Weak:
    "bg-orange-50 text-orange-700 border-orange-200",

  Low:
    "bg-sky-50 text-sky-700 border-sky-200",

  Functional:
    "bg-blue-50 text-blue-700 border-blue-200",

  Security:
    "bg-violet-50 text-violet-700 border-violet-200",

  Reliability:
    "bg-emerald-50 text-emerald-700 border-emerald-200",

  Performance:
    "bg-emerald-50 text-emerald-700 border-emerald-200",

  "Non-Functional":
    "bg-violet-50 text-violet-700 border-violet-200",

  "New Evidence":
    "bg-indigo-50 text-indigo-700 border-indigo-200",

  Create:
    "bg-indigo-50 text-indigo-700 border-indigo-200",

  "Not Required":
    "bg-slate-50 text-slate-600 border-slate-200",
};

/* ================================================================
   BADGE
================================================================ */

export function Badge({
  children,
  value,
  className = "",
}) {
  const key = value || children;

  return (
    <span
      className={`
        inline-flex
        items-center
        whitespace-nowrap
        rounded-md
        border
        px-2
        py-0.5
        text-[11px]
        font-semibold
        ${
          badgeStyles[key] ||
          "border-slate-200 bg-slate-50 text-slate-600"
        }
        ${className}
      `}
    >
      {children ?? value}
    </span>
  );
}

/* ================================================================
   CARD
================================================================ */

export function Card({
  children,
  className = "",
}) {
  return (
    <section
      className={`
        rounded-xl
        border
        border-slate-200
        bg-white
        shadow-sm
        shadow-slate-100/60
        ${className}
      `}
    >
      {children}
    </section>
  );
}

/* ================================================================
   SECTION TITLE
================================================================ */

export function SectionTitle({
  title,
  subtitle,
  right,
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">

      <div>
        <h2 className="text-sm font-bold text-slate-900">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-xs text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {right}

    </div>
  );
}

/* ================================================================
   METRIC CARD
================================================================ */

export function MetricCard({
  icon: Icon,
  label,
  value,
  helper,
  tone = "indigo",
}) {
  const tones = {
    indigo: {
      wrap: "bg-indigo-50",
      icon: "text-indigo-600",
      value: "text-slate-950",
    },

    blue: {
      wrap: "bg-blue-50",
      icon: "text-blue-600",
      value: "text-blue-700",
    },

    green: {
      wrap: "bg-emerald-50",
      icon: "text-emerald-600",
      value: "text-emerald-600",
    },

    orange: {
      wrap: "bg-orange-50",
      icon: "text-orange-500",
      value: "text-orange-600",
    },

    red: {
      wrap: "bg-rose-50",
      icon: "text-rose-600",
      value: "text-rose-600",
    },
  };

  const selected = tones[tone] || tones.indigo;

  return (
    <Card className="p-4 sm:p-5">

      <div className="flex items-center gap-4">

        <div
          className={`
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${selected.wrap}
          `}
        >
          <Icon
            size={25}
            className={selected.icon}
          />
        </div>

        <div className="min-w-0">

          <p className="text-xs font-semibold text-slate-600">
            {label}
          </p>

          <p
            className={`
              mt-1
              text-2xl
              font-bold
              tracking-tight
              ${selected.value}
            `}
          >
            {value}
          </p>

          {helper && (
            <p className="mt-1 text-[11px] text-slate-500">
              {helper}
            </p>
          )}

        </div>
      </div>

    </Card>
  );
}

/* ================================================================
   PAGE HEADING
================================================================ */

export function PageHeading({
  title,
  subtitle,
  badge,
  actions,
}) {
  return (
    <div
      className="
        mb-5
        flex
        flex-col
        gap-4
        xl:flex-row
        xl:items-start
        xl:justify-between
      "
    >

      <div className="min-w-0">

        <div className="flex flex-wrap items-center gap-3">

          <h1
            className="
              text-2xl
              font-bold
              tracking-tight
              text-slate-950
              sm:text-[28px]
            "
          >
            {title}
          </h1>

          {badge}

        </div>

        {subtitle && (
          <p className="mt-1.5 max-w-4xl text-sm text-blue-700">
            {subtitle}
          </p>
        )}

      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-2">
          {actions}
        </div>
      )}

    </div>
  );
}

/* ================================================================
   PRIMARY BUTTON
================================================================ */

export function PrimaryButton({
  children,
  icon: Icon,
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex
        h-10
        items-center
        justify-center
        gap-2
        rounded-lg
        bg-gradient-to-r
        from-indigo-600
        to-violet-600
        px-4
        text-xs
        font-semibold
        text-white
        shadow-sm
        transition
        hover:from-indigo-700
        hover:to-violet-700
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${className}
      `}
    >

      {Icon && <Icon size={16} />}

      {children}

    </button>
  );
}

/* ================================================================
   SECONDARY BUTTON
================================================================ */

export function SecondaryButton({
  children,
  icon: Icon,
  onClick,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex
        h-10
        items-center
        justify-center
        gap-2
        rounded-lg
        border
        border-slate-200
        bg-white
        px-4
        text-xs
        font-semibold
        text-slate-700
        shadow-sm
        transition
        hover:border-indigo-200
        hover:bg-indigo-50
        hover:text-indigo-700
        ${className}
      `}
    >

      {Icon && <Icon size={16} />}

      {children}

    </button>
  );
}

/* ================================================================
   EXPORT BUTTON
================================================================ */

export function ExportButton({
  onClick,
  label = "Export Report",
}) {
  return (
    <div className="inline-flex overflow-hidden rounded-lg shadow-sm">

      <button
        type="button"
        onClick={onClick}
        className="
          inline-flex
          h-10
          items-center
          gap-2
          bg-gradient-to-r
          from-indigo-600
          to-violet-600
          px-4
          text-xs
          font-semibold
          text-white
          hover:from-indigo-700
          hover:to-violet-700
        "
      >
        <Download size={16} />

        {label}
      </button>

      <button
        type="button"
        aria-label="More export options"
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          border-l
          border-white/20
          bg-violet-600
          text-white
          hover:bg-violet-700
        "
      >
        <ChevronDown size={16} />
      </button>

    </div>
  );
}

/* ================================================================
   FILTER BUTTON
================================================================ */

export function FilterButton({
  onClick,
}) {
  return (
    <SecondaryButton
      icon={Filter}
      onClick={onClick}
    >
      Filter
    </SecondaryButton>
  );
}

/* ================================================================
   SEARCH INPUT
================================================================ */

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <label className="relative block min-w-0 flex-1">

      <Search
        size={17}
        className="
          pointer-events-none
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="
          h-11
          w-full
          rounded-lg
          border
          border-slate-200
          bg-white
          pl-10
          pr-3
          text-sm
          text-slate-700
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-indigo-300
          focus:ring-4
          focus:ring-indigo-100
        "
      />

    </label>
  );
}

/* ================================================================
   SELECT FILTER
================================================================ */

export function SelectFilter({
  value,
  onChange,
  label,
  options,
}) {
  return (
    <label className="relative block">

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="
          h-11
          appearance-none
          rounded-lg
          border
          border-slate-200
          bg-white
          pl-3
          pr-9
          text-xs
          font-semibold
          text-slate-700
          outline-none
          transition
          focus:border-indigo-300
          focus:ring-4
          focus:ring-indigo-100
        "
      >

        <option value="All">
          {label}: All
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {label}: {option}
          </option>
        ))}

      </select>

      <ChevronDown
        size={14}
        className="
          pointer-events-none
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />

    </label>
  );
}

/* ================================================================
   SCORE TEXT
================================================================ */

export function ScoreText({
  value,
}) {
  const tone =
    value >= 0.7
      ? "text-emerald-600"
      : value >= 0.4
        ? "text-amber-600"
        : "text-rose-600";

  const label =
    value >= 0.7
      ? "Strong"
      : value >= 0.4
        ? "Moderate"
        : "Weak";

  return (
    <div className="leading-tight">

      <div className={`font-bold ${tone}`}>
        {value.toFixed(2)}
      </div>

      <div className={`text-[10px] font-semibold ${tone}`}>
        {label}
      </div>

    </div>
  );
}

/* ================================================================
   SEMANTIC SCORE
================================================================ */

export function SemanticScore({
  value,
}) {
  const tone =
    value >= 80
      ? "text-emerald-600"
      : value >= 65
        ? "text-orange-500"
        : "text-rose-600";

  return (
    <span className={`font-bold ${tone}`}>
      {value}%
    </span>
  );
}

/* ================================================================
   EMPTY STATE
================================================================ */

export function EmptyState({
  title = "No matching data",
  message = "Try changing the filters.",
}) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        px-6
        py-14
        text-center
      "
    >

      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          bg-slate-100
          text-slate-500
        "
      >
        <Search size={20} />
      </div>

      <p className="mt-3 text-sm font-semibold text-slate-800">
        {title}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {message}
      </p>

    </div>
  );
}

/* ================================================================
   FINDING ROW
================================================================ */

export function FindingRow({
  children,
  index,
  info = false,
}) {
  const Icon =
    info
      ? CheckCircle2
      : index === 0
        ? AlertTriangle
        : Sparkles;

  const color =
    info
      ? "text-blue-600"
      : index === 0
        ? "text-rose-600"
        : "text-orange-500";

  return (
    <div className="flex gap-3 py-2.5">

      <Icon
        size={16}
        className={`mt-0.5 shrink-0 ${color}`}
      />

      <p className="text-xs leading-5 text-slate-700">
        {children}
      </p>

    </div>
  );
}

/* ================================================================
   TABLE SHELL
================================================================ */

export function TableShell({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        overflow-x-auto
        rounded-xl
        border
        border-slate-200
        bg-white
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/* ================================================================
   CSV EXPORT
================================================================ */

export function downloadCsv(
  filename,
  rows,
) {
  if (!rows?.length) {
    return;
  }

  const headers = Object.keys(rows[0]);

  const escape = (value) =>
    `"${String(value ?? "").replaceAll('"', '""')}"`;

  const csv = [
    headers.map(escape).join(","),

    ...rows.map((row) =>
      headers
        .map((header) => escape(row[header]))
        .join(","),
    ),
  ].join("\n");

  const blob = new Blob(
    [csv],
    {
      type: "text/csv;charset=utf-8;",
    },
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download = filename;

  link.click();

  URL.revokeObjectURL(url);
}