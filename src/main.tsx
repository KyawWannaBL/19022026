<<<<<<< HEAD
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Ensure the DOM is ready before attempting to render
const container = document.getElementById('root');

if (!container) {
  throw new Error("Target container 'root' not found. Check your index.html.");
}

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
>>>>>>> add-supabase-user-script
