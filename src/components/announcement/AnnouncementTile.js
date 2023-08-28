import React from "react";
import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Chip
} from "@mui/material";
import { useState } from "react";
import ModalDialog from "components/Global/ModalDialog";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { deepOrange, green } from '@mui/material/colors';
import { useNavigate } from "react-router";

const AnnouncementTile = ({ announcement, index, onDelete }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar variant="square" sx={{width: 35, height: 35, bgcolor: "#A84448", color:"white"}}>{`${index + 1}`}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            <Typography
              fontSize="medium"
              fontWeight="semiBold"
              color="initial"
            >
              {announcement.title}
            </Typography>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
              <Typography
                component="span"
                fontSize="small"
                color="initial"
                display="flex"
                alignItems="center"
                gap={1}
                marginTop={1}
              >
                <Avatar sx={{ bgcolor: "#84cdee", width: 30, height: 30, color: "white" }}>{announcement.staffCreator?.firstName.charAt(0)}</Avatar>
                {announcement.staffCreator?.firstName +" "+ announcement.staffCreator?.lastName}
              </Typography>
          </React.Fragment>
        } 
      />
      <ListItemAvatar>
        <IconButton aria-label="edit" color="info" onClick={() => navigate(`/content/announcement/${announcement._id}`)}>
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