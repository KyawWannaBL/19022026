import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
// Runtime import of the real library under a different name (see vite.config alias)
// @ts-expect-error - This is resolved at runtime by Vite alias
import * as RRD from "react-router-dom-original";
// Re-export everything so other imports keep working
// @ts-expect-error - This is resolved at runtime by Vite alias
export * from "react-router-dom-original";
/** --------------------- Outbound: route list (once) --------------------- */
let routesPosted = false;
// Create a promise that resolves once routes are posted
let resolveRoutesReady = null;
const routesReadyPromise = new Promise((res) => {
    resolveRoutesReady = res;
});
// Optional: avoid waiting forever if <Routes> never mounts
const routesReadyOrTimeout = (ms = 1200) => Promise.race([routesReadyPromise, new Promise((r) => setTimeout(r, ms))]);
function normalize(p) {
    return p.replace(/\/+/g, "/");
}
function join(base, child) {
    if (!child)
        return base || "";
    if (child.startsWith("/"))
        return child;
    return normalize(`${base.replace(/\/$/, "")}/${child}`);
}
function flattenRoutes(node, base = "", acc = new Set()) {
    React.Children.forEach(node, (child) => {
        if (!React.isValidElement(child))
            return;
        const isRoute = child.type === RRD.Route ||
            (typeof child.type === "function" && child.type.name === "Route");
        if (isRoute) {
            const { path, index, children } = (child.props ?? {});
            const cur = index ? (base || "/") : (path ? join(base, path) : base);
            if (index || path)
                acc.add(cur || "/");
            if (children)
                flattenRoutes(children, cur, acc);
        }
        else {
            const kids = child.props?.children;
            if (kids)
                flattenRoutes(kids, base, acc);
        }
    });
    return acc;
}
function postAllRoutesOnce(children) {
    if (routesPosted)
        return;
    try {
        const list = Array.from(flattenRoutes(children)).sort();
        // Always log routes in development for debugging
        if (process.env.NODE_ENV === 'development') {
            console.log('Routes:', list);
        }
        // Check if route messaging is enabled
        if (!__ROUTE_MESSAGING_ENABLED__) {
            return;
        }
        if (window.top && window.top !== window) {
            // Use the same format as ROUTES_INFO in use-route-messenger
            const routesForMessage = list.map(route => ({
                path: route
            }));
            const routesMessage = {
                type: 'ROUTES_INFO',
                routes: routesForMessage,
                timestamp: Date.now()
            };
            window.top.postMessage(routesMessage, "*");
        }
    }
    finally {
        routesPosted = true;
        // signal readiness exactly once
        resolveRoutesReady?.();
        resolveRoutesReady = null;
    }
}
/** Our patched <Routes/>: same API, just posts route list once. */
export function Routes(props) {
    React.useEffect(() => { postAllRoutesOnce(props.children); }, []);
    return React.createElement(RRD.Routes, { ...props });
}
/** --------------------- Outbound: route change events --------------------- */
let lastEmittedPath = "";
function emitRouteChange(location) {
    const path = `${location.pathname}${location.search}${location.hash}`;
    if (path === lastEmittedPath)
        return;
    lastEmittedPath = path;
    // Check if route messaging is enabled
    if (!__ROUTE_MESSAGING_ENABLED__) {
        return;
    }
    if (window.top && window.top !== window) {
        const routeChangeMessage = {
            type: 'ROUTE_CHANGE',
            path: location.pathname,
            hash: location.hash,
            search: location.search,
            fullPath: location.pathname + location.search + location.hash,
            fullUrl: window.location.href,
            timestamp: Date.now()
        };
        window.top.postMessage(routeChangeMessage, "*");
    }
}
/** A component that lives inside the router context and bridges both ways */
function RouterBridge() {
    const location = RRD.useLocation();
    const navigate = RRD.useNavigate();
    React.useEffect(() => {
        (async () => {
            // Ensure ROUTES_INFO is delivered first
            await routesReadyOrTimeout(); // waits for <Routes/> to post, or times out (dev-safety)
            emitRouteChange(location);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.key, location.pathname, location.search, location.hash]);
    React.useEffect(() => {
        function onMessage(e) {
            const data = e.data;
            if (!data)
                return;
            // Check if route messaging is enabled
            if (!__ROUTE_MESSAGING_ENABLED__) {
                return;
            }
            try {
                if (data.type === "ROUTE_CONTROL") {
                    const { action, path, replace = false } = data;
                    console.log('Received route control command:', data);
                    switch (action) {
                        case 'navigate':
                            if (path) {
                                navigate(path, { replace });
                                console.log(`Navigated to: ${path} (replace: ${replace})`);
                            }
                            else {
                                console.error('Route control: path is required for navigate action');
                            }
                            break;
                        case 'back':
                            navigate(-1);
                            console.log('Navigated back');
                            break;
                        case 'forward':
                            navigate(1);
                            console.log('Navigated forward');
                            break;
                        case 'replace':
                            if (path) {
                                navigate(path, { replace: true });
                                console.log(`Replaced route with: ${path}`);
                            }
                            else {
                                console.error('Route control: path is required for replace action');
                            }
                            break;
                        default:
                            console.warn('Route control: unknown action', action);
                    }
                }
                else if (data.type === "RELOAD") {
                    window.location.reload();
                    console.log('Reloaded');
                }
            }
            catch (error) {
                console.error('Route control error:', error);
            }
        }
        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
    }, [navigate]);
    return null;
}
/** Wrap routers so the bridge lives inside router context, with zero app changes. */
// Make children mount before <RouterBridge/>, so <Routes/> effect runs first.
function withBridge(children) {
    return (_jsxs(_Fragment, { children: [children, _jsx(RouterBridge, {})] }));
}
export function HashRouter(props) {
    return _jsx(RRD.HashRouter, { ...props, children: withBridge(props.children) });
}
export function BrowserRouter(props) {
    return _jsx(RRD.BrowserRouter, { ...props, children: withBridge(props.children) });
}
export function MemoryRouter(props) {
    return _jsx(RRD.MemoryRouter, { ...props, children: withBridge(props.children) });
}
