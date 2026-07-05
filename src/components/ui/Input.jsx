import React from "react";

export default function Input({
  label,
  icon,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="space-y-2">

      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div
        className="
          flex
          items-center
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          h-12
          transition-all
          duration-300
          focus-within:border-blue-600
          focus-within:ring-4
          focus-within:ring-blue-100
        "
      >
        <div className="mr-3 text-slate-400">
          {icon}
        </div>

        <input
          className="w-full outline-none bg-transparent"
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>

    </div>
  );
}