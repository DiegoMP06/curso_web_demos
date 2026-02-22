<script setup lang="ts">
import { XIcon } from 'lucide-vue-next'
import type { CartItem as CartItemType } from '@/types';
import { getResizeImage } from '@/helpers'
import { formatCurrency } from '../../helpers/index';
import { useCartStore } from '@/stores/cart';
import { pinia } from '@/stores';

const cart = useCartStore(pinia)

defineProps<{
    item: CartItemType;
}>()
</script>

<template>
    <div class="flex gap-4 p-4 items-center">
        <div>
            <img :src="getResizeImage(item.image, 100, 100)" :alt="`Imagen del carrito de ${item.name}`" :width="100"
                :height="100" class="w-full max-w-20 h-auto aspect-square rounded" />
        </div>

        <div class="flex-1">
            <p class="text-lg font-bold text-gray-600">
                {{ item.name }}
            </p>

            <p class="text-gray-600">
                Cantidad:
                <span class="font-bold">
                    {{ item.quantity }}
                </span>
            </p>

            <p class="text-gray-700">
                Precio:
                <span class="font-bold">
                    {{ formatCurrency(item.price) }}
                </span>
            </p>

            <p class="text-gray-600">
                Subtotal:
                <span class="font-bold">
                    {{ formatCurrency(item.price * item.quantity) }}
                </span>
            </p>
        </div>

        <button type="button"
            class="block p-2 rounded-full bg-red-600 text-white fill-white hover:bg-red-700 transition-colors cursor-pointer"
            @click="cart.handleDeleteProduct(item.id)">
            <XIcon class="size-6" />
        </button>
    </div>
</template>