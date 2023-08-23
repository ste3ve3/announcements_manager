import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import NotFound from 'views/pages/NotFound';
import UsersPage from 'views/dashboard/members/UsersPage';
import StudentsPage from 'views/dashboard/members/StudentsPage';
import AddAnnouncement from 'components/announcement/AddAnnouncement';
import AnnouncementPage from 'views/pages/AnnouncementPage';

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
                    path: 'staff',
                    element: <UsersPage />
                },
                {
                    path: 'students',
                    element: <StudentsPage />
                },
            ]
        },
        {
            path: 'content',
            children: [
                {
                    path: 'announcements',
                    element: <AnnouncementPage />
                },
                {
                    path: 'addAnnouncemment',
                    element: <AddAnnouncement />
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
