import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "../ui/menubar";
import { EllipsisVertical, Eye, Pencil, Trash } from 'lucide-react';
import { actions } from "astro:actions";
import { toast } from "sonner";
import { deleteMixin } from "@/lib/swal-utils";

type AdminProductMenuBarProps = {
    productId: number;
}

export default function ProductMenuBar({ productId }: AdminProductMenuBarProps) {
    const deleteProduct = async () => {
        const response = await actions.products.deleteProduct({ id: productId })

        if (response.data?.success) {
            toast.success(response.data.message);
            window.location.reload();
        } else {
            toast.error(response.data!.message);
        }
    }

    const handleDelete = () => {
        deleteMixin({}).fire().then((result) => {
            if (result.isConfirmed) {
                deleteProduct()
            }
        });
    }

    return (
        <Menubar className="border-0 shadow-none">
            <MenubarMenu>
                <MenubarTrigger className="p-1 hover:bg-gray-100 transition-colors cursor-pointer">
                    <EllipsisVertical className="w-6 h-6" />
                </MenubarTrigger>

                <MenubarContent className="bg-white">
                    <MenubarGroup>
                        <MenubarItem className="hover:bg-gray-100 transition-colors cursor-pointer">
                            <a href={`/products/${productId}`} className="w-full flex-1 flex items-center cursor-pointer text-gray-600 fill-gray-600">
                                <Eye className="w-4 h-4 mr-2" />
                                Ver Detalles
                            </a>
                        </MenubarItem>
                        <MenubarItem className="hover:bg-gray-100 transition-colors cursor-pointer">
                            <a href={`/products/${productId}/edit`} className="w-full flex-1 flex items-center cursor-pointer text-gray-600 fill-gray-600">
                                <Pencil className="w-4 h-4 mr-2" />
                                Editar
                            </a>
                        </MenubarItem>
                        <MenubarItem className="hover:bg-gray-100 transition-colors cursor-pointer">
                            <button
                                type="button"
                                className="w-full flex-1 flex items-center cursor-pointer text-red-600 fill-red-600"
                                onClick={handleDelete}
                            >
                                <Trash className="w-4 h-4 mr-2" />
                                Eliminar
                            </button>
                        </MenubarItem>
                    </MenubarGroup>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}
