export default function DataTable({
    columns,
    data,
    loading = false,
}) {

    if (loading) {
        return (
            <div className="py-16 text-center">

                Loading...

            </div>
        );
    }

    return (

        <div className="overflow-x-auto rounded-2xl">

            <table className="min-w-full">

                <thead className="bg-slate-100">

                    <tr>

                        {columns.map((column) => (

                            <th
                                key={column.key}
                                className="px-5 py-4 text-left text-sm font-bold text-slate-700"
                            >
                                {column.title}
                            </th>

                        ))}

                    </tr>

                </thead>

                <tbody>

                    {data.length === 0 && (

                        <tr>

                            <td
                                colSpan={columns.length}
                                className="py-12 text-center text-slate-500"
                            >
                                No Data Found
                            </td>

                        </tr>

                    )}

                    {data.map((row, index) => (

                        <tr
                            key={index}
                            className="border-b hover:bg-slate-50"
                        >

                            {columns.map((column) => (

                                <td
                                    key={column.key}
                                    className="px-5 py-4"
                                >
                                    {column.render
                                        ? column.render(row)
                                        : row[column.key]}
                                </td>

                            ))}

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}