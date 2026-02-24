import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export default function App() {
    const [currentPage, setCurrentPage] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = (e) => {
        e.preventDefault();
        if (email === 'admin@britiumexpress.com' && password === 'demo123') {
            setCurrentPage('dashboard');
        }
        else {
            alert('Use: admin@britiumexpress.com / demo123');
        }
    };
    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#0B0C10',
            color: '#D4AF37',
            fontFamily: 'system-ui, sans-serif',
            padding: '2rem'
        },
        card: {
            maxWidth: '400px',
            margin: '0 auto',
            backgroundColor: '#1A1D23',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid #D4AF37'
        },
        input: {
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            backgroundColor: '#0B0C10',
            border: '1px solid #D4AF37',
            borderRadius: '4px',
            color: '#D4AF37',
            fontSize: '1rem'
        },
        button: {
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#D4AF37',
            color: '#0B0C10',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
        },
        title: {
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem'
        }
    };
    if (currentPage === 'dashboard') {
        return (_jsx("div", { style: styles.container, children: _jsxs("div", { style: styles.card, children: [_jsx("h1", { style: styles.title, children: "Britium Express Dashboard" }), _jsx("p", { style: { textAlign: 'center', marginBottom: '2rem' }, children: "Welcome! The app is working correctly." }), _jsx("button", { style: styles.button, onClick: () => setCurrentPage('login'), children: "Logout" })] }) }));
    }
    return (_jsx("div", { style: styles.container, children: _jsxs("div", { style: styles.card, children: [_jsx("h1", { style: styles.title, children: "Britium Express" }), _jsx("p", { style: { textAlign: 'center', marginBottom: '2rem', opacity: 0.8 }, children: "Enterprise Logistics Platform" }), _jsxs("form", { onSubmit: handleLogin, children: [_jsx("input", { type: "email", placeholder: "Email Address", value: email, onChange: (e) => setEmail(e.target.value), style: styles.input, required: true }), _jsx("input", { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), style: styles.input, required: true }), _jsx("button", { type: "submit", style: styles.button, children: "Sign In" })] }), _jsx("div", { style: { marginTop: '2rem', fontSize: '0.9rem', opacity: 0.6, textAlign: 'center' }, children: "Demo: admin@britiumexpress.com / demo123" })] }) }));
}
