import React, { Suspense } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { lazy } from 'react';

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

const App: React.FC = () => {
    const location = useLocation();

    return (
        <Provider store={store}>
            <div>
                <nav style={{ padding: '20px', background: '#f5f5f5', marginBottom: '20px' }}>
                    <h2>Навигация по маршрутам:</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ margin: '10px 0' }}>
                            <Link to="/salary/" style={{ textDecoration: 'none', color: '#0066cc' }}>
                                /salary/ - Основная страница
                            </Link>
                        </li>
                        {/* <li style={{ margin: '10px 0' }}>
                            <Link
                                to="/salary/deposits/dashboard"
                                style={{ textDecoration: 'none', color: '#0066cc' }}
                            >
                                /salary/deposits/dashboard - Dashboard депозитов
                            </Link>
                        </li> */}
                        <li style={{ margin: '10px 0' }}>
                            <Link
                                to="/salary/card-issue/dashboard"
                                style={{ textDecoration: 'none', color: '#0066cc' }}
                            >
                                /salary/card-issue/dashboard - Dashboard заявок на карту
                            </Link>
                        </li>
                        <li style={{ margin: '10px 0' }}>
                            <Link
                                to="/salary/card-issue/create"
                                style={{ textDecoration: 'none', color: '#0066cc' }}
                            >
                                /salary/card-issue/create - Создание заявки на карту
                            </Link>
                        </li>
                    </ul>
                </nav>

                <Suspense fallback={<div style={{ padding: '20px' }}>Loading...</div>}>
                    <Routes>
                        <Route path="/salary/" element={<SalaryPage />} />
                        {/* <Route path="/salary/deposits/dashboard" element={<SalaryPage />} /> */}
                        <Route
                            path="/salary/card-issue/dashboard"
                            element={<SalaryCardApplicationsListPage />}
                        />
                        <Route path="/salary/card-issue/create" element={<CreateSalaryCard />} />
                        <Route path="*" element={<div>Route not found: {location.pathname}</div>} />
                    </Routes>
                </Suspense>
            </div>
        </Provider>
    );
};

export default App;
