import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import ModalDialog from "components/Global/ModalDialog";

const AnnouncementTile = ({ announcement, index, onDelete, onEdit }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar>{`${index + 1}`}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={announcement.announcementTitle}
        secondary={announcement.announcementDescription}
      />
      <ListItemAvatar>
        <IconButton aria-label="edit" color="info" onClick={onEdit}>
          <Edit fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="delete" color="error" onClick={handleOpen}>
          <Delete fontSize="inherit" />
        </IconButton>
      </ListItemAvatar>
      <ModalDialog
        title="Delete announcement?"
        subTitle="Are you sure do you want to delete this announcement?"
        open={open}
        handleClose={handleClose}
        handleClickOk={() => {
          handleClose();
          onDelete();
        }}
      />
    </ListItem>
  );
};

export default AnnouncementTile;