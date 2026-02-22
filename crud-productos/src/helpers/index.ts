export function nullToEmptyString(arg: unknown) {
    return arg ?? "";
}

export function getResizeImage(url: string, width: number, height: number) {
    return url.replace(
        "/upload/",
        `/upload/w_${width},h_${height},c_fill,g_auto/`,
    );
}

export function formatCurrency(price: number) {
    return Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
    }).format(price);
}
