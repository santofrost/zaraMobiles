export function formatPrice(price: number): string {
    return (
        price.toLocaleString("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }) + " €"
    );
}
