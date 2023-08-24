import { Box, Button, CircularProgress, Container, Stack, TextField, Typography, Chip } from '@mui/material';
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
                announcementFile: currentAnnouncement.announcementFile
            });
        } else {
            setFormData(initFormData);
        }
    }, [currentAnnouncement]);

    const handleChange = (name, selectedFiles) => {
        setFormData((prev) => ({ ...prev, [name]: selectedFiles }));
    };
    console.log(currentAnnouncement);
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
                editAnnouncement({ ...result.data.data, createdBy: result.data.data.createdBy });
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
                addAnnouncement({ ...result.data.data, postCreator: result.data.data.createdBy });
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
                        disabled={formData.announcementFile == ""}
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
