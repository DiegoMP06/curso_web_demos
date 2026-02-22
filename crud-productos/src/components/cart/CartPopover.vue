<script setup>
import { ref } from 'vue';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { ShoppingCart } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart';
import { pinia } from '@/stores';
import CartItem from './CartItem.vue';
import { formatCurrency } from '../../helpers/index';

const cart = useCartStore(pinia)
</script>

<template>
    <Popover class="relative">
        <PopoverButton
            class="rounded-xl hover:bg-blue-800 p-2 text-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <ShoppingCart class="h-6 w-6" aria-hidden="true" />
        </PopoverButton>

        <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
            <PopoverPanel
                class="absolute -right-24 sm:right-0 z-50 mt-4 w-screen max-w-96 sm:max-w-lg transform lg:max-w-xl">
                <div
                    class="overflow-y-auto rounded shadow-lg ring-1 ring-black/5 bg-white border border-gray-300 p-4 max-h-96">
                    <h3 class="text-xl font-bold text-gray-600 text-center">
                        Carrito
                    </h3>

                    <div v-if="cart.items.length > 0" class="mt-6 grid divide-y divide-gray-300">
                        <CartItem v-for="item in cart.items" :key="item.id" :item="item" />
                    </div>

                    <p v-else class="text-center my-10 font-bold text-sm text-gray-400">
                        No hay productos en el carrito
                    </p>

                    <div v-if="cart.items.length > 0" class="">
                        <p class="text-xl text-gray-600">
                            Total:
                            <span class="font-bold">
                                {{ formatCurrency(cart.totalCurrency) }}
                            </span>
                        </p>

                        <button @click="cart.handleClearCart"
                            class="block px-4 py-2 rounded bg-gray-700 text-white font-bold mt-4 w-full hover:bg-gray-800 cursor-pointer">
                            Vaciar Carrito
                        </button>
                    </div>
                </div>
            </PopoverPanel>
        </transition>
    </Popover>
</template>