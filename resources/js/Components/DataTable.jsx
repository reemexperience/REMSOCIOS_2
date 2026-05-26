import { Link } from '@inertiajs/react';
import GlassCard from '@/Components/GlassCard';

export default function DataTable({ columns, rows, empty = 'Sin registros por ahora.' }) {
    return (
        <GlassCard className="overflow-hidden">
            {rows.length === 0 ? (
                <div className="p-6 text-sm text-white/60">{empty}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10 text-sm">
                        <thead className="bg-white/5">
                            <tr>
                                {columns.map((column) => (
                                    <th key={column.key} className="px-4 py-3 text-left font-accent text-xs uppercase tracking-[0.2em] text-white/50">
                                        {column.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {rows.map((row, index) => (
                                <tr key={row.id || index} className="align-top">
                                    {columns.map((column) => (
                                        <td key={column.key} className="px-4 py-3 text-white/80">
                                            {column.render ? column.render(row) : row[column.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </GlassCard>
    );
}
