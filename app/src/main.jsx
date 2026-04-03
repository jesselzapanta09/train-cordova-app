import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Wait for Cordova deviceready if running in Cordova, otherwise boot immediately
function bootstrap() {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

if (window.cordova) {
  document.addEventListener('deviceready', bootstrap, false);
} else {
  bootstrap();
}
