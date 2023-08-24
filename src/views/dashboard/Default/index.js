import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import { gridSpacing } from 'store/constant';
import { IconUsers } from '@tabler/icons';
import { connect } from 'react-redux';
import { useFetcher } from 'api';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import {IconUserCheck } from '@tabler/icons';

import { getUsers } from 'store/actions/auth';
import { getStudents } from 'store/actions/student';
import { getAllAnnouncements } from 'store/actions/announcement';
import CampaignIcon from '@mui/icons-material/Campaign';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = ({
    users, 
    getUsers, 
    students, 
    getStudents, 
    announcements, 
    getAllAnnouncements, 
}) => {
    const { data: usersData, isLoading: usersLoading } = useFetcher('/auth');
    const { data: studentsData, isLoading: studentsLoading } = useFetcher('/student');
    const { data: announcementsData, isLoading: announcementsLoading } = useFetcher('/announcement');
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    
    useEffect(() => {
      if (usersData?.registeredUsers?.length) {
        getUsers({ users: usersData?.registeredUsers });
      }
      
      if (studentsData?.registeredUsers?.length) {
        getStudents({
            students: studentsData?.registeredUsers
        });
      }

      if (announcementsData?.data?.length) {
        getAllAnnouncements({ announcements: announcementsData?.data });
      }

    
    }, [
        usersData?.registeredUsers?.length, 
        studentsData?.registeredUsers?.length,
        announcementsData?.data?.length,
    ]);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={usersLoading} icon={<IconUserCheck fontSize="inherit" />} title="Staff Users" count={users?.length} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={studentsLoading} icon={<IconUsers fontSize="inherit" />} title="Students" count={students?.length} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={announcementsLoading} icon={<CampaignIcon fontSize="inherit" />} title="Announcements" count={announcements?.length} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => ({
    students: state.student.students,
    announcements: state.announcement.announcements,
    users: state.auth.users,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getStudents: (data) => dispatch(getStudents(data)),
        getAllAnnouncements: (data) => dispatch(getAllAnnouncements(data)),
        getUsers: (data) => dispatch(getUsers(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);