import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { UserProvider } from './contexts/UserContext';
import store from './store/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
      <UserProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
     </UserProvider>
    </Provider>
);


