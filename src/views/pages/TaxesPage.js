import { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Card,
  Stack,
  useMediaQuery,
  TextField,
  Typography,
  CircularProgress,
  Container,
  Alert,
  AlertTitle,
  InputAdornment,
  Grid
} from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { useFetcher, API } from "api";
import EditIcon from '@mui/icons-material/Edit';
import { compareObj } from "utils/constants";
import toast from "react-hot-toast";
import { editCar } from "store/actions/auction";

const initialFormData = {
  yearPercentage: {
    year2018to2023: '',
    year2012to2017: '',
    year2006to2011: '',
    year2000to2006: '',
    yearBefore2000: ''
  },
  mileagePercentage: {
    mileage0to9999: '',
    mileage10000to99999: '',
    mileage100000to300000: '',
    mileageAbove300000: ''
  },
  engineCapacityPercentage: {
    engineCapacityBelow1000: '',
    engineCapacity1000to1999: '',
    engineCapacity2000to2999: '',
    engineCapacity3000to3999: '',
    engineCapacityAbove4000: ''
  },
  brandPercentage: '',
  fuelTypePercentage: '',
  importDutyPercentage: '',
  vatPercentage: ''
};

const initialState = { loading: false, error: null };

const TaxesPage = () => {
  const matcheBigDevices = useMediaQuery('(min-width:600px)');
  const [formData, setFormData] = useState(initialFormData);
  const [state, setState] = useState(initialState);
  const { data, isError, isLoading } = useFetcher('/taxes');

  useEffect(() => {
    if (data && data.data) {
      setFormData(data.data[0]);
    }
  }, [data]);

  const handleChange = (name, event) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecialChange = (name, event) => {
    const { value } = event.target;
    const [parent, child] = name.split('.'); // Split the name into parent and child properties
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: value
      }
    }));
  };

  const handleEditTaxes = async () => {
    setState(initialState);
    try {
        setState((prev) => ({ ...prev, loading: true }));
            // const newObj = compareObj(formData, formData);
            // if (!Object.keys(newObj).length) {
            //     toast.error('No changes made', { position: 'top-center' });
            //     return;
            // }
            const result = await toast.promise(
                API.patch(`/taxes?taxCalculationId=64a5451a24af4d99fb6b1353`, formData),
                {
                    loading: `Updating taxes, please wait...`,
                    success: `Taxes updated successfully!`,
                    error: `Something went wrong while updating the taxes!`
                },
                { position: 'top-center' }
            );
            editCar(result.data);
    } catch (error) {
        setState((prev) => ({
            ...prev,
            error: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
        }));
    } finally {
        setState((prev) => ({ ...prev, loading: false }));
    }
};

  if (isLoading) {
    return (
        <Stack justifyContent="center" alignItems="center" spacing={4} sx={{ py: 2 }}>
            <CircularProgress size={40} color="secondary" />
            <Typography>Taxes loading, please wait...</Typography>
        </Stack>
    );
}
if (isError) {
    return (
        <Container sx={{ py: 2 }}>
            <Alert severity="error" variant="outlined">
                <AlertTitle>Error!</AlertTitle>
                {isError || 'Oops, Something went wrong due to unknown error. Try to refresh the page and try again.'}
            </Alert>
        </Container>
    );
}

  return (
    <Box>
      <Card
        sx={{
          padding: 3,
          marginTop: 4
        }}
      >
        <Typography variant="h4" color="secondary" marginBottom={3} fontWeight='bold'>Year Taxes</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              id="year2018to2023"
              onChange={(value) => handleSpecialChange('yearPercentage.year2018to2023', value)} 
              name="yearPercentage.year2018to2023"
              type="text"
              label="2023 - 2018"
              fullWidth
              value={formData.yearPercentage.year2018to2023}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              id="year2012to2017"
              onChange={(value) => handleSpecialChange('yearPercentage.year2012to2017', value)}
              name="yearPercentage.year2012to2017"
              type="text"
              label="2017 - 2012"
              fullWidth
              value={formData.yearPercentage.year2012to2017}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              id="year2006to2011"
              onChange={(value) => handleSpecialChange('yearPercentage.year2006to2011', value)}
              name="yearPercentage.year2006to2011"
              type="text"
              label="2011 - 2006"
              fullWidth
              value={formData.yearPercentage.year2006to2011}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              id="year2000to2006"
              onChange={(value) => handleSpecialChange('yearPercentage.year2000to2006', value)}
              name="yearPercentage.year2000to2006"
              type="text"
              label="2006 - 2000"
              fullWidth
              value={formData.yearPercentage.year2000to2006}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              id="yearBefore2000"
              onChange={(value) => handleSpecialChange('yearPercentage.yearBefore2000', value)}
              name="yearPercentage.yearBefore2000"
              type="text"
              label="Below 2000"
              fullWidth
              value={formData.yearPercentage.yearBefore2000}
            />
          </Grid>
        </Grid>
      </Card>

      <Card
        sx={{
          padding: 3,
          marginTop: 4
        }}
      >
        <Typography variant="h4" color="secondary" marginBottom={3} fontWeight='bold'>Mileage Taxes</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              id="mileage0to9999"
              onChange={(value) => handleSpecialChange('mileagePercentage.mileage0to9999', value)}
              name="mileagePercentage.mileage0to9999"
              type="text"
              label="0 - 9,999 Km"
              fullWidth
              value={formData.mileagePercentage.mileage0to9999}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              id="mileage10000to99999"
              onChange={(value) => handleSpecialChange('mileagePercentage.mileage10000to99999', value)}
              name="mileagePercentage.mileage10000to99999"
              type="text"
              label="10,000 - 99,999 Km"
              fullWidth
              value={formData.mileagePercentage.mileage10000to99999}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              id="mileage100000to300000"
              onChange={(value) => handleSpecialChange('mileagePercentage.mileage100000to300000', value)}
              name="mileagePercentage.mileage100000to300000"
              type="text"
              label="100,000 - 300,000 Km"
              fullWidth
              value={formData.mileagePercentage.mileage100000to300000}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              id="mileageAbove300000"
              onChange={(value) => handleSpecialChange('mileagePercentage.mileageAbove300000', value)}
              name="mileagePercentage.mileageAbove300000"
              type="text"
              label="Above 300,000 Km"
              fullWidth
              value={formData.mileagePercentage.mileageAbove300000}
            />
          </Grid>
        </Grid>
      </Card>

      <Card
        sx={{
          padding: 3,
          marginTop: 4
        }}
      >
        <Typography variant="h4" color="secondary" marginBottom={3} fontWeight='bold'>Engine Capacity Taxes</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              id="engineCapacityBelow1000"
              onChange={(value) => handleSpecialChange('engineCapacityPercentage.engineCapacityBelow1000', value)}
              name="engineCapacityPercentage.engineCapacityBelow1000"
              type="text"
              label="Under 1,000  CC"
              fullWidth
              value={formData.engineCapacityPercentage.engineCapacityBelow1000}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              id="engineCapacity1000to1999"
              onChange={(value) => handleSpecialChange('engineCapacityPercentage.engineCapacity1000to1999', value)}
              name="engineCapacityPercentage.engineCapacity1000to1999"
              type="text"
              label="1000 CC - 1999 CC"
              fullWidth
              value={formData.engineCapacityPercentage.engineCapacity1000to1999}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              id="engineCapacity2000to2999"
              onChange={(value) => handleSpecialChange('engineCapacityPercentage.engineCapacity2000to2999', value)}
              name="engineCapacityPercentage.engineCapacity2000to2999"
              type="text"
              label="2000 CC - 2999 CC"
              fullWidth
              value={formData.engineCapacityPercentage.engineCapacity2000to2999}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              id="engineCapacity3000to3999"
              onChange={(value) => handleSpecialChange('engineCapacityPercentage.engineCapacity3000to3999', value)}
              name="engineCapacityPercentage.engineCapacity3000to3999"
              type="text"
              label="3000 CC - 3999 CC"
              fullWidth
              value={formData.engineCapacityPercentage.engineCapacity3000to3999}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              id="engineCapacityAbove4000"
              onChange={(value) => handleSpecialChange('engineCapacityPercentage.engineCapacityAbove4000', value)}
              name="engineCapacityPercentage.engineCapacityAbove4000"
              type="text"
              label="4000 CC - above"
              fullWidth
              value={formData.engineCapacityPercentage.engineCapacityAbove4000}
            />
          </Grid>
        </Grid>
      </Card>

      <Card
        sx={{
          padding: 3,
          marginTop: 4
        }}
      >
        <Typography variant="h4" color="secondary" marginBottom={3} fontWeight='bold'>Other Taxes</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              id="brandPercentage"
              onChange={(value) => handleChange('brandPercentage', value)}
              name="brandPercentage"
              type="text"
              label="Brand"
              fullWidth
              value={formData.brandPercentage}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              id="fuelTypePercentage"
              onChange={(value) => handleChange('fuelTypePercentage', value)}
              name="fuelTypePercentage"
              type="text"
              label="Gasoline or Diesel Fuel"
              fullWidth
              value={formData.fuelTypePercentage}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              id="importDutyPercentage"
              onChange={(value) => handleChange('importDutyPercentage', value)}
              name="importDutyPercentage"
              type="text"
              label="Import Duty"
              fullWidth
              value={formData.importDutyPercentage}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              id="vatPercentage"
              onChange={(value) => handleChange('vatPercentage', value)}
              name="vatPercentage"
              type="text"
              label="VAT"
              fullWidth
              value={formData.vatPercentage}
            />
          </Grid>
        </Grid>
      </Card>

      <Stack justifyContent='center' alignItems="center" marginTop={5}>
        <LoadingButton variant="contained" loading={state.loading} startIcon={<EditIcon />} onClick={handleEditTaxes} color="secondary" sx={{ width: matcheBigDevices ? '30%' : '100%', marginBottom: 3 }}>
          Edit Taxes
        </LoadingButton>
      </Stack>
    </Box>
  )
}

export default TaxesPage;
