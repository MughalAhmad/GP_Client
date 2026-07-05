export default function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    className = "",
    disabled = false,
}) {
    const styles = {
        primary:
            "bg-blue-600 hover:bg-blue-700 text-white",

        secondary:
            "bg-slate-100 hover:bg-slate-200 text-slate-800",

        success:
            "bg-emerald-600 hover:bg-emerald-700 text-white",

        danger:
            "bg-red-600 hover:bg-red-700 text-white",
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                px-6
                py-3
                font-semibold
                transition-all
                duration-300
                active:scale-95
                disabled:opacity-50
                disabled:pointer-events-none
                ${styles[variant]}
                ${className}
            `}
        >
            {children}
        </button>
    );
}