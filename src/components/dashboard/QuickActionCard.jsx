import { Link } from "react-router-dom";

export default function QuickActionCard({
    title,
    description,
    icon,
    to,
    color,
}) {
    return (
        <Link
            to={to}
            className="
                group
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
            "
        >
            <div
                className={`
                    mb-5
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    text-2xl
                    text-white
                    ${color}
                `}
            >
                {icon}
            </div>

            <h3 className="text-xl font-bold text-slate-800">
                {title}
            </h3>

            <p className="mt-2 text-slate-500">
                {description}
            </p>
        </Link>
    );
}