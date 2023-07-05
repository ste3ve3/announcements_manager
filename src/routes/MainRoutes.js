import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import NotFound from 'views/pages/NotFound';
import CarsPage from 'views/pages/CarsPage';
import UsersPage from 'views/dashboard/members/UsersPage';
import AuctionPage from 'views/pages/AuctionPage';
import ClearedPage from 'views/pages/ClearedPage';
import CarsReport from 'views/pages/CarsReport';
import TaxesPage from 'views/pages/TaxesPage';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'home',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'members',
            children: [
                {
                    path: 'users',
                    element: <UsersPage />
                },
            ]
        },
        {
            path: 'content',
            children: [
                {
                    path: 'cars',
                    element: <CarsPage />
                },
                {
                    path: 'auction',
                    element: <AuctionPage />
                },
                {
                    path: 'cleared',
                    element: <ClearedPage />
                },
                {
                    path: 'report',
                    element: <CarsReport />
                },
                {
                    path: 'taxes',
                    element: <TaxesPage />
                },
            ]
        },
        {
            path: '*',
            element: <NotFound />
        }
    ]
};

export default MainRoutes;
