// assets
import { IconUsers, IconHome } from '@tabler/icons';

// constant
const icons = { IconHome, IconUsers };

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
            id: 'users',
            title: 'Users',
            type: 'item',
            url: '/members/users',
            breadcrumbs: false,
            icon: icons.IconUsers,
        }
    ]
};

export default dashboard;
