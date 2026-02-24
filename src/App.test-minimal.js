import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function App() {
    return (_jsx("div", { style: {
            minHeight: '100vh',
            backgroundColor: '#0B0C10',
            color: '#D4AF37',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, sans-serif'
        }, children: _jsxs("div", { style: { textAlign: 'center', padding: '2rem' }, children: [_jsx("h1", { style: { fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }, children: "Britium Express" }), _jsx("p", { style: { fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.8 }, children: "Enterprise Logistics Platform - Testing Mode" }), _jsx("div", { style: {
                        display: 'inline-block',
                        padding: '1rem 2rem',
                        backgroundColor: '#D4AF37',
                        color: '#0B0C10',
                        borderRadius: '0.5rem',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }, children: "System is Loading..." }), _jsx("div", { style: { marginTop: '2rem', fontSize: '0.9rem', opacity: 0.6 }, children: "If you see this, React is working. Diagnosing the issue..." })] }) }));
}
