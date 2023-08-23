// assets
import { IconUsers, IconHome, IconUserCheck } from '@tabler/icons';

// constant
const icons = { IconHome, IconUsers, IconUserCheck };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'home',
            title: 'Home',
            type: 'item',
            url: '/dashboard/home',
            icon: icons.IconHome,
            breadcrumbs: false
        },
        {
            id: 'staff',
            title: 'Staff Access',
            type: 'item',
            url: '/members/staff',
            breadcrumbs: false,
            icon: icons.IconUserCheck,
        },
        {
            id: 'students',
            title: 'Students Access',
            type: 'item',
            url: '/members/students',
            breadcrumbs: false,
            icon: icons.IconUsers,
        }
    ]
};

export default dashboard;
