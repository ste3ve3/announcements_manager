import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import NotFound from 'views/pages/NotFound';
import CarsPage from 'views/pages/CarsPage';
import CalendarPage from 'views/pages/calendar/CalendarPage';
import UsersPage from 'views/dashboard/members/UsersPage';
import TestimonialsPage from 'views/utilities/TestimonialsPage';
import MessagesPage from 'views/utilities/MessagesPage';
import NewsPage from 'views/utilities/NewsPage';
import AnnouncementsPage from 'views/utilities/AnnouncementsPage';
import AuctionPage from 'views/pages/AuctionPage';

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
            path: 'activities',
            children: [
                {
                    path: 'testimonials',
                    element: <TestimonialsPage />
                },
                {
                    path: 'messages',
                    element: <MessagesPage />
                },
                {
                    path: 'news',
                    element: <NewsPage />
                },
                {
                    path: 'announcements',
                    element: <AnnouncementsPage />
                }
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
                }
            ]
        },
        {
            path: '*',
            element: <NotFound />
        }
    ]
};

export default MainRoutes;
