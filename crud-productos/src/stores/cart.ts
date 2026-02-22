import { dexie } from "@/lib/dexie";
import { deleteMixin } from "@/lib/swal-utils";
import type { CartItem, ProductType, ProductWithCategory } from "@/types";
import { defineStore } from "pinia";
import { computed, ref, watch, onMounted, toRaw } from "vue";

export const useCartStore = defineStore("cart", () => {
    const items = ref<CartItem[]>([]);
    const selectedProduct = ref<CartItem | null>(null);

    const handleSelectProduct = (item: ProductWithCategory) => {
        const cartItem = items.value.find(
            (cartItem) => cartItem.id === item.Product.id,
        );

        selectedProduct.value = cartItem || {
            id: item.Product.id,
            quantity: 1,
            description: item.Product.description,
            name: item.Product.name,
            price: item.Product.price,
            image: item.Product.image,
            category: item.Category.name,
        };
    };

    const handleClearSelectedProduct = () => {
        selectedProduct.value = null;
    };

    const handleSaveProduct = (quantity: number) => {
        if (!selectedProduct.value) return;

        const isInCart = items.value.some(
            (item) => item.id === selectedProduct.value?.id,
        );

        if (isInCart) {
            items.value = items.value.map((item) =>
                item.id === selectedProduct.value?.id
                    ? { ...selectedProduct.value, quantity }
                    : item,
            );
        } else {
            items.value = [
                ...items.value,
                { ...selectedProduct.value, quantity },
            ];
        }

        handleClearSelectedProduct();
    };

    const handleDeleteProduct = (productId: number) => {
        deleteMixin({ text: "¿Deseas eliminar el producto del carrito?" })
            .fire()
            .then((result) => {
                if (result.isConfirmed) {
                    items.value = items.value.filter(
                        (item) => item.id !== productId,
                    );
                }
            });
    };

    const handleClearCart = () => {
        deleteMixin({ text: "¿Deseas limpiar el carrito?" })
            .fire()
            .then((result) => {
                if (result.isConfirmed) {
                    items.value = [];
                }
            });
    };

    const isInCart = computed(
        () => (id: ProductType["id"]) =>
            items.value.some((item) => item.id === id),
    );

    const isSelectedProduct = computed(
        () => (id: ProductType["id"]) => selectedProduct.value?.id === id,
    );

    const totalCurrency = computed(() =>
        items.value.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
        ),
    );

    onMounted(async () => {
        items.value = await dexie.cart.toArray();
    });

    watch([items], async () => {
        const plainItems = items.value.map(item => toRaw(item));
        await dexie.cart.clear();
        await dexie.cart.bulkAdd(plainItems);
    });

    return {
        items,
        selectedProduct,
        handleSelectProduct,
        handleClearSelectedProduct,
        handleSaveProduct,
        handleDeleteProduct,
        handleClearCart,
        isInCart,
        isSelectedProduct,
        totalCurrency,
    };
});
