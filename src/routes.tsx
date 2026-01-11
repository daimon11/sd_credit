import React, { lazy } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { isDevOrTestHost } from './helpers/isLocalOrTestEnvironment';

const SalaryPage = lazy(() =>
  import('@pages/SalaryPage/SalaryPage').then((Component) => ({
    default: Component.default,
  }))
);

const SalaryCardApplicationsListPage = lazy(() =>
  import('@pages/SalaryCardApplicationsListPage/SalaryCardApplicationsListPage').then(
    (Component) => ({
      default: Component.default,
    })
  )
);

const CreateSalaryCard = lazy(() =>
  import('@src/pages/CreateSalaryCard/CreateSalaryCard').then((Component) => ({
    default: Component.default,
  }))
);

function RouteWrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

// Переменная для проверки соответствия условий по hostname
const { hostname } = window.location;
const isLocalOrTestEnvironment = isDevOrTestHost(hostname);

const routes = [
  {
    path: '/salary',
    component: () => (
      <RouteWrapper>
        <SalaryPage />
      </RouteWrapper>
    ),
    exact: false,
  },
];

// Добавляем дополнительные маршруты только если условия выполнены
if (isLocalOrTestEnvironment) {
  routes.push(
    {
      path: '/salary/deposits/dashboard',
      component: () => (
        <RouteWrapper>
          <SalaryPage />
        </RouteWrapper>
      ),
      exact: true,
    },
    {
      path: '/salary/card-issue/dashboard',
      component: () => (
        <RouteWrapper>
          <SalaryCardApplicationsListPage />
        </RouteWrapper>
      ),
      exact: true,
    },
    {
      path: '/salary/card-issue/create',
      component: () => (
        <RouteWrapper>
          <CreateSalaryCard />
        </RouteWrapper>
      ),
      exact: true,
    }
  );
}

export default routes;
