import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    CircularProgress,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Paper,
    Popper,
    Stack,
    Switch,
    Link,
    Typography
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MainCard from 'components/cards/MainCard';
import Transitions from 'components/extended/Transitions';
import User1 from 'assets/images/users/user-round.svg';
import { IconLogout, IconLogin, IconSettings, IconUser } from '@tabler/icons';
import { getLoggedInUser } from 'store/actions/auth';
import { connect } from 'react-redux';
import { API, useFetcher } from 'api';
import { toast } from 'react-hot-toast';

const initState = { loading: false, error: null };

const StyledAccount = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha('#d1f1f8', 0.70),
  }));

const ProfileSection = ({ loggedInUser, getUser }) => {
    const { data, isError, isLoading } = useFetcher('/auth/loggedInUser');
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();
    const [state, setState] = useState(initState);
    const [sdm, setSdm] = useState(true);
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    useEffect(() => {
        if (data?.loggedInUser) {
            getUser({ loggedInUser: data?.loggedInUser });
        }
    }, [data?.loggedInUser]);

    useEffect(() => {
        if ((!isLoading && isError) || loggedInUser?.role == "user") {
          navigate('/login');
          window.location.reload();
        }
      }, [isLoading, isError]);
    
    const handleLogout = async (e) => {
        e.preventDefault();
        setState(initState);
        try {
            setState((prev) => ({ ...prev, loading: true }));
                await toast.promise(
                    API.post(`/auth/logout`),
                    {
                        loading: `Signing out, please wait...`,
                        success: `Logged out Successfully!`,
                        error: `Logout was unsuccessfull!`
                    },
                    { position: 'top-center' }
                );
            navigate('/login')
        } catch (error) {
            setState((prev) => ({
                ...prev,
                error: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
            }));
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        loggedInUser &&
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.primary.light,
                    backgroundColor: theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: 'rgb(0, 180, 208)',
                        background: 'rgb(0, 180, 208)',
                        color: 'white',
                        '& svg': {
                            stroke: 'white'
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={loggedInUser?.picture?.url}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            color: 'white',
                            background: '#023C45'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    >
                        {loggedInUser?.names?.charAt(0)}
                    </Avatar>
                }
                label={<IconSettings stroke={1.5} size="1.5rem" color='rgb(0, 180, 208)' />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Box sx={{ p: 2 }}>
                                        <Stack>
                                            <Stack direction="row" spacing={0.5} sx={{my: 1, mb:2}} alignItems="center">
                                                <Typography variant="h4">Welcome to the admin dashboard</Typography>
                                            </Stack>
                                            
                                        </Stack>
                                        <Divider />
                                    </Box>
                                    <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                                        <Box sx={{ p: 2 }}>
                                            
                                        <Box sx={{ mb: 5, mx: 2.5 }}>
                                            <Link underline="none">
                                            <StyledAccount>
                                                <Avatar 
                                                src={loggedInUser?.picture?.url}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    color: 'white',
                                                    background: '#023C45'
                                                }} 
                                                alt={loggedInUser?.names}
                                                >
                                                  {loggedInUser?.names?.charAt(0)}
                                                </Avatar>

                                                <Box sx={{ ml: 2 }}>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{ color: 'text.primary', font: 'bold' }}
                                                >
                                                    {loggedInUser?.names}
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: 'text.secondary' }}
                                                >
                                                    {loggedInUser?.role}
                                                </Typography>
                                                </Box>
                                            </StyledAccount>
                                            </Link>
                                        </Box>
                                            {/* <Divider />
                                            <Card
                                                sx={{
                                                    bgcolor: theme.palette.primary.light,
                                                    my: 2
                                                }}
                                            >
                                                <CardContent>
                                                    <Grid container spacing={3} direction="column">
                                                        <Grid item>
                                                            <Grid item container alignItems="center" justifyContent="space-between">
                                                                <Grid item>
                                                                    <Typography variant="subtitle1">Allow Notifications</Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Switch
                                                                        checked={notification}
                                                                        onChange={(e) => setNotification(e.target.checked)}
                                                                        name="sdm"
                                                                        size="small"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                            <Divider /> */}
                                            <List
                                                component="nav"
                                                sx={{
                                                    width: '100%',
                                                    maxWidth: 350,
                                                    minWidth: 300,
                                                    backgroundColor: theme.palette.background.paper,
                                                    borderRadius: '10px',
                                                    [theme.breakpoints.down('md')]: {
                                                        minWidth: '100%'
                                                    },
                                                    '& .MuiListItemButton-root': {
                                                        mt: 0.5
                                                    }
                                                }}
                                            >
                                                <Link href={process.env.REACT_APP_CLIENT_URL} underline='none' target='__blank'>
                                                <ListItemButton
                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                    selected={selectedIndex === 0}
                                                    
                                                >
                                                    <ListItemIcon>
                                                        <IconLogout stroke={1.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Go to Website</Typography>} />
                                                </ListItemButton>
                                                </Link>
                                                <ListItemButton
                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                    selected={selectedIndex === 4}
                                                    onClick={handleLogout}
                                                >
                                                    <ListItemIcon>
                                                        {state.loading ? <CircularProgress size={20} color="inherit" /> : <IconLogin stroke={1.5} size="1.3rem" />}  
                                                    </ListItemIcon>
                                                    <ListItemText 
                                                        primary={<Typography 
                                                        variant="body2"
                                                    >
                                                        {
                                                            state.loading ? 'Logging out...' : 'Logout'
                                                        }
                                                    </Typography>} />
                                                </ListItemButton>
                                            </List>
                                        </Box>
                                    </PerfectScrollbar>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

const mapStateToProps = (state) => ({
    loggedInUser: state.auth.loggedInUser
});

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (data) => dispatch(getLoggedInUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSection);
