export function formatThousands(val: number | string) {
    if (val === undefined || val === null || val === "") return "";
    // Convertimos a string y agregamos el punto cada 3 dígitos
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};