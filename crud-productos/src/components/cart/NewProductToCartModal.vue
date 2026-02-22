<script setup>
import { ref } from 'vue'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
import { useCartStore } from '@/stores/cart'
import { pinia } from '@/stores'
import { formatCurrency, getResizeImage } from '@/helpers'
import { PlusIcon, MinusIcon } from 'lucide-vue-next'

const cart = useCartStore(pinia)
const quantity = ref(cart.selectedProduct.quantity)

const handlePlusQuantity = () => {
    if ((quantity.value >= cart.selectedProduct.stock) || (quantity.value >= 5)) return
    quantity.value++
}

const handleMinusQuantity = () => {
    if (quantity.value <= 1) return
    quantity.value--
}

</script>

<template>
    <TransitionRoot appear :show="true" as="template">
        <Dialog as="div" @close="cart.handleClearSelectedProduct" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/50" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-xl transform overflow-hidden rounded bg-white p-4 border border-gray-300 shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-2xl font-bold text-gray-600">
                                {{ cart.selectedProduct.name }}
                            </DialogTitle>

                            <div class="flex flex-col md:flex-row gap-6 mt-6">
                                <div class="flex-1 md:w-1/2">
                                    <img :src="getResizeImage(cart.selectedProduct.image, 500, 500)"
                                        :alt="`Imagen de ${cart.selectedProduct.name}`"
                                        class="max-w-80 mx-auto w-full block h-auto" />
                                </div>

                                <div class="flex-1 text-left flex flex-col">
                                    <p class="text-3xl font-bold text-blue-700">
                                        {{ formatCurrency(cart.selectedProduct.price) }}
                                    </p>

                                    <p class="text-gray-600 whitespace-pre-wrap text-wrap text-xs flex-1 my-4">
                                        {{ cart.selectedProduct.description.substring(0, 150) }}...
                                    </p>

                                    <div class="flex gap-4 items-center mt-2">
                                        <button type="button"
                                            class="p-2 rounded bg-blue-700 hover:bg-blue-800 cursor-pointer transition-colors"
                                            @click="handleMinusQuantity">
                                            <MinusIcon class="text-white size-6" />
                                        </button>

                                        <p class="text-xl font-bold text-gray-600">
                                            {{ quantity }}
                                        </p>

                                        <button type="button"
                                            class="p-2 rounded bg-blue-700 hover:bg-blue-800 cursor-pointer transition-colors"
                                            @click="handlePlusQuantity">
                                            <PlusIcon class="text-white size-6" />
                                        </button>
                                    </div>

                                    <button
                                        class="block px-4 py-2 rounded bg-blue-700 text-white font-bold mt-4 w-full hover:bg-blue-800 cursor-pointer"
                                        @click="cart.handleSaveProduct(quantity)">
                                        Aceptar
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
