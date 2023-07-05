import NoCrashIcon from '@mui/icons-material/NoCrash';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import EditIcon from '@mui/icons-material/Edit';

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
            icon: NoCrashIcon,
            type: 'item'
        },
        {
            id: 'auction',
            title: 'Auction Cars',
            url: '/content/auction',
            // target: true,
            icon: CarCrashIcon,
            type: 'item'
        },
        {
            id: 'cleared',
            title: 'Cleared Cars',
            url: '/content/cleared',
            // target: true,
            icon: TimeToLeaveIcon,
            type: 'item'
        },
        {
            id: 'edit',
            title: 'Edit Taxes',
            url: '/content/taxes',
            // target: true,
            icon: EditIcon,
            type: 'item'
        },
    ]
};

export default pages;
