import type { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
    return children ? (
        <p className="text-xs font-bold text-red-700 bg-red-200 border-l-8 rounded pl-8 pr-4 py-2 uppercase">
            {children}
        </p>
    ) : null
}
