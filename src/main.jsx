import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { store } from './store'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position="top-right" />

      <App />
    </Provider>
  </React.StrictMode>
)