import React from 'react';
import './i18n';
import ReactDOM from 'react-dom/client';
import { ToggleSidebar } from './context/ToggleSidebar';
import App from './App';
import { DarkModeContextProvider } from './context/DarkModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ToggleSidebar>
        <DarkModeContextProvider>
            <App />
        </DarkModeContextProvider>
    </ToggleSidebar>,
);
