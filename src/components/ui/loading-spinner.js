import { jsx as _jsx } from "react/jsx-runtime";
import { Loader2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
    return twMerge(clsx(inputs));
}
export function LoadingSpinner({ size = 'md', className }) {
    const sizeClasses = {
        sm: "h-4 w-4",
        md: "h-8 w-8",
        lg: "h-12 w-12",
    };
    return (_jsx("div", { className: cn("flex items-center justify-center", className), "aria-busy": "true", "aria-live": "polite", children: _jsx(Loader2, { className: cn("animate-spin text-primary transition-all duration-700 ease-in-out", sizeClasses[size]) }) }));
}
