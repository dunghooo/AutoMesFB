import React from 'react';
import ReactDOM from 'react-dom';
import '../../src/index';  // Thêm CSS cho popup
import App from './App';  // Component chính của bạn
import reportWebVitals from '../../src/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// Báo cáo hiệu suất (tuỳ chọn)
reportWebVitals(console.log);