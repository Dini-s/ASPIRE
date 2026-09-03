import React from "react";

import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Download,
  FileText,
  Filter,
  Info,
  Sparkles,
} from "lucide-react";

import {
  reportRows,
} from "./qaData";

/* ================================================================
   SUMMARY CARD
================================================================ */

const SummaryCard = ({
  title,
  rows,
}) => (
  <section
    className="
      rounded-xl
      border
      border-[#e2e7ef]
      bg-white
      p-5
    "
  >
    <h2
      className="
        text-[15px]
        font-bold
        text-[#18213e]
      "
    >
      {title}
    </h2>

    <div className="mt-4 space-y-3.5">
      {rows.map(
        (
          row
        ) => (
          <div
            key={
              row.label
            }
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <div className="flex items-center gap-3">
              <row.icon
                size={16}
                className={
                  row.iconColor
                }
              />

              <span
                className="
                  text-[12px]
                  font-semibold
                  text-[#27334e]
                "
              >
                {
                  row.label
                }
              </span>
            </div>

            <span
              className={`
                text-[13px]
                font-bold
                ${row.valueColor}
              `}
            >
              {
                row.value
              }
            </span>
          </div>
        )
      )}
    </div>
  </section>
);

/* ================================================================
   HELPERS
================================================================ */

const adequacyColor = (
  value
) => {
  if (
    value ===
    "Adequate"
  ) {
    return "text-[#0aa33e]";
  }

  if (
    value ===
    "Unsatisfied"
  ) {
    return "text-[#ff3030]";
  }

  return "text-[#f07800]";
};

const qualityColor = (
  value
) => {
  if (
    value === "Good"
  ) {
    return "text-[#0aa33e]";
  }

  if (
    value === "Poor"
  ) {
    return "text-[#ff3030]";
  }

  return "text-[#f07800]";
};

/* ================================================================
   BOTTOM CARD
================================================================ */

const BottomCard = ({
  title,
  items,
}) => (
  <section
    className="
      rounded-xl
      border
      border-[#e2e7ef]
      bg-white
      p-5
    "
  >
    <h2 className="text-[14px] font-bold text-[#18213e]">
      {title}
    </h2>

    <div className="mt-4 space-y-3">
      {items.map(
        (
          item
        ) => (
          <div
            key={
              item
            }
            className="
              flex
              items-start
              gap-3
            "
          >
            <span className="mt-0.5 text-[14px] font-bold text-[#3020ff]">
              ◇
            </span>

            <p
              className="
                text-[12px]
                font-semibold
                leading-[18px]
                text-[#27334e]
              "
            >
              {item}
            </p>
          </div>
        )
      )}
    </div>
  </section>
);

/* ================================================================
   PAGE
================================================================ */

const QAReportsAnalytics =
  () => {
    const exportCsv =
      () => {
        const header = [
          "Requirement ID",
          "Title",
          "Type",
          "RVC",
          "RVES",
          "Adequacy",
          "Test Quality",
          "Revalidation",
          "Recommendation",
        ].join(
          ","
        );

        const data =
          reportRows.map(
            (
              row
            ) =>
              [
                row.id,
                `"${row.title}"`,
                row.type,
                `${row.rvc}%`,
                row.rves,
                row.adequacy,
                row.quality,
                row.revalidation,
                `"${row.recommendation}"`,
              ].join(
                ","
              )
          );

        const blob =
          new Blob(
            [
              [
                header,
                ...data,
              ].join(
                "\n"
              ),
            ],
            {
              type:
                "text/csv",
            }
          );

        const url =
          URL.createObjectURL(
            blob
          );

        const link =
          document.createElement(
            "a"
          );

        link.href =
          url;

        link.download =
          "QA-Reports-Analytics.csv";

        link.click();

        URL.revokeObjectURL(
          url
        );
      };

    return (
      <div
        className="
          -m-4
          min-h-[calc(100vh-72px)]
          bg-white
          p-4

          sm:-m-6
          sm:p-6
        "
      >
        {/* ======================================================
            HEADING
        ====================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4

            lg:flex-row
            lg:items-start
            lg:justify-between
          "
        >
          <div>
            <h1
              className="
                text-[30px]
                font-bold
                tracking-[-0.5px]
                text-[#0c1435]
              "
            >
              QA Reports & Analytics
            </h1>

            <p
              className="
                mt-2
                text-[14px]
                font-semibold
                text-[#233c90]
              "
            >
              Comprehensive quality analysis across all requirements, evidence, and test assets.
            </p>
          </div>

          <div
            className="
              flex
              flex-col
              items-end
              gap-2
            "
          >
            {/* SAME EXPORT STYLE */}

            <button
              type="button"
              onClick={
                exportCsv
              }
              className="
                flex
                h-[44px]
                items-center
                overflow-hidden
                rounded-[7px]
                bg-gradient-to-r
                from-[#4E21FF]
                to-[#3111FF]
                text-[13px]
                font-semibold
                text-white
                shadow-sm
              "
            >
              <span
                className="
                  flex
                  h-full
                  items-center
                  gap-[9px]
                  px-[18px]
                "
              >
                <Download
                  size={17}
                />

                Export Report
              </span>

              <span
                className="
                  flex
                  h-full
                  w-[42px]
                  items-center
                  justify-center
                  border-l
                  border-white/20
                "
              >
                ⌄
              </span>
            </button>

            <button
              type="button"
              className="
                flex
                h-[38px]
                items-center
                gap-2
                rounded-lg
                border
                border-[#e2e7ef]
                bg-white
                px-4
                text-[12px]
                font-semibold
                text-[#3d24ff]
              "
            >
              <Filter
                size={15}
              />

              Filter
            </button>
          </div>
        </div>

        {/* ======================================================
            SUMMARY CARDS
        ====================================================== */}

        <div
          className="
            mt-5
            grid
            gap-4

            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          <SummaryCard
            title="Evidence Summary"
            rows={[
              {
                label:
                  "Total Evidence Items",
                value:
                  "96",
                icon:
                  FileText,
                iconColor:
                  "text-[#1e55ff]",
                valueColor:
                  "text-[#2837a0]",
              },
              {
                label:
                  "Strong Evidence (≥ 0.7)",
                value:
                  "58 (60%)",
                icon:
                  CheckCircle2,
                iconColor:
                  "text-[#13a044]",
                valueColor:
                  "text-[#2837a0]",
              },
              {
                label:
                  "Moderate Evidence (0.4 - 0.7)",
                value:
                  "28 (29%)",
                icon:
                  AlertTriangle,
                iconColor:
                  "text-[#ff7900]",
                valueColor:
                  "text-[#2837a0]",
              },
              {
                label:
                  "Weak Evidence (< 0.4)",
                value:
                  "10 (11%)",
                icon:
                  AlertTriangle,
                iconColor:
                  "text-[#ff3030]",
                valueColor:
                  "text-[#2837a0]",
              },
            ]}
          />

          <SummaryCard
            title="Test Quality Summary"
            rows={[
              {
                label:
                  "Passed Tests",
                value:
                  "142 (68%)",
                icon:
                  CheckCircle2,
                iconColor:
                  "text-[#13a044]",
                valueColor:
                  "text-[#13a044]",
              },
              {
                label:
                  "Failed Tests",
                value:
                  "34 (16%)",
                icon:
                  AlertTriangle,
                iconColor:
                  "text-[#ff3030]",
                valueColor:
                  "text-[#ff3030]",
              },
              {
                label:
                  "Skipped Tests",
                value:
                  "32 (16%)",
                icon:
                  CalendarDays,
                iconColor:
                  "text-[#ff7900]",
                valueColor:
                  "text-[#ff7900]",
              },
              {
                label:
                  "Total Tests",
                value:
                  "208",
                icon:
                  CalendarDays,
                iconColor:
                  "text-[#263cff]",
                valueColor:
                  "text-[#2837a0]",
              },
            ]}
          />

          <SummaryCard
            title="Revalidation Summary"
            rows={[
              {
                label:
                  "Revalidation Required",
                value:
                  "9",
                icon:
                  CalendarDays,
                iconColor:
                  "text-[#ff3030]",
                valueColor:
                  "text-[#ff3030]",
              },
              {
                label:
                  "Revalidation Recommended",
                value:
                  "12",
                icon:
                  AlertTriangle,
                iconColor:
                  "text-[#ff7900]",
                valueColor:
                  "text-[#ff7900]",
              },
              {
                label:
                  "Not Required",
                value:
                  "21",
                icon:
                  CheckCircle2,
                iconColor:
                  "text-[#13a044]",
                valueColor:
                  "text-[#13a044]",
              },
              {
                label:
                  "Total Requirements",
                value:
                  "42",
                icon:
                  CalendarDays,
                iconColor:
                  "text-[#243dff]",
                valueColor:
                  "text-[#2837a0]",
              },
            ]}
          />

          <SummaryCard
            title="AI Recommendations Summary"
            rows={[
              {
                label:
                  "Total Recommendations",
                value:
                  "42",
                icon:
                  Sparkles,
                iconColor:
                  "text-[#4332d2]",
                valueColor:
                  "text-[#2837a0]",
              },
              {
                label:
                  "Critical",
                value:
                  "9",
                icon:
                  AlertTriangle,
                iconColor:
                  "text-[#ff3030]",
                valueColor:
                  "text-[#ff3030]",
              },
              {
                label:
                  "Important",
                value:
                  "19",
                icon:
                  Info,
                iconColor:
                  "text-[#ff7900]",
                valueColor:
                  "text-[#ff7900]",
              },
              {
                label:
                  "Informational",
                value:
                  "14",
                icon:
                  Info,
                iconColor:
                  "text-[#075aff]",
                valueColor:
                  "text-[#2837a0]",
              },
            ]}
          />
        </div>

        {/* ======================================================
            REPORT TABLE
        ====================================================== */}

        <div
          className="
            mt-5
            overflow-hidden
            rounded-lg
            border
            border-[#e2e7ef]
          "
        >
          <div className="overflow-x-auto">
            <table
              className="
                w-full
                min-w-[1450px]
                bg-white
                text-left
              "
            >
              <thead className="bg-[#fafbfd]">
                <tr>
                  {[
                    "Requirement ID",
                    "Requirement Title",
                    "Type",
                    "RVC (Coverage)",
                    "RVES (Score)",
                    "Adequacy",
                    "Test Quality",
                    "Revalidation",
                    "AI Recommendation",
                  ].map(
                    (
                      heading
                    ) => (
                      <th
                        key={
                          heading
                        }
                        className="
                          px-4
                          py-4
                          text-[12px]
                          font-bold
                          text-[#283657]
                        "
                      >
                        {
                          heading
                        }
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {reportRows.map(
                  (
                    row
                  ) => (
                    <tr
                      key={
                        row.id
                      }
                      className="
                        border-t
                        border-[#edf0f4]
                        align-top
                      "
                    >
                      <td className="px-4 py-4 text-[13px] font-bold text-[#3f24ff]">
                        {
                          row.id
                        }
                      </td>

                      <td className="px-4 py-4 text-[12px] font-semibold text-[#24314c]">
                        {
                          row.title
                        }
                      </td>

                      <td className="px-4 py-4 text-[12px] font-semibold text-[#24314c]">
                        {
                          row.type
                        }
                      </td>

                      <td
                        className={`
                          px-4
                          py-4
                          text-[13px]
                          font-bold
                          ${
                            row.rvc >=
                            75
                              ? "text-[#0aa33e]"
                              : row.rvc >=
                                45
                              ? "text-[#ff7900]"
                              : "text-[#ff3030]"
                          }
                        `}
                      >
                        {
                          row.rvc
                        }
                        %
                      </td>

                      <td className="px-4 py-4">
                        <div className="text-[13px] font-bold text-[#2839a0]">
                          {
                            row.rves
                          }
                        </div>

                        <div
                          className={`
                            mt-1
                            text-[11px]
                            font-semibold
                            ${
                              row.rves >=
                              0.7
                                ? "text-[#0aa33e]"
                                : row.rves >=
                                  0.4
                                ? "text-[#ff7900]"
                                : "text-[#ff3030]"
                            }
                          `}
                        >
                          {row.rves >=
                          0.7
                            ? "Strong"
                            : row.rves >=
                              0.4
                            ? "Moderate"
                            : "Weak"}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div
                          className={`
                            text-[12px]
                            font-semibold
                            ${adequacyColor(
                              row.adequacy
                            )}
                          `}
                        >
                          {
                            row.adequacy
                          }
                        </div>

                        <div className="mt-1 text-[11px] font-semibold text-[#324297]">
                          {
                            row.rvus
                          }
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div
                          className={`
                            text-[12px]
                            font-semibold
                            ${qualityColor(
                              row.quality
                            )}
                          `}
                        >
                          {
                            row.quality
                          }
                        </div>

                        <div className="mt-1 text-[11px] font-medium text-[#4c5b77]">
                          {
                            row.qualityText
                          }
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div
                          className={`
                            text-[12px]
                            font-semibold
                            ${
                              row.revalidation ===
                              "Required"
                                ? "text-[#ff3030]"
                                : row.revalidation ===
                                  "Recommended"
                                ? "text-[#ff7900]"
                                : "text-[#33419a]"
                            }
                          `}
                        >
                          {row.revalidation ===
                          "Not Required"
                            ? "-"
                            : row.revalidation}
                        </div>

                        <div className="mt-1 text-[11px] font-medium text-[#4c5b77]">
                          {row.due
                            ? `Due: ${row.due}`
                            : "Not Required"}
                        </div>
                      </td>

                      <td
                        className="
                          px-4
                          py-4
                          text-[12px]
                          font-semibold
                          leading-[18px]
                          text-[#283657]
                        "
                      >
                        {
                          row.recommendation
                        }
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}

          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-[#edf0f4]
              px-4
              py-3
            "
          >
            <span className="text-[12px] font-medium text-[#40506b]">
              Showing 1 to 8 of 42 requirements
            </span>

            <div className="flex gap-2">
              <button className="h-8 w-8 rounded border border-[#dfe4ec]">
                ‹
              </button>

              <button className="h-8 w-8 rounded bg-[#4324ff] text-[12px] font-bold text-white">
                1
              </button>

              <button className="h-8 w-8 rounded border border-[#dfe4ec] text-[12px]">
                2
              </button>

              <button className="h-8 w-8 rounded border border-[#dfe4ec] text-[12px]">
                3
              </button>

              <button className="h-8 w-8 rounded border border-[#dfe4ec]">
                ›
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================
            BOTTOM CARDS
        ====================================================== */}

        <div
          className="
            mt-5
            grid
            gap-4

            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          <BottomCard
            title="AI Recommendations Insights"
            items={[
              "9 requirements need immediate revalidation.",
              "19 requirements have important recommendations.",
              "Focus on improving test coverage for security and boundary scenarios.",
              "Consider adding performance tests for search and booking features.",
            ]}
          />

          <BottomCard
            title="Revalidation Guidance"
            items={[
              'Requirements marked as "Required" must be revalidated within the due date.',
              "Recommended revalidations help maintain quality over time.",
              "Revalidation ensures continued alignment with acceptance criteria.",
            ]}
          />

          <BottomCard
            title="Risk Areas Identified"
            items={[
              "Low coverage requirements may lead to defects in production.",
              "Weak evidence areas impact overall confidence.",
              "Address poor test quality to improve reliability and reduce risk.",
            ]}
          />

          <section
            className="
              rounded-xl
              border
              border-[#e2e7ef]
              bg-white
              p-5
            "
          >
            <h2 className="text-[14px] font-bold text-[#18213e]">
              Report Information
            </h2>

            <div className="mt-5 space-y-5">
              {[
                [
                  "Report Generated On",
                  "May 28, 2025 10:24 AM",
                ],
                [
                  "Total Requirements",
                  "42",
                ],
                [
                  "Analysis Scope",
                  "All Requirements",
                ],
                [
                  "Data Source",
                  "USKG, Test Results, Evidence Store",
                ],
              ].map(
                ([
                  label,
                  value,
                ]) => (
                  <div
                    key={
                      label
                    }
                    className="
                      flex
                      justify-between
                      gap-4
                    "
                  >
                    <span className="text-[12px] font-semibold text-[#293998]">
                      {
                        label
                      }
                    </span>

                    <span className="text-right text-[12px] font-semibold text-[#293998]">
                      {
                        value
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          </section>
        </div>
      </div>
    );
  };

export default QAReportsAnalytics;