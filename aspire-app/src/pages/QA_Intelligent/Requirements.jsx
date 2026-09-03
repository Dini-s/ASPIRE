import React, {
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Activity,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Filter,
  Layers3,
  PieChart,
  Search,
  ShieldCheck,
} from "lucide-react";

import {
  requirementsGrid,
} from "./qaData";

/* ================================================================
   COLORS
================================================================ */

const typeClasses = {
  Functional:
    "bg-[#e8f2ff] text-[#0866ff]",

  Performance:
    "bg-[#e5f8eb] text-[#159e45]",

  Security:
    "bg-[#efebff] text-[#4a25ff]",

  Reliability:
    "bg-[#e5f8eb] text-[#159e45]",
};

const riskClasses = {
  High:
    "bg-[#ffe9e9] text-[#ff2929]",

  Medium:
    "bg-[#fff1df] text-[#ed7800]",

  Low:
    "bg-[#e5f8eb] text-[#159e45]",
};

const statusClasses = {
  Adequate:
    "bg-[#e5f8eb] text-[#159e45]",

  Partial:
    "bg-[#fff1df] text-[#ed7800]",

  Inadequate:
    "bg-[#ffe9e9] text-[#ff2929]",
};

/* ================================================================
   TOP METRIC
================================================================ */

const TopMetric = ({
  icon: Icon,
  value,
  label,
}) => (
  <div
    className="
      flex
      h-[112px]
      items-center
      rounded-xl
      border
      border-[#e1e6ef]
      bg-white
      px-6
    "
  >
    <div
      className="
        flex
        h-[58px]
        w-[58px]
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-[#f1efff]
        text-[#4d27ff]
      "
    >
      <Icon
        size={29}
        strokeWidth={1.8}
      />
    </div>

    <div className="ml-5">
      <div
        className="
          text-[29px]
          font-bold
          leading-none
          text-[#0d1536]
        "
      >
        {value}
      </div>

      <div
        className="
          mt-3
          text-[13px]
          font-medium
          text-[#354263]
        "
      >
        {label}
      </div>
    </div>
  </div>
);

/* ================================================================
   PAGE
================================================================ */

const Requirements = () => {
  const navigate =
    useNavigate();

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    type,
    setType,
  ] = useState("All");

  const [
    status,
    setStatus,
  ] = useState("All");

  const [
    risk,
    setRisk,
  ] = useState("All");

  const [
    selected,
    setSelected,
  ] = useState(
    requirementsGrid.find(
      (requirement) =>
        requirement.id ===
        "REQ-014"
    )
  );

  /* ==============================================================
     FILTERED DATA
  ============================================================== */

  const filtered =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return requirementsGrid.filter(
        (row) => {
          const searchOk =
            !query ||
            row.id
              .toLowerCase()
              .includes(query) ||
            row.title
              .toLowerCase()
              .includes(query);

          const typeOk =
            type === "All" ||
            row.type === type;

          const statusOk =
            status === "All" ||
            row.status ===
              status;

          const riskOk =
            risk === "All" ||
            row.risk === risk;

          return (
            searchOk &&
            typeOk &&
            statusOk &&
            riskOk
          );
        }
      );
    }, [
      search,
      type,
      status,
      risk,
    ]);

  /* ==============================================================
     OPEN ROW
  ============================================================== */

  const openRow = (
    row
  ) => {
    setSelected(row);

    if (row.detailsId) {
      navigate(
        `/quality/requirement-details/${row.detailsId}`
      );
    }
  };

  /* ==============================================================
     EXPORT REQUIREMENTS
  ============================================================== */

  const exportRequirements =
    () => {
      const rows =
        filtered.map(
          (row) => ({
            ID: row.id,

            Requirement:
              row.title,

            Type: row.type,

            Risk: row.risk,

            RVUs: row.rvus,

            "Adequate RVUs":
              row.adequate,

            RVC:
              `${row.rvc}%`,

            RVES:
              row.rves,

            Status:
              row.status,

            Updated:
              row.updated,
          })
        );

      if (!rows.length) {
        return;
      }

      const headers =
        Object.keys(
          rows[0]
        );

      const escapeCsv = (
        value
      ) =>
        `"${String(
          value ?? ""
        ).replaceAll(
          '"',
          '""'
        )}"`;

      const csv = [
        headers
          .map(escapeCsv)
          .join(","),

        ...rows.map(
          (row) =>
            headers
              .map(
                (
                  header
                ) =>
                  escapeCsv(
                    row[
                      header
                    ]
                  )
              )
              .join(",")
        ),
      ].join("\n");

      const blob =
        new Blob(
          [csv],
          {
            type:
              "text/csv;charset=utf-8;",
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

      link.href = url;

      link.download =
        "QA-Requirements-Report.csv";

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
          TITLE + EXPORT
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
              tracking-[-0.6px]
              text-[#0b1232]
            "
          >
            Requirements
          </h1>

          <p
            className="
              mt-2
              text-[15px]
              font-medium
              text-[#354263]
            "
          >
            All requirements analyzed by Quality & Testing Intelligence (C3)
          </p>
        </div>

        {/* ==================================================
            EXPORT REPORT
            Same style as Requirement Details page
        ================================================== */}

        <button
          type="button"
          onClick={
            exportRequirements
          }
          className="
            flex
            h-[44px]
            shrink-0
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
            transition

            hover:from-[#4320E8]
            hover:to-[#2910E7]
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
      </div>

      {/* ======================================================
          METRICS
      ====================================================== */}

      <div
        className="
          mt-6
          grid
          gap-4

          sm:grid-cols-2
          xl:grid-cols-5
        "
      >
        <TopMetric
          icon={FileText}
          value="42"
          label="Total Requirements"
        />

        <TopMetric
          icon={Layers3}
          value="121"
          label="Total RVUs"
        />

        <TopMetric
          icon={
            ShieldCheck
          }
          value="94"
          label="Adequate RVUs"
        />

        <TopMetric
          icon={PieChart}
          value="78%"
          label="Overall RVC"
        />

        <TopMetric
          icon={Activity}
          value="0.82"
          label="Avg. RVES"
        />
      </div>

      {/* ======================================================
          MAIN GRID
      ====================================================== */}

      <div
        className="
          mt-6
          grid
          gap-5

          2xl:grid-cols-[minmax(0,1fr)_230px]
        "
      >
        <div className="min-w-0">

          {/* ==================================================
              SEARCH / FILTERS
          ================================================== */}

          <div
            className="
              flex
              flex-col
              gap-3

              xl:flex-row
            "
          >

            {/* SEARCH */}

            <label
              className="
                relative
                min-w-0
                flex-1
              "
            >
              <Search
                size={19}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[#394768]
                "
              />

              <input
                value={
                  search
                }
                onChange={(
                  event
                ) =>
                  setSearch(
                    event.target
                      .value
                  )
                }
                placeholder="Search requirements..."
                className="
                  h-[48px]
                  w-full
                  rounded-lg
                  border
                  border-[#dfe4ec]
                  bg-white
                  pl-12
                  pr-4
                  text-[14px]
                  text-[#17213e]
                  outline-none
                  transition

                  placeholder:text-[#8792a8]

                  focus:border-[#4d27ff]
                  focus:ring-4
                  focus:ring-[#4d27ff]/10
                "
              />
            </label>

            <div
              className="
                flex
                flex-wrap
                gap-3
              "
            >

              {/* TYPE */}

              <label className="relative">
                <select
                  value={
                    type
                  }
                  onChange={(
                    event
                  ) =>
                    setType(
                      event.target
                        .value
                    )
                  }
                  className="
                    h-[48px]
                    min-w-[145px]
                    appearance-none
                    rounded-lg
                    border
                    border-[#dfe4ec]
                    bg-white
                    pl-4
                    pr-10
                    text-[13px]
                    font-semibold
                    text-[#17213e]
                    outline-none
                    transition

                    focus:border-[#4d27ff]
                    focus:ring-4
                    focus:ring-[#4d27ff]/10
                  "
                >
                  <option value="All">
                    Type: All
                  </option>

                  <option value="Functional">
                    Type: Functional
                  </option>

                  <option value="Performance">
                    Type: Performance
                  </option>

                  <option value="Security">
                    Type: Security
                  </option>

                  <option value="Reliability">
                    Type: Reliability
                  </option>
                </select>

                <ChevronDown
                  size={15}
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-[#34415e]
                  "
                />
              </label>

              {/* STATUS */}

              <label className="relative">
                <select
                  value={
                    status
                  }
                  onChange={(
                    event
                  ) =>
                    setStatus(
                      event.target
                        .value
                    )
                  }
                  className="
                    h-[48px]
                    min-w-[155px]
                    appearance-none
                    rounded-lg
                    border
                    border-[#dfe4ec]
                    bg-white
                    pl-4
                    pr-10
                    text-[13px]
                    font-semibold
                    text-[#17213e]
                    outline-none
                    transition

                    focus:border-[#4d27ff]
                    focus:ring-4
                    focus:ring-[#4d27ff]/10
                  "
                >
                  <option value="All">
                    Status: All
                  </option>

                  <option value="Adequate">
                    Status: Adequate
                  </option>

                  <option value="Partial">
                    Status: Partial
                  </option>

                  <option value="Inadequate">
                    Status: Inadequate
                  </option>
                </select>

                <ChevronDown
                  size={15}
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-[#34415e]
                  "
                />
              </label>

              {/* RISK */}

              <label className="relative">
                <select
                  value={
                    risk
                  }
                  onChange={(
                    event
                  ) =>
                    setRisk(
                      event.target
                        .value
                    )
                  }
                  className="
                    h-[48px]
                    min-w-[135px]
                    appearance-none
                    rounded-lg
                    border
                    border-[#dfe4ec]
                    bg-white
                    pl-4
                    pr-10
                    text-[13px]
                    font-semibold
                    text-[#17213e]
                    outline-none
                    transition

                    focus:border-[#4d27ff]
                    focus:ring-4
                    focus:ring-[#4d27ff]/10
                  "
                >
                  <option value="All">
                    Risk: All
                  </option>

                  <option value="High">
                    Risk: High
                  </option>

                  <option value="Medium">
                    Risk: Medium
                  </option>

                  <option value="Low">
                    Risk: Low
                  </option>
                </select>

                <ChevronDown
                  size={15}
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-[#34415e]
                  "
                />
              </label>

              {/* FILTER BUTTON */}

              <button
                type="button"
                className="
                  flex
                  h-[48px]
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-[#dfe4ec]
                  bg-white
                  px-5
                  text-[13px]
                  font-semibold
                  text-[#273652]
                  transition

                  hover:border-[#bcb2ff]
                  hover:bg-[#faf9ff]
                  hover:text-[#4324ff]
                "
              >
                <Filter
                  size={18}
                />

                Filters
              </button>
            </div>
          </div>

          {/* ==================================================
              TABLE
          ================================================== */}

          <div
            className="
              mt-4
              overflow-hidden
              rounded-xl
              border
              border-[#e1e6ef]
              bg-white
            "
          >
            <div className="overflow-x-auto">

              <table
                className="
                  w-full
                  min-w-[1120px]
                  text-left
                "
              >
                <thead>
                  <tr
                    className="
                      h-[56px]
                      border-b
                      border-[#e5e9f0]
                      bg-[#fcfdff]
                    "
                  >
                    {[
                      "ID",
                      "Requirement",
                      "Type",
                      "Risk",
                      "RVUs",
                      "Adequate RVUs",
                      "RVC",
                      "RVES",
                      "Status",
                      "Updated",
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
                            text-[12px]
                            font-bold
                            text-[#18213e]
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
                  {filtered.map(
                    (
                      row
                    ) => (
                      <tr
                        key={
                          row.id
                        }
                        onClick={() =>
                          openRow(
                            row
                          )
                        }
                        className={`
                          h-[59px]
                          cursor-pointer
                          border-b
                          border-[#edf0f4]
                          transition

                          hover:bg-[#faf9ff]

                          ${
                            selected?.id ===
                            row.id
                              ? "bg-[#fcfbff]"
                              : ""
                          }
                        `}
                      >

                        {/* ID */}

                        <td
                          className="
                            px-4
                            text-[13px]
                            font-bold
                            text-[#4324ff]
                          "
                        >
                          {
                            row.id
                          }
                        </td>

                        {/* REQUIREMENT */}

                        <td
                          className="
                            px-4
                            text-[13px]
                            font-medium
                            text-[#26324d]
                          "
                        >
                          {
                            row.title
                          }
                        </td>

                        {/* TYPE */}

                        <td className="px-4">
                          <span
                            className={`
                              inline-flex
                              whitespace-nowrap
                              rounded-md
                              px-3
                              py-1.5
                              text-[12px]
                              font-semibold

                              ${
                                typeClasses[
                                  row.type
                                ]
                              }
                            `}
                          >
                            {
                              row.type
                            }
                          </span>
                        </td>

                        {/* RISK */}

                        <td className="px-4">
                          <span
                            className={`
                              inline-flex
                              rounded-md
                              px-3
                              py-1.5
                              text-[12px]
                              font-semibold

                              ${
                                riskClasses[
                                  row.risk
                                ]
                              }
                            `}
                          >
                            {
                              row.risk
                            }
                          </span>
                        </td>

                        {/* RVUS */}

                        <td
                          className="
                            px-4
                            text-center
                            text-[13px]
                            font-semibold
                            text-[#26324d]
                          "
                        >
                          {
                            row.rvus
                          }
                        </td>

                        {/* ADEQUATE RVUS */}

                        <td
                          className="
                            px-4
                            text-center
                            text-[13px]
                            font-semibold
                            text-[#26324d]
                          "
                        >
                          {
                            row.adequate
                          }
                        </td>

                        {/* RVC */}

                        <td
                          className={`
                            px-4
                            text-center
                            text-[13px]
                            font-bold

                            ${
                              row.rvc >=
                              75
                                ? "text-[#0aa43c]"
                                : row.rvc >=
                                  45
                                ? "text-[#f07800]"
                                : "text-[#ff3030]"
                            }
                          `}
                        >
                          {
                            row.rvc
                          }
                          %
                        </td>

                        {/* RVES */}

                        <td
                          className="
                            px-4
                            text-center
                            text-[13px]
                            font-semibold
                            text-[#17213e]
                          "
                        >
                          {
                            row.rves
                          }
                        </td>

                        {/* STATUS */}

                        <td className="px-4 text-center">
                          <span
                            className={`
                              inline-flex
                              rounded-md
                              px-3
                              py-1.5
                              text-[12px]
                              font-semibold

                              ${
                                statusClasses[
                                  row.status
                                ]
                              }
                            `}
                          >
                            {
                              row.status
                            }
                          </span>
                        </td>

                        {/* UPDATED */}

                        <td
                          className="
                            whitespace-nowrap
                            px-4
                            text-center
                            text-[12px]
                            font-medium
                            text-[#34415e]
                          "
                        >
                          {
                            row.updated
                          }
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* ==================================================
                PAGINATION
            ================================================== */}

            <div
              className="
                flex
                min-h-[76px]
                items-center
                justify-center
                gap-12
                border-t
                border-[#edf0f4]
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <button
                  type="button"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[#dfe4ec]
                    text-[#34415e]
                    transition

                    hover:bg-[#faf9ff]
                  "
                >
                  <ChevronLeft
                    size={16}
                  />
                </button>

                <button
                  type="button"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#4d24ff]
                    text-[12px]
                    font-bold
                    text-white
                  "
                >
                  1
                </button>

                <button
                  type="button"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[#dfe4ec]
                    text-[12px]
                    font-semibold
                    text-[#34415e]
                  "
                >
                  2
                </button>

                <button
                  type="button"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[#dfe4ec]
                    text-[12px]
                    font-semibold
                    text-[#34415e]
                  "
                >
                  3
                </button>

                <button
                  type="button"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[#dfe4ec]
                    text-[#34415e]
                    transition

                    hover:bg-[#faf9ff]
                  "
                >
                  <ChevronRight
                    size={16}
                  />
                </button>
              </div>

              <span
                className="
                  text-[12px]
                  font-medium
                  text-[#34415e]
                "
              >
                Page 1 of 6
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================
            SELECTION SUMMARY
        ====================================================== */}

        <aside
          className="
            h-fit
            rounded-xl
            border
            border-[#e1e6ef]
            bg-white
            p-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-[#f1efff]
                text-[#4d27ff]
              "
            >
              <FileText
                size={21}
              />
            </div>

            <h2
              className="
                text-[15px]
                font-bold
                text-[#111936]
              "
            >
              Selection Summary
            </h2>
          </div>

          {selected && (
            <>
              {/* SELECTED REQUIREMENT */}

              <div
                className="
                  border-b
                  border-[#edf0f4]
                  pb-5
                  pt-7
                "
              >
                <div
                  className="
                    text-[21px]
                    font-bold
                    text-[#4824ff]
                  "
                >
                  {
                    selected.id
                  }
                </div>

                <div
                  className="
                    mt-3
                    text-[13px]
                    font-medium
                    leading-5
                    text-[#26324d]
                  "
                >
                  {
                    selected.title
                  }
                </div>
              </div>

              {/* RVC */}

              <div
                className="
                  border-b
                  border-[#edf0f4]
                  py-5
                "
              >
                <div
                  className="
                    text-[13px]
                    font-bold
                    text-[#18213e]
                  "
                >
                  RVC
                </div>

                <div
                  className="
                    mt-2
                    text-[24px]
                    font-bold
                    text-[#4b24ff]
                  "
                >
                  {
                    selected.rvc
                  }
                  %
                </div>
              </div>

              {/* RVES */}

              <div
                className="
                  border-b
                  border-[#edf0f4]
                  py-5
                "
              >
                <div
                  className="
                    text-[13px]
                    font-bold
                    text-[#18213e]
                  "
                >
                  RVES
                </div>

                <div
                  className="
                    mt-2
                    text-[24px]
                    font-bold
                    text-[#4b24ff]
                  "
                >
                  {
                    selected.rves
                  }
                </div>
              </div>

              {/* STATUS */}

              <div
                className="
                  border-b
                  border-[#edf0f4]
                  py-5
                "
              >
                <div
                  className="
                    text-[13px]
                    font-bold
                    text-[#18213e]
                  "
                >
                  Status
                </div>

                <span
                  className={`
                    mt-3
                    inline-flex
                    rounded-md
                    px-3
                    py-1.5
                    text-[12px]
                    font-semibold

                    ${
                      statusClasses[
                        selected.status
                      ]
                    }
                  `}
                >
                  {
                    selected.status
                  }
                </span>
              </div>

              {/* RISK */}

              <div className="pt-5">
                <div
                  className="
                    text-[13px]
                    font-bold
                    text-[#18213e]
                  "
                >
                  Risk
                </div>

                <span
                  className={`
                    mt-3
                    inline-flex
                    rounded-md
                    px-3
                    py-1.5
                    text-[12px]
                    font-semibold

                    ${
                      riskClasses[
                        selected.risk
                      ]
                    }
                  `}
                >
                  {
                    selected.risk
                  }
                </span>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Requirements;