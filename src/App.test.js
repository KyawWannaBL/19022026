import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Minimal test app to diagnose black screen
export default function App() {
    return (_jsxs("div", { style: {
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0B0C10',
            color: '#D4AF37',
            fontFamily: 'system-ui, sans-serif'
        }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("h1", { style: { fontSize: '2rem', marginBottom: '1rem' }, children: "Britium Express - Test Mode" }), _jsx("p", { style: { marginBottom: '2rem' }, children: "If you can see this, React is working. Loading full app..." }), _jsx("div", { style: {
                            height: '32px',
                            width: '32px',
                            border: '4px solid #D4AF37',
                            borderTop: '4px solid transparent',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto'
                        } })] }), _jsx("style", { children: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      ` })] }));
}
