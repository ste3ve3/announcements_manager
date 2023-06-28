// assets
import { IconKey, IconBrandAsana, IconBrandDisqus, IconCalendar } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconBrandAsana,
    IconCalendar
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Content',
    caption: "Website's Content",
    type: 'group',
    children: [
        {
            id: 'registeredcars',
            title: 'Registered Cars',
            url: '/content/cars',
            // target: true,
            icon: icons.IconCalendar,
            type: 'item'
        },
        {
            id: 'auction',
            title: 'Auction Cars',
            url: '/content/auction',
            // target: true,
            icon: icons.IconBrandAsana,
            type: 'item'
        },
    ]
};

export default pages;
