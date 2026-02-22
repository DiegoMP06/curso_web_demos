import type { DropzoneFile } from "../../types";


type DropzonePreviewItemProps = {
    file: DropzoneFile | string;
}

export default function DropzonePreviewItem({ file }: DropzonePreviewItemProps) {
    return (
        <div className='rounded overflow-hidden  border border-accent-foreground max-w-52'>
            {typeof file === "string" ? (
                <img
                    src={file}
                    className="block w-full h-auto aspect-[600/800] object-cover"
                />
            ) : (
                <img
                    src={file.preview}
                    className="block w-full h-auto aspect-[600/800] object-cover"
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            )}
        </div>
    )
}
