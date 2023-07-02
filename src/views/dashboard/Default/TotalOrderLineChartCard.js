import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports
import MainCard from 'components/cards/MainCard';
import SkeletonTotalOrderCard from 'components/cards/Skeleton/EarningCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: "#023C45",
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&>div': {
        position: 'relative',
        zIndex: 5
    }
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({ isLoading, icon, title, count }) => {
    const theme = useTheme();
    return (
        <>
            {isLoading ? (
                <SkeletonTotalOrderCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                backgroundColor: "#01191F",
                                                color: '#fff',
                                                mt: 1
                                            }}
                                        >
                                            {icon}
                                        </Avatar>
                                    </Grid>
                                    
                                </Grid>
                            </Grid>
                                    <Grid item>
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                <Typography sx={{ fontSize: '2rem', textAlign: 'center', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                    { count }
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item sx={{ mb: 1.25 }}>
                                        <Typography
                                            sx={{
                                                fontSize: '1rem',
                                                fontWeight: 500,
                                                color: theme.palette.secondary[200],
                                                textAlign: 'center'
                                            }}
                                        >
                                            { title }
                                        </Typography>
                                    </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TotalOrderLineChartCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;
