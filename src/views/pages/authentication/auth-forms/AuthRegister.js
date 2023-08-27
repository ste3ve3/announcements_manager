import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    FormControl,
    CircularProgress,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery,
    MenuItem
} from '@mui/material';
import { API } from 'api';
import { toast } from 'react-hot-toast';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'components/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const initFormData = {
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    password: ''
};

const initState = { loading: false };

const FirebaseRegister = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initFormData);
    const [normalAuthError, setNormalAuthError] = useState(null)
    const [state, setState] = useState(initState);
    const navigate = useNavigate();

    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const googleHandler = async () => {
        console.error('Register');
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setState(initState);
        if(normalAuthError) {
            setNormalAuthError(null)
        }
        if(formData.password && !(level?.label === "Good" || level?.label === "Strong")) {
            setNormalAuthError("The used password is not strong enough!")
            return;
        }
        try {
            setState((prev) => ({ ...prev, loading: true }));
                await toast.promise(
                    API.post(`/auth`, formData),
                    {
                        loading: `Creating account, please wait...`,
                        success: `Account created successfully, We will reach out throught your email once this account is approved!`,
                        error: `Account creation was unsuccessfull!`
                    },
                    { position: 'top-center' }
                );
            setFormData(initFormData);
            navigate('/login')
        } catch (error) {
            setState((prev) => ({
                ...prev,
                error: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
            }));
            if(error.response?.data?.message){
                setNormalAuthError(error.response?.data?.message);
            }
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    return (
        <>
            <form onSubmit={handleRegister}>
                <Grid container spacing={matchDownSM ? 0 : 2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            margin="normal"
                            value={formData.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                            name="firstName"
                            type="text"
                            defaultValue=""
                            sx={{ ...theme.typography.customInput }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            margin="normal"
                            value={formData.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            name="lastName"
                            type="text"
                            defaultValue=""
                            sx={{ ...theme.typography.customInput }}
                        />
                    </Grid>
                </Grid>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-email-register"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        name="email"
                        inputProps={{}}
                    />
                </FormControl>

                <TextField
                    id="outlined-select-currency"
                    select
                    label={formData.role == "" ? "Role" : ""}
                    value={formData.role}
                    fullWidth
                    sx={{ ...theme.typography.customInput }}
                    onChange={(e) => handleChange('role', e.target.value)}
                >
                    <MenuItem value="Principal">Principal</MenuItem>
                    <MenuItem value="Dean">Dean of School</MenuItem>
                    <MenuItem value="HOD">Head Of Department</MenuItem>
                    <MenuItem value="Teacher">Teacher</MenuItem>
                </TextField>

                <FormControl
                    fullWidth
                    sx={{ ...theme.typography.customInput }}
                >
                    <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password-register"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => {
                            handleChange('password', e.target.value)
                            changePassword(e.target.value);
                        }}
                        name="password"
                        label="Password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    size="large"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        inputProps={{}}
                    />
                </FormControl>

                {strength !== 0 && (
                    <FormControl fullWidth>
                        <Box sx={{ mb: 2 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Box
                                        style={{ backgroundColor: level?.color }}
                                        sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" fontSize="0.75rem">
                                        {level?.label}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </FormControl>
                )}

                {normalAuthError && (
                    <Box sx={{ mt: 2, color: 'red' , fontSize: '28px' }}>
                        <FormHelperText error sx={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>{normalAuthError}</FormHelperText>
                    </Box>
                )}

                <Box sx={{ mt: 2 }}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            disabled={state.loading}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="secondary"
                            startIcon={state.loading ? <CircularProgress size={20} color="inherit" /> : undefined}
                        >
                            {
                                state.loading ? 'Signing Up...' : 'Sign Up'
                            }
                        </Button>
                    </AnimateButton>
                </Box>
            </form>
        </>
    );
};

export default FirebaseRegister;
