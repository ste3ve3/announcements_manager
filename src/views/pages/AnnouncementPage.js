import React from 'react'
import { Stack, Typography, Button, List } from '@mui/material'
import DataWidget from 'components/Global/DataWidget'
import AnnouncementTile from 'components/announcement/AnnouncementTile'
import { IconCirclePlus } from "@tabler/icons";

const AnnouncementPage = () => {
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
            >
            <List sx={{ width: '100%', bgcolor: 'background.paper', my: 2 }}>
                <AnnouncementTile 
                    announcement={{
                        announcementTitle: "The first announcement",
                        announcementDescription: "The description of the first announcement"
                    }}
                    index={0}
                />
            </List>
        </DataWidget>
    </div>
  )
}

export default AnnouncementPage