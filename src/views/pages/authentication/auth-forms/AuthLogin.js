import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Divider,
    FormControl,
    CircularProgress,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { Formik } from 'formik';
import AnimateButton from 'components/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Google from 'assets/images/icons/social-google.svg';
import { API } from 'api';
import { toast } from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';

    const initFormData = {
        email: '',
        password: ''
    };

  const initState = { loading: false, error: null, googleLoading: false, googleError: null };

const FirebaseLogin = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [formData, setFormData] = useState(initFormData);
    const [state, setState] = useState(initState);
    const [normalAuthError, setNormalAuthError] = useState(null)
    const [googleAuthError, setGoogleAuthError] = useState(null)

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNormalLogin = async (e) => {
        e.preventDefault();
        setState(initState);
        try {
            setState((prev) => ({ ...prev, loading: true }));
                await toast.promise(
                    API.post(`/auth/login`, formData),
                    {
                        loading: `Checking credentials, please wait...`,
                        success: `Logged In Successfully!`,
                        error: `Login was unsuccessfull!`
                    },
                    { position: 'top-center' }
                );
            setFormData(initFormData);
            navigate('/')
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

    const googleSuccess = (response) => {
        const accessToken = response.access_token;
    
        fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
        })
        .then(response => response.json())
        .then(async(data) => {
            setState(initState);
            try {
                setState((prev) => ({ ...prev, googleLoading: true }));
                    await toast.promise(
                        API.post(`/auth/googleAuth?isDashboardAuth=true`, data),
                        {
                            loading: `Checking credentials, please wait...`,
                            success: `Logged In Successfully!`,
                            error: `Login was unsuccessfull!`
                        },
                        { position: 'top-center' }
                    );
                navigate('/')
            } catch (error) {
                setState((prev) => ({
                    ...prev,
                    googleError: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
                }));
                if(error.response?.data?.message){
                    setGoogleAuthError(error.response?.data?.message);
                }
            } finally {
                setState((prev) => ({ ...prev, googleLoading: false }));
            }
        })
        .catch(error => {
          toast.error(error);
        });
      }


    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Formik>
                <form noValidate onSubmit={handleNormalLogin} {...others}>
                    <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-login"
                            type="email"
                            value={formData.email}
                            name="email"
                            onChange={(e) => handleChange('email', e.target.value)}
                            label="Email Address / Username"
                            inputProps={{}}
                        />
                    </FormControl>

                    <FormControl
                        fullWidth
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-login"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            name="password"
                            onChange={(e) => handleChange('password', e.target.value)}
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
                            label="Password"
                            inputProps={{}}
                        />
                    </FormControl>
                    
                    {normalAuthError && (
                        <Box sx={{ mt: 2, color: 'red' , fontSize: '28px' }}>
                            <FormHelperText error sx={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>{normalAuthError}</FormHelperText>
                        </Box>
                    )}

                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button
                                disableElevation
                                fullWidth
                                disabled={state.loading}
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                                startIcon={state.loading ? <CircularProgress size={20} color="inherit" /> : undefined}
                            >
                                {
                                    state.loading ? 'Signing In...' : 'Sign in'
                                }
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            </Formik>
        </>
    );
};

export default FirebaseLogin;
