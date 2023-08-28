import { Box, Button, CircularProgress, Container, Stack, TextField, Typography,FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { API } from 'api';
import ChooseFileImage from 'components/Global/ChooseFileImage';
import MessageAlert from 'components/Global/MessageAlert';
import IosSwitch from 'components/extended/IosSwitch';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { addAnnouncement, editAnnouncement } from 'store/actions/announcement';
import { compareObj } from 'utils/constants';
import RichTextEditor from './RichTextEditor';

const initFormData = {
    title: '',
    announcementBody: '',
    category: '',
    headerImage: '',
};

const initState = { loading: false, error: null };

const AnnouncementForm = ({ currentAnnouncement, addAnnouncement, editAnnouncement }) => {
    const nav = useNavigate();

    const [formData, setFormData] = useState(initFormData);
    const [state, setState] = useState(initState);
    const [switchOn, setSwitchOn] = useState(false);

    const handleSwitchChange = () => {
        setSwitchOn(!switchOn);
      };

    useEffect(() => {
        if (currentAnnouncement) {
            setFormData({
                title: currentAnnouncement.title,
                announcementBody: currentAnnouncement.announcementBody,
                category: currentAnnouncement.category,
                headerImage: currentAnnouncement.headerImage,
            });
            if(currentAnnouncement.headerImage) {
                setSwitchOn(true)
            }
        } else {
            setFormData(initFormData);
        }
    }, [currentAnnouncement]);

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state.loading) return;
        setState(initState);
        try {
            setState((prev) => ({ ...prev, loading: true }));
            if (currentAnnouncement) {
                const newObj = compareObj(currentAnnouncement, formData);
                if (!Object.keys(newObj).length) {
                    toast.error('No changes made on this announcement', { position: 'top-center' });
                    return;
                }
                const result = await toast.promise(API.patch(`/announcement?announcementId=${currentAnnouncement._id}&isTyped=true`, newObj), {
                    loading: `Updating Announcement, please wait...`,
                    success: `Announcement updated successfully!`,
                    error: (error) => {
                        if (error.response) {
                            return `Error: ${error.response?.data?.message}`;
                        } else {
                            return 'Something went wrong while updating Announcement, please try again';
                        }
                    }
                });
                editAnnouncement({ ...result.data.data, staffCreator: result.data.data.staffCreator });
                setFormData(initFormData);
                window.location.replace('/content/announcements');
            } else {
                const result = await toast.promise(API.post(`/announcement?isTyped=true`, formData), {
                    loading: `Adding Announcement, please wait...`,
                    success: `Announcement added successfully!`,
                    error: (error) => {
                        if (error.response) {
                            return `Error: ${error.response.data.message}`;
                        } else {
                            return 'Something went wrong while adding Announcement, please try again';
                        }
                    }
                });
                addAnnouncement({ ...result.data.data, postCreator: result.data.data.staffCreator });
                setFormData(initFormData);
                nav('/content/announcements');
            }
        } catch (error) {
            setState((prev) => ({
                ...prev,
                error: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
            }));
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={1.2} sx={{ p: { xs: 0, md: 1, lg: 2 } }}>
                <Typography variant="h3" sx={{ mb: 2 }}>
                    {currentAnnouncement ? 'Update' : 'New'} Announcement
                </Typography>
                <TextField
                    label="Title"
                    color="secondary"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    fullWidth
                />
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Announcement Category"
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="School of Law">School of Law</MenuItem>
                    <MenuItem value="School of Business Management and Economic">School of Business Management and Economics</MenuItem>
                    <MenuItem value="School of Computing and Information Technology">School of Computing and Information Technology</MenuItem>
                    <MenuItem value="School of Education">School of Education </MenuItem>
                    <MenuItem value="School of Graduate Studie">School of Graduate Studies</MenuItem>
                    <MenuItem value="School of Professional and Executive Programmes">School of Professional and Executive Programmes</MenuItem>
                    <MenuItem value="Center for Economic Governance and Leadership">Center for Economic Governance and Leadership</MenuItem>
                    <MenuItem value="Center for Modern Languages">Center for Modern Languages</MenuItem>
                </TextField>
                <RichTextEditor onChange={(html) => handleChange('announcementBody', html)} html={formData.announcementBody} />
                {/* <IosSwitch label="Add a header Image" checked={switchOn} onChange={handleSwitchChange}/>
                {
                    switchOn &&
                    <ChooseFileImage
                        selected={formData.headerImage}
                        fullWidth
                        onSelect={(selected) => handleChange('headerImage', selected)}
                    />
                } */}
                <Box sx={{ py: 3 }}>
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        sx={{ color: '#ffffff' }}
                        startIcon={state.loading ? <CircularProgress size={20} color="inherit" /> : undefined}
                    >
                        {state.loading ? 'Loading...' : currentAnnouncement ? 'Update Announcement' : 'Add Announcement'}
                    </Button>
                </Box>
            </Stack>
        </form>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addAnnouncement: (data) => dispatch(addAnnouncement(data)),
        editAnnouncement: (data) => dispatch(editAnnouncement(data))
    };
};

export default connect(null, mapDispatchToProps)(AnnouncementForm);
