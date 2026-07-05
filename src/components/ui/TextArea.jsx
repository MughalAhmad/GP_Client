export default function TextArea({
    label,
    placeholder,
    rows = 12,
    value,
    onChange,
}) {
    return (
        <div className="space-y-2">

            {label && (
                <label className="text-sm font-semibold text-slate-700">
                    {label}
                </label>
            )}

            <textarea
                rows={rows}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-300
                    bg-white
                    p-4
                    outline-none
                    resize-none
                    transition
                    focus:border-blue-600
                    focus:ring-4
                    focus:ring-blue-100
                "
            />

        </div>
    );
}