import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AnnouncementForm from './AnnouncementForm';
import UploadAnnouncement from './UploadAnnouncement';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ currentAnnouncement }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <>
      {
        currentAnnouncement ?
          <Box sx={{ width: '100%' }}>
            {
              currentAnnouncement?.announcementFile ?
                <UploadAnnouncement currentAnnouncement={currentAnnouncement}/>
              :
                <AnnouncementForm currentAnnouncement={currentAnnouncement}/>
            }
          </Box>
          :
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Type Announcement" {...a11yProps(0)} />
                <Tab label="Upload Announcement" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <AnnouncementForm currentAnnouncement={currentAnnouncement}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <UploadAnnouncement currentAnnouncement={currentAnnouncement}/>
            </CustomTabPanel>
          </Box>
      }
    </>
  );
}