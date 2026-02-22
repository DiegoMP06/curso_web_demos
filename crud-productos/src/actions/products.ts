import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { nullToEmptyString } from "../helpers";
import { db, isDbError } from "astro:db";
import { Product } from "astro:db";
import { eq } from "astro:db";

export const products = {
    createProduct: defineAction({
        accept: "json",
        input: z.object({
            name: z.preprocess(
                nullToEmptyString,
                z.string().min(1, { message: "El nombre es requerido" }),
            ),
            description: z.preprocess(
                nullToEmptyString,
                z.string().min(50, { message: "La descripción es requerida" }),
            ),
            price: z.preprocess(
                nullToEmptyString,
                z
                    .number({
                        invalid_type_error: "El precio es requerido",
                        required_error: "El precio es requerido",
                    })
                    .positive({
                        message: "El precio debe ser un número positivo",
                    }),
            ),
            stock: z.preprocess(
                nullToEmptyString,
                z
                    .number({
                        invalid_type_error: "El stock es requerido",
                        required_error: "El stock es requerido",
                    })
                    .positive({
                        message: "El stock debe ser un número positivo",
                    }),
            ),
            image: z.preprocess(
                nullToEmptyString,
                z
                    .string()
                    .min(1, { message: "La imagen es requerida" })
                    .url({ message: "La imagen debe ser una URL válida" }),
            ),
            categoryId: z.preprocess(
                nullToEmptyString,
                z
                    .number({
                        invalid_type_error: "La categoría es requerida",
                        required_error: "La categoría es requerida",
                    })
                    .positive({
                        message: "La categoría es invalida",
                    }),
            ),
        }),
        handler: async (input) => {
            try {
                await db.insert(Product).values(input);

                return {
                    success: true,
                    message: "Producto creado exitosamente",
                };
            } catch (error) {
                if (isDbError(error)) {
                    return {
                        success: false,
                        message: error.message,
                    };
                }

                return {
                    success: false,
                    message: "Error al crear el producto",
                };
            }
        },
    }),
    editProduct: defineAction({
        accept: "json",
        input: z.object({
            id: z.preprocess(
                nullToEmptyString,
                z
                    .number({
                        invalid_type_error: "El id es requerido",
                        required_error: "El id es requerido",
                    })
                    .positive({
                        message: "El id es invalido",
                    }),
            ),
            name: z.preprocess(
                nullToEmptyString,
                z.string().min(1, { message: "El nombre es requerido" }),
            ),
            description: z.preprocess(
                nullToEmptyString,
                z.string().min(50, { message: "La descripción es requerida" }),
            ),
            price: z.preprocess(
                nullToEmptyString,
                z
                    .number({
                        invalid_type_error: "El precio es requerido",
                        required_error: "El precio es requerido",
                    })
                    .positive({
                        message: "El precio debe ser un número positivo",
                    }),
            ),
            stock: z.preprocess(
                nullToEmptyString,
                z
                    .number({
                        invalid_type_error: "El stock es requerido",
                        required_error: "El stock es requerido",
                    })
                    .positive({
                        message: "El stock debe ser un número positivo",
                    }),
            ),
            image: z
                .string()
                .url({ message: "La imagen debe ser una URL válida" })
                .nullable(),
            categoryId: z.preprocess(
                nullToEmptyString,
                z
                    .number({
                        invalid_type_error: "La categoría es requerida",
                        required_error: "La categoría es requerida",
                    })
                    .positive({
                        message: "La categoría es invalida",
                    }),
            ),
        }),
        handler: async (input) => {
            try {
                const product = await db
                    .select()
                    .from(Product)
                    .where(eq(Product.id, input.id))
                    .get();

                if (!product) {
                    return {
                        success: false,
                        message: "Producto no encontrado",
                    };
                }

                await db
                    .update(Product)
                    .set({
                        ...input,
                        image: input.image || product.image,
                    })
                    .where(eq(Product.id, input.id));

                return {
                    success: true,
                    message: "Producto actualizado exitosamente",
                };
            } catch (error) {
                if (isDbError(error)) {
                    return {
                        success: false,
                        message: error.message,
                    };
                }

                return {
                    success: false,
                    message: "Error al actualizar el producto",
                };
            }
        },
    }),
    deleteProduct: defineAction({
        accept: "json",
        input: z.object({
            id: z.preprocess(
                nullToEmptyString,
                z
                    .number({
                        invalid_type_error: "El id es requerido",
                        required_error: "El id es requerido",
                    })
                    .positive({
                        message: "El id es invalido",
                    }),
            ),
        }),
        handler: async (input) => {
            try {
                const product = await db
                    .select()
                    .from(Product)
                    .where(eq(Product.id, input.id))
                    .get();

                if (!product) {
                    return {
                        success: false,
                        message: "Producto no encontrado",
                    };
                }

                await db.delete(Product).where(eq(Product.id, input.id));

                return {
                    success: true,
                    message: "Producto eliminado exitosamente",
                };
            } catch (error) {
                if (isDbError(error)) {
                    return {
                        success: false,
                        message: error.message,
                    };
                }

                return {
                    success: false,
                    message: "Error al eliminar el producto",
                };
            }
        },
    }),
};
