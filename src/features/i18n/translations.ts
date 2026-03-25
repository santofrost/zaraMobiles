export type Language = 'es' | 'en';

export const translations = {
    es: {
        toolbar: {
            cart: "Carrito",
        },
        search: {
            placeholder: "Busca un smartphone...",
            results: "RESULTADOS",
        },
        list: {
            loading: "Cargando productos...",
            error: "Error al cargar productos",
            empty: "No se encontraron productos.",
        },
        detail: {
            from: "Desde",
            back: "VOLVER",
            add: "AÑADIR",
            specifications: "ESPECIFICACIONES",
            similar: "PRODUCTOS SIMILARES",
            storage: "ALMACENAMIENTO",
            color: "COLOR",
            loading: "Cargando producto...",
            loading_details: "Cargando detalles...",
            error: "Error al cargar producto",
        },
        cart: {
            empty: "Tu carrito está vacío",
            title: "CARRITO",
            total: "Total",
            item: "artículo",
            items: "artículos",
            view: "VER CARRITO",
            continue: "CONTINUAR COMPRANDO",
            pay: "PAGAR",
            remove: "Eliminar",
        },
    },
    en: {
        toolbar: {
            cart: "Cart",
        },
        search: {
            placeholder: "Search for a smartphone...",
            results: "RESULTS",
        },
        list: {
            loading: "Loading products...",
            error: "Error loading products",
            empty: "No products found.",
        },
        detail: {
            from: "From",
            back: "BACK",
            add: "ADD",
            specifications: "SPECIFICATIONS",
            similar: "SIMILAR ITEMS",
            storage: "STORAGE",
            color: "COLOR",
            loading: "Loading product...",
            loading_details: "Loading details...",
            error: "Error loading product",
        },
        cart: {
            empty: "Your cart is empty",
            title: "CART",
            total: "Total",
            item: "item",
            items: "items",
            view: "VIEW CART",
            continue: "CONTINUE SHOPPING",
            pay: "PAY",
            remove: "Remove",
        },
    }
} as const;

type NestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & string]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : Key;
}[keyof ObjectType & string];

export type TranslationKey = NestedKeyOf<typeof translations.es>;
