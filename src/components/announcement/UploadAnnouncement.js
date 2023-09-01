import { Box, Button, CircularProgress, MenuItem, Stack, TextField, Typography, Chip } from '@mui/material';
import { API } from 'api';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { addAnnouncement, editAnnouncement } from 'store/actions/announcement';
import { compareObj } from 'utils/constants';
import ChooseFileField from './ChooseFileField';

const initFormData = {
    title: '',
    category: '',
    announcementFile: '',
};

const initState = { loading: false, error: null };

const UploadAnnouncement = ({ currentAnnouncement, addAnnouncement, editAnnouncement }) => {
    const nav = useNavigate();

    const [formData, setFormData] = useState(initFormData);
    const [state, setState] = useState(initState);

    useEffect(() => {
        if (currentAnnouncement) {
            setFormData({
                title: currentAnnouncement.title,
                category: currentAnnouncement.category,
                announcementFile: currentAnnouncement.announcementFile,
            });
        } else {
            setFormData(initFormData);
        }
    }, [currentAnnouncement]);

    const handleChange = (name, selectedFiles) => {
        setFormData((prev) => ({ ...prev, [name]: selectedFiles }));
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
                    toast.error('No changes made on the file!', { position: 'top-center' });  
                    return;
                }
                const result = await toast.promise(API.patch(`/announcement?announcementId=${currentAnnouncement._id}`, newObj), {
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
                const result = await toast.promise(API.post(`/announcement`, formData), {
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
                    <MenuItem value="School of Computing and IT">School of Computing and IT</MenuItem>
                    <MenuItem value="School of Law">School of Law</MenuItem>
                    <MenuItem value="School of Business Management and Economic">School of Business Management and Economics</MenuItem>
                    <MenuItem value="School of Computing and Information Technology">School of Computing and Information Technology</MenuItem>
                    <MenuItem value="School of Education">School of Education </MenuItem>
                    <MenuItem value="School of Graduate Studie">School of Graduate Studies</MenuItem>
                    <MenuItem value="School of Professional and Executive Programmes">School of Professional and Executive Programmes</MenuItem>
                    <MenuItem value="Center for Economic Governance and Leadership">Center for Economic Governance and Leadership</MenuItem>
                    <MenuItem value="Center for Modern Languages">Center for Modern Languages</MenuItem>
                </TextField>
                {
                    currentAnnouncement &&
                    <a
                        href={currentAnnouncement.announcementFile}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: 'none' }}
                    >
                        <Chip
                        clickable
                        icon={<PictureAsPdfIcon />}
                        label="Current announcement File"
                        />
                    </a>
                }
                <ChooseFileField
                    label="Announcement File"
                    error={state.error}
                    isMultiple={false}
                    onChange={(selectedFiles) => handleChange('announcementFile', selectedFiles)}
                />
                <Box sx={{ py: 3 }}>
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        sx={{ color: '#ffffff' }}
                        disabled={formData.announcementFile == "" || formData.title == "" || formData.category == ""}
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

export default connect(null, mapDispatchToProps)(UploadAnnouncement);
