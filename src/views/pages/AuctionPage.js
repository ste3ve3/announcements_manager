import { Grid, Box, Stack, TextField, Typography, AppBar, Toolbar, IconButton, Card, Divider } from '@mui/material';
import { API, useFetcher } from 'api';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import CloseIcon from '@mui/icons-material/Close';
import { connect } from 'react-redux';
import { deleteCar, editCar, getAllCars } from 'store/actions/auction';
import DataWidget from 'components/Global/DataWidget';
import DatePickerValue from 'components/Global/DatePicker';
import TimePickerValue from 'components/Global/TimePicker';
import LaunchIcon from '@mui/icons-material/Launch';
import Sidebar from 'components/Global/Sidebar';
import CarLoaders from 'components/cards/Skeleton/CarLoaders';
import AuctionCard from 'components/cards/AuctionCard';
import FullScreenModel from 'components/Global/FullScreenModel';
import FeatureLabel from './elements/FeatureLabel';
import { compareObj } from 'utils/constants';

const initFormData = {
    auctionDate: '',
    auctionTime: '',
    auctionLocation: '',
    locationMap: '',
    contactPhone1: '',
    contactPhone2: '',
    contactEmail: '',
    carPrice: ''
};

const initState = { loading: false, error: null };

const AuctionPage = ({ auctionCars, getAuctionCars, editCar, deleteCar }) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [formData, setFormData] = useState(initFormData);
    const [state, setState] = useState(initState);
    const [currentCar, setCurrentCar] = useState(null);
    const [moveCarId, setMoveCarId] = useState(null)

    const { data, isError, isLoading } = useFetcher('/auction?perPage=1000000&all=admin');

    useEffect(() => {
        if (currentCar) {
            setFormData({
                auctionDate: currentCar.auctionDate,
                auctionTime: currentCar.auctionTime,
                auctionLocation: currentCar.auctionLocation,
                locationMap: currentCar.locationMap,
                contactPhone1: currentCar.contactPhone1,
                contactPhone2: currentCar.contactPhone2,
                contactEmail: currentCar.contactEmail,
                carPrice: currentCar.carPrice,
            });
        } else {
            setFormData(initFormData);
        }
    }, [currentCar]);

    useEffect(() => {
        if (data?.data?.length) {
            getAuctionCars({ auctionCars: data?.data });
        }
    }, [data?.data?.length]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSpecialChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleOpenSidebar = () => {
        setOpenSidebar(true);
    };
    const handleCloseSidebar = () => {
        if (state.loading) return;
        setOpenSidebar(false);
        setState(initState);
    };

    const [openFullModal, setOpenFullModal] = React.useState(false);

    const handleClickOpenFullModal = () => {
        setOpenFullModal(true);
    };

    const handleCloseFullModal = () => {
        setOpenFullModal(false);
        setCurrentCar(null);
    };

    const handlePublishCar = async (id, payload) => {
        const result = await toast.promise(
            API.patch(`/auction/publish?carId=${id}`, payload),
            {
                loading: `Publishing car, please wait...`,
                success: `Car visibility updated successfully!`,
                error: `Something went wrong while updating this car's visibility, please try again!`
            },
            { position: 'top-center' }
        );
        editCar(result?.data?.updatedCar)
      }; 

      const handleEditCar = async () => {
        setState(initState);
        try {
            setState((prev) => ({ ...prev, loading: true }));
                const newObj = compareObj(currentCar, formData);
                if (!Object.keys(newObj).length) {
                    toast.error('No changes made', { position: 'top-right' });
                    return;
                }
                const result = await toast.promise(
                    API.patch(`/auction?carId=${currentCar._id}`, newObj),
                    {
                        loading: `Updating auction details, please wait...`,
                        success: `Details for car ${currentCar.carName} updated successfully!`,
                        error: `Something went wrong while updating this car's auction details!`
                    },
                    { position: 'top-center' }
                );
                editCar(result.data.updatedAuctionCar);
                setCurrentCar(null);
            setFormData(initFormData);
            setOpenSidebar(false);
        } catch (error) {
            setState((prev) => ({
                ...prev,
                error: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
            }));
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    const handleDeleteCar = async (id) => {
        await toast.promise(
            API.delete(`/auction?carId=${id}`),
            {
                loading: `Deleting car, please wait...`,
                success: `Car deleted successfully!`,
                error: `Something went wrong while deleting this car, please try again!`
            },
            { position: 'top-center' }
        );
        deleteCar(id)
      };

    return (
        <div>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h3">Auction Cars</Typography>
                <Sidebar
                    title='Edit Auction Details'
                    openSidebar={openSidebar}
                    hideButton
                    onOpenSidebar={() => {
                        handleOpenSidebar();
                    }}
                    onCloseSidebar={() => {
                        handleCloseSidebar()
                        setCurrentCar(null)
                    }}
                    handleSubmit ={handleEditCar}
                    state={state}
                >
                    <DatePickerValue
                        label="Auction Date"
                        value={formData.auctionDate}
                        name="auctionDate"
                        onChange={(value) => handleSpecialChange('auctionDate', value.$d)}  
                    />
                    <TimePickerValue
                        label="Auction Time"
                        name="auctionTime"
                        value={formData.auctionTime}
                        onChange={(value) => handleSpecialChange('auctionTime', value.$d)}
                    />
                    <TextField
                        label="Auction Location"
                        color="secondary"
                        name="auctionLocation"
                        value={formData.auctionLocation}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Location Map"
                        color="secondary"
                        name="locationMap"
                        value={formData.locationMap}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Stack direction="row" alignItems="center" gap="3px">
                        <Typography variant="body2" color="secondary" fontSize="small" component="a" target='__blank' href='https://www.google.com/maps'>Search Location</Typography>
                        <LaunchIcon color='secondary' fontSize='small'/>
                    </Stack>
                    <TextField
                        label="Contact Phone 1"
                        type='number'
                        color="secondary"
                        name="contactPhone1"
                        value={formData.contactPhone1}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Contact Phone 2"
                        type='number'
                        color="secondary"
                        name="contactPhone2"
                        value={formData.contactPhone2}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Contact Email"
                        type='email'
                        color="secondary"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Price"
                        type='number'
                        color="secondary"
                        name="carPrice"
                        value={formData.carPrice}
                        onChange={handleChange}
                        fullWidth
                    />
                </Sidebar>
            </Stack>
            <DataWidget
                title="Auction cars"
                isLoading={isLoading && !auctionCars.length}
                isError={isError && !auctionCars.length}
                isEmpty={!auctionCars.length}
                customLoaders={<CarLoaders />}
            >
                <Grid container spacing={3} sx={{ my: 1 }}>
                    {auctionCars.map((car, index) => {
                        return (
                            <AuctionCard
                                car={car}
                                handlePublish={handlePublishCar}
                                onDelete={handleDeleteCar}
                                onMove={(id) => {
                                    setMoveCarId(id)
                                    handleOpenSidebar()
                                }}
                                handleEditCar={() => {
                                    setCurrentCar(car)
                                    handleOpenSidebar();
                                }}
                            />
                        );
                    })}
                </Grid>
            </DataWidget>
            <FullScreenModel open={openFullModal} handleClose={handleCloseFullModal}>
                <AppBar sx={{ position: 'sticky', background: '#55BDB3' }}>
                    <Toolbar>
                        <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleCloseFullModal}
                        aria-label="close"
                        >
                        <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1, color: "white" }} variant="h2" component="div">
                            {currentCar?.carName} owned by {currentCar?.ownedBy?.names}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container spacing={0} padding={3}>
                    <Grid item xs={8}>
                        <img src={currentCar?.carImage} alt="car" width="100%"/>
                        <Box>
                            <Typography variant="h3" color="secondary" marginBottom={3} marginTop={4} fontWeight='bold'>Features</Typography>
                            <Stack direction="row" gap={2} sx={{ flexWrap: 'wrap' }}>
                                {
                                    currentCar?.features?.map((feature, index) => {
                                        return (
                                        <Box key={index}>
                                            <FeatureLabel labelName={feature}/>
                                        </Box>  
                                        )
                                    })
                                }
                            </Stack>
                        </Box>
                    </Grid>
                <Grid item xs={4}>
                     
                    <Box
                    sx={{
                        paddingLeft: 3
                    }}>
                        <Typography 
                        variant="body1" 
                        color="initial"
                        sx={{
                            border: "1px solid #55BDB3",
                            padding: 1,
                            color: "#55BDB3",
                            textAlign: "center",
                            fontWeight: "bold",
                            borderRadius: 1
                        }}
                        >
                            {parseInt(currentCar?.carPrice).toLocaleString()} Rwf
                        </Typography> 
                        <Card
                        sx={{
                            background: '#F0F8F8',
                            marginTop: 4,
                            padding: 3,
                        }}
                        >
                            <Box>
                                <Typography variant="body1" fontWeight="bold" color="initial">Car Details</Typography>
                                <Stack gap={1} marginTop={2}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="initial">Brand</Typography>
                                        <Typography variant="body2" color="initial" fontWeight="bold">{currentCar?.brand}</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="initial">Model</Typography>
                                        <Typography variant="body2" color="initial" fontWeight="bold">{currentCar?.model}</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="initial">Condition</Typography>
                                        <Typography variant="body2" color="initial" fontWeight="bold">{currentCar?.condition}</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="initial">Year</Typography>
                                        <Typography variant="body2" color="initial" fontWeight="bold">{currentCar?.year}</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="initial">Body Type</Typography>
                                        <Typography variant="body2" color="initial" fontWeight="bold">{currentCar?.bodyType}</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="initial">Seats</Typography>
                                        <Typography variant="body2" color="initial" fontWeight="bold">{currentCar?.passengerCapacity} People</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="initial">Exterior Color</Typography>
                                        <Typography variant="body2" color="initial" fontWeight="bold">{currentCar?.exteriorColor}</Typography>
                                    </Stack>
                                    <Divider color="initial" sx={{ marginTop: 1 }}/>
                                </Stack>
                            </Box>

                            <Box sx={{ marginTop: 4 }}>
                                <Typography variant="body1" fontWeight="bold" color="initial">Engine</Typography>
                                <Stack gap={1} marginTop={2}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="initial">Fuel Type</Typography>
                                        <Typography variant="body2" color="initial" fontWeight="bold">{currentCar?.fuelType}</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="initial">Mileage</Typography>
                                        <Typography variant="body2" color="initial" fontWeight="bold">{currentCar?.mileage} km</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="initial">Trasmission</Typography>
                                        <Typography variant="body2" color="initial" fontWeight="bold">{currentCar?.transmission}</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="initial">Drivetrain</Typography>
                                        <Typography variant="body2" color="initial" fontWeight="bold">{currentCar?.drivetrain}</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="initial">Power</Typography>
                                        <Typography variant="body2" color="initial" fontWeight="bold">{currentCar?.power} hp</Typography>
                                    </Stack>
                                    <Divider color="initial" sx={{ marginTop: 1 }}/>
                                </Stack>
                            </Box>

                            <Box sx={{ marginTop: 4 }}>
                                <Typography variant="body1" fontWeight="bold" color="initial">Dimension</Typography>
                                <Stack gap={1} marginTop={2}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="initial">Length</Typography>
                                        <Typography variant="body2" color="initial" fontWeight="bold">{currentCar?.length} mm</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="initial">Width</Typography>
                                        <Typography variant="body2" color="initial" fontWeight="bold">{currentCar?.width} mm</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="initial">Height</Typography>
                                        <Typography variant="body2" color="initial" fontWeight="bold">{currentCar?.height} mm</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="initial">Cargo Volume</Typography>
                                        <Typography variant="body2" color="initial" fontWeight="bold">{currentCar?.cargoVolume} L</Typography>
                                    </Stack>
                                </Stack>
                            </Box>
                            
                            
                        </Card>
                    </Box>
                    </Grid>
                </Grid>
            </FullScreenModel>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auctionCars: state.auction.auctionCars
});

const mapDispatchToProps = (dispatch) => {
    return {
        getAuctionCars: (data) => dispatch(getAllCars(data)),
        editCar: (data) => dispatch(editCar(data)),
        deleteCar: (id) => dispatch(deleteCar(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuctionPage);
