import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import store from './Redux/store'
import { Provider } from 'react-redux';
import { QueryClient,QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

serviceWorkerRegistration.unregister();
