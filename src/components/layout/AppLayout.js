import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from "./header";
import Footer from "./footer";
export default function AppLayout({ children }) {
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white", children: [_jsx(Header, {}), _jsx("main", { className: "flex-1", children: children }), _jsx(Footer, {})] }));
}
