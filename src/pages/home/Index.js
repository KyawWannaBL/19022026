import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Demo } from "./components/Demo";
const Index = () => {
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: _jsxs("div", { className: "text-center", children: [_jsx(Demo, {}), _jsx("p", { className: "text-xl text-muted-foreground", children: "Start building your amazing project here!" })] }) }));
};
export default Index;
