import { useEffect, useState } from "react";
import {
  NavLink,
  useLocation,
} from "react-router-dom";

import {
  ChevronDown,
} from "lucide-react";

/* ================================================================
   NUMBER COLORS
================================================================ */

const numberStyles = {
  green: "bg-emerald-500",
  blue: "bg-blue-600",
  purple: "bg-violet-600",
  orange: "bg-orange-500",
};

/* ================================================================
   SIDEBAR ITEM
================================================================ */

const SidebarItem = ({
  item,
  collapsed,
  level = 0,
}) => {
  const location = useLocation();

  const pathname =
    location.pathname;

  const hasChildren =
    Array.isArray(item.children) &&
    item.children.length > 0;

  const Icon =
    item.icon;

  /* ==============================================================
     EXACT ACTIVE MATCH

     IMPORTANT:

     /quality
     will ONLY match
     /quality

     It will NOT match:
     /quality/requirements
     /quality/requirement-details/REQ-014
  ============================================================== */

  const isItemActive = (
    target
  ) => {
    if (!target) {
      return false;
    }

    /*
      Requirement Details uses activePrefix because
      requirement ID changes:

      /quality/requirement-details/REQ-014
      /quality/requirement-details/REQ-021
      /quality/requirement-details/REQ-100
    */

    if (
      target.activePrefix
    ) {
      return pathname.startsWith(
        target.activePrefix
      );
    }

    if (!target.path) {
      return false;
    }

    /*
      EXACT matching only
    */

    return (
      pathname === target.path
    );
  };

  /* ==============================================================
     RECURSIVELY CHECK ACTIVE CHILDREN

     Used ONLY to keep parent menus expanded.

     It does NOT make the parent blue.
  ============================================================== */

  const hasActiveDescendant = (
    target
  ) => {
    if (
      !target?.children ||
      target.children.length === 0
    ) {
      return false;
    }

    return target.children.some(
      (child) => {
        if (
          isItemActive(child)
        ) {
          return true;
        }

        return (
          hasActiveDescendant(
            child
          )
        );
      }
    );
  };

  const itemActive =
    isItemActive(item);

  const childActive =
    hasActiveDescendant(
      item
    );

  /* ==============================================================
     EXPANDED STATE
  ============================================================== */

  const [
    expanded,
    setExpanded,
  ] = useState(
    itemActive ||
      childActive
  );

  useEffect(() => {
    /*
      Automatically expand a section when
      one of its pages is active.
    */

    if (
      itemActive ||
      childActive
    ) {
      setExpanded(true);
    }
  }, [
    itemActive,
    childActive,
  ]);

  /* ==============================================================
     ACTIVE BACKGROUND

     VERY IMPORTANT:

     If the item has children, the parent should NOT
     receive the blue active background.

     Example:

     Quality & Testing Intelligence     <- normal
        Overview                        <- selected

     NOT:

     Quality & Testing Intelligence     <- selected
        Overview                        <- selected
  ============================================================== */

  const showActiveBackground =
    itemActive &&
    !hasChildren;

  /* ==============================================================
     EXPAND BUTTON
  ============================================================== */

  const handleExpand = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setExpanded(
      (previous) =>
        !previous
    );
  };

  /* ==============================================================
     INVALID ITEM
  ============================================================== */

  if (
    !item.path &&
    !hasChildren
  ) {
    return null;
  }

  /* ==============================================================
     RENDER
  ============================================================== */

  return (
    <div
      className="
        relative
      "
    >
      {/* ==========================================================
          MAIN ITEM
      ========================================================== */}

      <div
        className={`
          group
          relative
          flex
          items-center

          ${
            collapsed
              ? "justify-center"
              : ""
          }
        `}
      >
        {/* ========================================================
            ITEM WITH PATH
        ======================================================== */}

        {item.path ? (
          <NavLink
            to={item.path}
            end={
              !item.activePrefix
            }
            title={
              collapsed
                ? item.label
                : undefined
            }
            className={`
              relative
              flex
              min-w-0
              flex-1
              items-center
              gap-3
              rounded-lg
              px-3
              py-2
              text-xs
              transition-all
              duration-200

              ${
                showActiveBackground
                  ? `
                    bg-blue-600/90
                    text-white
                    shadow-md
                    shadow-blue-950/20
                  `
                  : `
                    text-slate-300
                    hover:bg-white/10
                    hover:text-white
                  `
              }

              ${
                collapsed
                  ? `
                    justify-center
                    px-2
                  `
                  : ""
              }
            `}
          >
            {/* ====================================================
                LEFT ACTIVE INDICATOR
            ==================================================== */}

            {showActiveBackground && (
              <span
                className="
                  absolute
                  left-0
                  top-1/2
                  h-5
                  w-0.5
                  -translate-y-1/2
                  rounded-full
                  bg-cyan-400
                "
              />
            )}

            {/* ====================================================
                NUMBER
            ==================================================== */}

            {item.number &&
              !collapsed && (
                <span
                  className={`
                    flex
                    h-5
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    text-[10px]
                    font-bold
                    text-white

                    ${
                      numberStyles[
                        item.numberColor
                      ] ||
                      "bg-blue-600"
                    }
                  `}
                >
                  {
                    item.number
                  }
                </span>
              )}

            {/* ====================================================
                ICON
            ==================================================== */}

            {Icon && (
              <Icon
                size={16}
                strokeWidth={1.8}
                className="
                  shrink-0
                "
              />
            )}

            {/* ====================================================
                CHILD BULLET

                Overview
                Requirements
                Requirement Details
            ==================================================== */}

            {!Icon &&
              level > 0 &&
              !collapsed && (
                <span
                  className={`
                    h-[7px]
                    w-[7px]
                    shrink-0
                    rounded-full
                    border

                    ${
                      showActiveBackground
                        ? `
                          border-white
                          bg-white
                        `
                        : `
                          border-slate-400
                          bg-transparent
                        `
                    }
                  `}
                />
              )}

            {/* ====================================================
                LABEL
            ==================================================== */}

            {!collapsed && (
              <span
                className="
                  min-w-0
                  flex-1
                  truncate
                  font-medium
                "
              >
                {
                  item.label
                }
              </span>
            )}

            {/* ====================================================
                ACTIVE WHITE DOT ON RIGHT

                Matches your prototype selected submenu.
            ==================================================== */}

            {showActiveBackground &&
              level > 0 &&
              !collapsed && (
                <span
                  className="
                    ml-auto
                    h-[8px]
                    w-[8px]
                    shrink-0
                    rounded-full
                    bg-white
                  "
                />
              )}
          </NavLink>
        ) : (
          /* ======================================================
             ITEM WITHOUT PATH
          ====================================================== */

          <button
            type="button"
            onClick={() =>
              setExpanded(
                (previous) =>
                  !previous
              )
            }
            className={`
              flex
              min-w-0
              flex-1
              items-center
              gap-3
              rounded-lg
              px-3
              py-2
              text-xs
              text-slate-300
              transition-all
              duration-200

              hover:bg-white/10
              hover:text-white

              ${
                collapsed
                  ? `
                    justify-center
                    px-2
                  `
                  : ""
              }
            `}
          >
            {Icon && (
              <Icon
                size={16}
                strokeWidth={1.8}
                className="
                  shrink-0
                "
              />
            )}

            {!collapsed && (
              <span
                className="
                  min-w-0
                  flex-1
                  truncate
                  text-left
                  font-medium
                "
              >
                {
                  item.label
                }
              </span>
            )}
          </button>
        )}

        {/* ========================================================
            EXPAND BUTTON
        ======================================================== */}

        {hasChildren &&
          !collapsed && (
            <button
              type="button"
              onClick={
                handleExpand
              }
              aria-label={
                `Expand ${item.label}`
              }
              className="
                absolute
                right-1
                flex
                h-[26px]
                w-[26px]
                items-center
                justify-center
                rounded
                text-slate-400
                transition

                hover:bg-white/10
                hover:text-white
              "
            >
              <ChevronDown
                size={13}
                className={`
                  transition-transform
                  duration-200

                  ${
                    expanded
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>
          )}
      </div>

      {/* ==========================================================
          CHILDREN
      ========================================================== */}

      {hasChildren &&
        !collapsed && (
          <div
            className={`
              grid
              transition-all
              duration-300

              ${
                expanded
                  ? "grid-rows-[1fr]"
                  : "grid-rows-[0fr]"
              }
            `}
          >
            <div
              className="
                overflow-hidden
              "
            >
              <div
                className={`
                  ml-4
                  mt-1
                  border-l
                  border-white/10
                  pl-2

                  ${
                    expanded
                      ? "opacity-100"
                      : "opacity-0"
                  }

                  transition-opacity
                  duration-200
                `}
              >
                {item.children.map(
                  (
                    child,
                    index
                  ) => (
                    <SidebarItem
                      key={`${child.label}-${index}`}
                      item={child}
                      collapsed={
                        collapsed
                      }
                      level={
                        level + 1
                      }
                    />
                  )
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default SidebarItem;