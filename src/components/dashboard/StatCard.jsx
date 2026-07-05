import React from "react";

export default function StatCard({
  title,
  value,
  icon,
  color = "bg-blue-600",
}) {
  return (
    <div
      className="
        group
        rounded-3xl
        bg-white
        p-6
        shadow-sm
        border
        border-slate-200
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-800">
            {value}
          </h2>

        </div>

        <div
          className={`
            ${color}
            h-16
            w-16
            rounded-2xl
            flex
            items-center
            justify-center
            text-white
            text-2xl
            shadow-lg
          `}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}