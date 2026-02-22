import { Controller, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form"
import type { CategoryType, DraftProduct } from "../../types"
import ErrorMessage from "../ui/ErrorMessage"
import DropzoneInput from "../ui/DropzoneInput"
type ProductFormProps = {
    register: UseFormRegister<DraftProduct>
    errors: FieldErrors<DraftProduct>
    control: Control<DraftProduct>
    categories: CategoryType[]
    defaultImage?: string;
    edit?: boolean
}

export default function ProductForm({ register, errors, control, categories, defaultImage, edit }: ProductFormProps) {
    return (
        <>
            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="name" className="text-gray-600 font-bold"> Nombre: </label>

                <input
                    type="text"
                    id="name"
                    placeholder="Nombre del Producto"
                    className="border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register('name', {
                        required: 'El nombre es obligatorio',
                        maxLength: { value: 100, message: 'El nombre no puede exceder los 100 caracteres' }
                    })}
                />

                <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="description" className="text-gray-600 font-bold">
                    Descripción:
                </label>

                <textarea
                    id="description"
                    placeholder="Descripción del Producto"
                    className="border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-64 resize-none"
                    {...register('description', {
                        required: 'La descripción es obligatoria',
                        minLength: { value: 50, message: 'La descripción debe tener al menos 50 caracteres' },
                        maxLength: { value: 1000, message: 'La descripción no puede exceder los 1000 caracteres' }
                    })}
                ></textarea>

                <ErrorMessage>{errors.description?.message}</ErrorMessage>
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="price" className="text-gray-600 font-bold"> Precio: </label>

                <input
                    type="number"
                    id="price"
                    placeholder="Precio del Producto"
                    step={0.01}
                    className="border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register('price', {
                        required: 'El precio es obligatorio',
                        valueAsNumber: true,
                        min: { value: 0, message: 'El precio no puede ser negativo' }
                    })}
                />

                <ErrorMessage>{errors.price?.message}</ErrorMessage>
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="stock" className="text-gray-600 font-bold"> Stock: </label>

                <input
                    type="number"
                    id="stock"
                    placeholder="Stock del Producto"
                    className="border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register('stock', {
                        required: 'El stock es obligatorio',
                        valueAsNumber: true,
                        min: { value: 0, message: 'El stock no puede ser negativo' }
                    })}
                />

                <ErrorMessage>{errors.stock?.message}</ErrorMessage>
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="categoryId" className="text-gray-600 font-bold"> Categoría: </label>

                <select
                    id="categoryId"
                    className="border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register('categoryId', {
                        required: 'La categoría es obligatoria',
                        valueAsNumber: true, min: { value: 1, message: 'La categoría es invalida' }
                    })}
                >
                    <option value={0} disabled>-- Selecciona una categoría --</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <ErrorMessage>{errors.categoryId?.message}</ErrorMessage>
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="image" className="text-gray-600 font-bold"> Imagen: </label>

                <Controller
                    control={control}
                    name="image"
                    rules={edit ? {} : {
                        required: 'La imagen es requerida',
                        validate: (value) => value.length > 0 || 'La imagen es requerida'
                    }}
                    render={({ field: { onChange, value } }) => (
                        <DropzoneInput
                            onChange={onChange}
                            value={value}
                            defaultImage={defaultImage}
                        />
                    )}
                />

                <ErrorMessage>{errors.image?.message}</ErrorMessage>
            </div>
        </>
    )
}


