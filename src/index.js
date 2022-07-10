import React from 'react';
import './i18n';
import ReactDOM from 'react-dom/client';
import { ToggleSidebar } from './context/ToggleSidebar';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ToggleSidebar>
        <App />
    </ToggleSidebar>,
);
