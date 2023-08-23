import CampaignIcon from '@mui/icons-material/Campaign';

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Content',
    caption: "Website's Content",
    type: 'group',
    children: [
        {
            id: 'announcements',
            title: 'Announcements',
            url: '/content/announcements',
            icon: CampaignIcon,
            type: 'item'
        },
    ]
};

export default pages;
