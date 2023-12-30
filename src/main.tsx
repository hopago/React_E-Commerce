import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from "react-router-dom";
import { worker } from './mocks/browser.ts';
import { RecoilRoot } from 'recoil';

if (import.meta.env.DEV) {
  await worker.start()
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <App />
      </Router>
    </RecoilRoot>
  </React.StrictMode>
);
