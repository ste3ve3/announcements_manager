import React, { useEffect, useState } from 'react'
import { Stack, Typography, Button, List, Divider } from '@mui/material'
import DataWidget from 'components/Global/DataWidget'
import AnnouncementTile from 'components/announcement/AnnouncementTile'
import { IconCirclePlus } from "@tabler/icons";
import { getAllAnnouncements, deleteAnnouncement } from 'store/actions/announcement';
import { useFetcher, API } from 'api';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';

const initState = { loading: false, error: null };

const AnnouncementPage = ({
    announcements,
    getAnnouncements,
    deleteAnnouncement
  }) => {
  const [state, setState] = useState(initState);
  const { data, isError, isLoading } = useFetcher('/announcement');
       
  useEffect(() => {
    if (data?.data?.length) {
        getAnnouncements({ announcements: data?.data });
    }
    }, [data?.data?.length]);

    const handleDeleteAnnouncement = async (id) => {
        setState(initState);
        try {
            setState((prev) => ({ ...prev, loading: true }));
            await toast.promise(API.delete(`/announcement?announcementId=${id}`), {
                loading: `Hold on, we are deleting this announcement from our system.`,
                success: `Announcement deleted successfully!`,
                error: (error) => {
                    if (error.response) {
                        return `Error: ${error.response?.data?.message || error.message || 'Unknown error occured'}`;
                    } else {
                        return 'Something went wrong while deleting this announcement, please try again';
                    }
                }
            });
            deleteAnnouncement(id);
        } catch (error) {
          setState((prev) => ({
            ...prev,
            error: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
        }));
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    }

  return (
    <div>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h3">Manage Announcements</Typography>
            <Button
                sx={{ mt: 2 }}
                component="a"
                variant="outlined"
                href="/content/addAnnouncemment"
                color="secondary"
                startIcon={<IconCirclePlus />}
                >
                Add Announcement
            </Button>
        </Stack>
        <DataWidget
                title="Announcements"
                isLoading={isLoading && !announcements?.length && !isError}
                isError={!isLoading && isError && !announcements?.length ? isError : null }
                isEmpty={!isError && !isLoading && !announcements?.length}
            >
            <List sx={{ width: '100%', bgcolor: 'background.paper', my: 2 }}>
                {announcements.map((announcement, index) => {
                return (
                    <div key={index}>
                    <AnnouncementTile
                        announcement={announcement}
                        index={index}
                        onDelete={() => handleDeleteAnnouncement(announcement._id)}
                    />
                    {index !== announcements.length - 1 && (
                        <Divider variant="inset" component="li" />
                    )}
                    </div>
                );
                })}
            </List>
        </DataWidget>
    </div>
  )
}

const mapStateToProps = state => ({
    announcements: state.announcement.announcements,
    });
    
    const mapDispatchToProps = dispatch => {
      return {
        getAnnouncements: (data) => dispatch(getAllAnnouncements(data)), 
        deleteAnnouncement: id => dispatch(deleteAnnouncement(id))
      };
    };
    export default connect(
      mapStateToProps,
      mapDispatchToProps,
    )(AnnouncementPage);