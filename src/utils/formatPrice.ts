export function formatPrice(price: number): string {
    return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
        useGrouping: true,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);
}
