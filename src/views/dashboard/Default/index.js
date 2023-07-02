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

import { getUsers } from 'store/actions/auth';
import { getAllCars } from 'store/actions/cars';
import { getAllCars as getAllAuctionCars } from 'store/actions/auction';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = ({
    users, 
    getUsers, 
    cars, 
    getCars, 
    auction, 
    getAllAuctionCars, 
}) => {
    const { data: usersData, isLoading: usersLoading } = useFetcher('/auth');
    const { data: carsData, isLoading: carsLoading } = useFetcher('/registercar?cleared=false&perPage=1000000');
    const { data: clearedData, isLoading: clearedCarsLoading } = useFetcher('/registercar?cleared=true&perPage=1000000');
    const { data: auctionData, isLoading: auctionLoading } = useFetcher('/auction?perPage=1000000&all=admin');
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    console.log(clearedData); 
    
    useEffect(() => {
      if (usersData?.registeredUsers?.length) {
        getUsers({ users: usersData?.registeredUsers });
      }
      
      if (carsData?.data?.length) {
        getCars({
            registeredCars: carsData?.data
        });
      }

      if (auctionData?.data?.length) {
        getAllAuctionCars({ auctionCars: auctionData?.data });
      }

    
    }, [
        usersData?.registeredUsers?.length, 
        carsData?.data?.length,
        auctionData?.data?.length,
    ]);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={usersLoading} icon={<IconUsers fontSize="inherit" />} title="Registered Users" count={users?.length} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={carsLoading} icon={<NoCrashIcon fontSize="inherit" />} title="Registered Cars" count={cars?.length} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={auctionLoading} icon={<CarCrashIcon fontSize="inherit" />} title="Auction Cars" count={auction?.length} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={clearedCarsLoading} icon={<TimeToLeaveIcon fontSize="inherit" />} title="Cleared Cars" count={clearedData?.data?.length} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => ({
    cars: state.car.registeredCars,
    auction: state.auction.auctionCars,
    users: state.auth.users,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getCars: (data) => dispatch(getAllCars(data)),
        getAllAuctionCars: (data) => dispatch(getAllAuctionCars(data)),
        getUsers: (data) => dispatch(getUsers(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);