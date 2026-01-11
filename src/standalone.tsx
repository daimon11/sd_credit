import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useLocation } from 'react-router-dom';
import routes from './routes';

const App: React.FC = () => {
  const location = useLocation();
  
  console.log('App rendered, location:', location.pathname);
  console.log('Available routes:', routes.map(r => r.path));
  
  // Нормализуем путь (убираем trailing slash для сравнения)
  const normalizePath = (path: string) => path.replace(/\/$/, '') || '/';
  const currentPath = normalizePath(location.pathname);
  
  const route = routes.find((r) => {
    const routePath = normalizePath(r.path);
    if (r.exact) {
      const matches = routePath === currentPath || routePath + '/' === location.pathname;
      console.log(`Checking route ${r.path}: ${matches}`);
      return matches;
    }
    return location.pathname.startsWith(r.path);
  });

  console.log('Current path:', location.pathname);
  console.log('Normalized path:', currentPath);
  console.log('Found route:', route ? route.path : 'NOT FOUND');

  if (!route) {
    return <div style={{ padding: '20px', color: 'red' }}>Route not found: {location.pathname}</div>;
  }

  const Component = route.component;
  const ComponentToRender = typeof Component === 'function' ? Component() : Component;

  return (
    <Suspense fallback={<div style={{ padding: '20px' }}>Loading...</div>}>
      {ComponentToRender}
    </Suspense>
  );
};

const Root: React.FC = () => {
  console.log('Root component rendered');
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

const container = document.getElementById('root');
if (container) {
  console.log('Root container found, rendering app...');
  ReactDOM.render(<Root />, container);
  console.log('App rendered to DOM');
} else {
  console.error('Root container not found!');
}
