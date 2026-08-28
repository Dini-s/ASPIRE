import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const numberStyles = {
  green: "bg-emerald-500",
  blue: "bg-blue-600",
  purple: "bg-violet-600",
  orange: "bg-orange-500",
};

const SidebarItem = ({
  item,
  collapsed,
  level = 0,
}) => {
  const location = useLocation();

  const hasChildren =
    item.children && item.children.length > 0;

  const isParentActive =
    item.path &&
    (location.pathname === item.path ||
      location.pathname.startsWith(`${item.path}/`));

  const hasActiveChild = hasChildren
    ? item.children.some((child) => {
        if (child.path) {
          return (
            location.pathname === child.path ||
            location.pathname.startsWith(`${child.path}/`)
          );
        }

        if (child.children) {
          return child.children.some(
            (nested) =>
              location.pathname === nested.path ||
              location.pathname.startsWith(
                `${nested.path}/`
              )
          );
        }

        return false;
      })
    : false;

  const [expanded, setExpanded] = useState(
    isParentActive || hasActiveChild
  );

  useEffect(() => {
    if (isParentActive || hasActiveChild) {
      setExpanded(true);
    }
  }, [isParentActive, hasActiveChild]);

  const handleExpand = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setExpanded((prev) => !prev);
  };

  const Icon = item.icon;

  if (!item.path && !hasChildren) {
    return null;
  }

  return (
    <div className="relative">

      {/* Main Item */}
      <div
        className={`
          group relative flex items-center
          ${collapsed ? "justify-center" : ""}
        `}
      >
        {item.path ? (
          <NavLink
            to={item.path}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) => `
              relative flex min-w-0 flex-1
              items-center gap-3
              rounded-lg
              px-3 py-2
              text-xs
              transition-all duration-200

              ${
                isActive || hasActiveChild
                  ? "bg-blue-600/90 text-white shadow-md shadow-blue-950/20"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }

              ${collapsed ? "justify-center px-2" : ""}
            `}
          >

            {/* Active indicator */}
            {(isParentActive || hasActiveChild) && (
              <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-cyan-400" />
            )}

            {/* Number */}
            {item.number && !collapsed && (
              <span
                className={`
                  flex h-5 w-5 shrink-0
                  items-center justify-center
                  rounded-full
                  text-[10px]
                  font-bold
                  text-white
                  ${numberStyles[item.numberColor] || "bg-blue-600"}
                `}
              >
                {item.number}
              </span>
            )}

            {/* Icon */}
            {Icon && (
              <Icon
                size={16}
                strokeWidth={1.8}
                className="shrink-0"
              />
            )}

            {/* Label */}
            {!collapsed && (
              <span className="truncate font-medium">
                {item.label}
              </span>
            )}
          </NavLink>
        ) : (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className={`
              flex min-w-0 flex-1
              items-center gap-3
              rounded-lg
              px-3 py-2
              text-xs
              text-slate-300
              transition-all
              hover:bg-white/10
              hover:text-white
              ${collapsed ? "justify-center px-2" : ""}
            `}
          >
            {Icon && (
              <Icon
                size={16}
                className="shrink-0"
              />
            )}

            {!collapsed && (
              <span className="truncate">
                {item.label}
              </span>
            )}
          </button>
        )}

        {/* Expand button */}
        {hasChildren && !collapsed && (
          <button
            type="button"
            onClick={handleExpand}
            aria-label={`Expand ${item.label}`}
            className="absolute right-1 rounded p-1.5 text-slate-400 transition hover:text-white"
          >
            <ChevronDown
              size={13}
              className={`
                transition-transform duration-200
                ${expanded ? "rotate-180" : ""}
              `}
            />
          </button>
        )}

      </div>

      {/* Children */}
      {hasChildren && !collapsed && (
        <div
          className={`
            grid transition-all duration-300
            ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
          `}
        >
          <div className="overflow-hidden">
            <div
              className={`
                ml-4 mt-1
                border-l border-white/10
                pl-2
                ${expanded ? "opacity-100" : "opacity-0"}
                transition-opacity duration-200
              `}
            >
              {item.children.map((child, index) => (
                <SidebarItem
                  key={`${child.label}-${index}`}
                  item={child}
                  collapsed={collapsed}
                  level={level + 1}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarItem;