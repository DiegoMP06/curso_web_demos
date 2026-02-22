import { useState } from "react";
import { useForm } from "react-hook-form";
import { actions } from "astro:actions";
import { toast } from "sonner";
import type { CategoryType, DraftProduct, ProductType } from "@/types"
import ProductForm from "../forms/ProductForm";
import { navigate } from "astro:transitions/client";

type EditProductProps = {
    categories: CategoryType[]
    product: ProductType;
}

export default function EditProduct({ categories, product }: EditProductProps) {
    const [processing, setProcessing] = useState(false);

    const initialValues: DraftProduct = {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image: [],
        categoryId: product.categoryId
    }

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        defaultValues: initialValues
    })

    const handleEditProduct = async (data: DraftProduct) => {
        setProcessing(true);

        const formData = {
            ...data,
            id: product.id,
            image: null,
        };

        const file = data.image[0];
        
        if (file) {
            const imageFD = new FormData();
            imageFD.append('file', file);
            imageFD.append('upload_preset', 'products');
            imageFD.append('cloud_name', import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME);

            const resCloudinary = await fetch(
                `${import.meta.env.PUBLIC_CLOUDINARY_URL}`,
                { method: 'POST', body: imageFD }
            );

            const cloudData = await resCloudinary.json();

            if (!resCloudinary.ok) {
                return toast.error("Error al subir la imagen")
            }

            formData.image = cloudData.secure_url;
        }

        const response = await actions.products.editProduct(formData)

        setProcessing(false);
        if (response.data?.success) {
            navigate(`/products/${product.id}`);
        } else {
            toast.error(response.data!.message);
        }
    }

    return (
        <form
            className="grid grid-cols-1 gap-4 max-w-xl mx-auto mt-10"
            onSubmit={handleSubmit(handleEditProduct)}
        >
            <ProductForm
                register={register}
                errors={errors}
                control={control}
                categories={categories}
                edit
                defaultImage={product.image}
            />

            <button
                disabled={processing}
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition-colors font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Guardar Cambios
            </button>
        </form>
    )
}
