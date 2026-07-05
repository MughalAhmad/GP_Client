export default function PageHeader({
    title,
    subtitle,
    action
}) {
    return (
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

                <h1 className="text-4xl font-bold tracking-tight text-slate-800">
                    {title}
                </h1>

                {subtitle && (
                    <p className="mt-2 text-slate-500">
                        {subtitle}
                    </p>
                )}

            </div>

            {action && (
                <div>
                    {action}
                </div>
            )}

        </div>
    );
}