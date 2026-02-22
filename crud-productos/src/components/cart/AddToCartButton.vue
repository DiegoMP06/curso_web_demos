<script setup lang="ts">
import type { ProductWithCategory } from '@/types';
import NewProductToCartModal from './NewProductToCartModal.vue';
import { useCartStore } from '@/stores/cart';
import { pinia } from '@/stores';

const cart = useCartStore(pinia)

defineProps<{
    item: ProductWithCategory
}>()
</script>

<template>
    <button
        class="block px-4 py-2 rounded bg-blue-700 text-white font-bold mt-4 w-full hover:bg-blue-800 cursor-pointer"
        @click="cart.handleSelectProduct(item)">
        {{ cart.isInCart(item.Product.id) ? 'Editar' : 'Añadir al carrito' }}
    </button>

    <NewProductToCartModal v-if="cart.isSelectedProduct(item.Product.id)" />
</template>