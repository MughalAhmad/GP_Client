export default function SectionCard({
    title,
    children,
    className = "",
    right,
}) {
    return (
        <div
            className={`
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-sm
                ${className}
            `}
        >
            {title && (
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                    <h2 className="text-xl font-bold text-slate-800">
                        {title}
                    </h2>

                    {right}

                </div>
            )}

            <div className="p-6">
                {children}
            </div>

        </div>
    );
}