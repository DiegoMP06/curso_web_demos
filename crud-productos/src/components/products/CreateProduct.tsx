import { useForm } from 'react-hook-form'
import { actions } from 'astro:actions';
import type { CategoryType, DraftProduct } from "../../types";
import ProductForm from "../forms/ProductForm";
import { toast } from 'sonner';
import { navigate } from 'astro:transitions/client';
import { useState } from 'react';

type CreateProductProps = {
    categories: CategoryType[]
}

export default function CreateProduct({ categories }: CreateProductProps) {
    const [processing, setProcessing] = useState(false);

    const initialValues: DraftProduct = {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        image: [],
        categoryId: 0
    }

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        defaultValues: initialValues
    });

    const handleCreateProduct = async (data: DraftProduct) => {
        setProcessing(true);
        const file = data.image[0];

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

        const imageUrl = cloudData.secure_url;

        const formData = {
            ...data,
            image: imageUrl,
        };

        const response = await actions.products.createProduct(formData)

        setProcessing(false);
        if (response.data?.success) {
            navigate('/products');
        } else {
            toast.error(response.data!.message);
        }
    }

    return (
        <form
            className="grid grid-cols-1 gap-4 max-w-xl mx-auto mt-10"
            onSubmit={handleSubmit(handleCreateProduct)}
        >
            <ProductForm
                register={register}
                errors={errors}
                control={control}
                categories={categories}
            />

            <button
                disabled={processing}
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition-colors font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Crear Producto
            </button>
        </form>
    )
}
