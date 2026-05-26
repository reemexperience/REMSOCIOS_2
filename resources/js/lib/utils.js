export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

export function formatCurrency(value) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
    }).format(Number(value || 0)).replace('COP', '').trim() + ' COP';
}
