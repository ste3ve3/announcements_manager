import { Box, Button, CircularProgress, Container, Stack, TextField, Typography } from '@mui/material';
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
    postDescription: '',
    postBody: '',
    postImage: '',
    isPublic: true
};

const initState = { loading: false, error: null };

const UploadAnnouncement = ({ currentAnnouncement, addAnnouncement, editAnnouncement }) => {
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
                postDescription: currentAnnouncement.postDescription,
                postBody: currentAnnouncement.postBody,
                postImage: currentAnnouncement.postImage,
                isPublic: currentAnnouncement.isPublic
            });
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
                    toast.error('No changes made', { position: 'top-right' });
                    return;
                }
                const result = await toast.promise(API.patch(`/Announcement/updatePost?slug=${currentAnnouncement.slug}`, newObj), {
                    loading: `Updating Announcement, please wait...`,
                    success: `Announcement ${currentAnnouncement.title} updated successfully!`,
                    error: (error) => {
                        if (error.response) {
                            return `Error: ${error.response?.data?.message}`;
                        } else {
                            return 'Something went wrong while updating Announcement, please try again';
                        }
                    }
                });
                editAnnouncement({ ...result.data.data, postCreator: result.data.data.createdBy });
            } else {
                const result = await toast.promise(API.post(`/Announcement/create`, formData), {
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
            }
            setFormData(initFormData);
            nav('/content/Announcements');
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
            {/* <MessageAlert state={state} /> */}
            <Stack spacing={1.2} sx={{ p: { xs: 0, md: 1, lg: 2 } }}>
                <Typography variant="h3" sx={{ mb: 2 }}>
                    {currentAnnouncement ? 'Update' : 'New'} Announcement
                </Typography>
                <ChooseFileImage
                    selected={formData.postImage}
                    fullWidth
                    onSelect={(selected) => handleChange('postImage', selected)}
                />
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

export default connect(null, mapDispatchToProps)(UploadAnnouncement);