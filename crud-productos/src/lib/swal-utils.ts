import Swal, { type SweetAlertOptions } from "sweetalert2";

export const deleteMixin = (options: SweetAlertOptions) =>
    Swal.mixin({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        target: "body",
        customClass: {
            popup: "rounded-xl border border-gray-200 shadow-2xl",
            confirmButton: "font-bold px-6 py-2",
            cancelButton: "font-bold px-6 py-2",
        },
        ...options,
    });
