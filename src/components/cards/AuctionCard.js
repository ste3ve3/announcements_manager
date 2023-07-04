import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import {
  Link,
  Card,
  Grid,
  Avatar,
  CardContent,
  Stack,
  IconButton,
  MenuItem,
  Popover, Typography,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import Iconify from 'components/iconify/Iconify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalDialog from 'components/Global/ModalDialog';
import toast from "react-hot-toast";

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledcarName = styled(Link)({
  width: '100%',
  height: 44,
  overflow: 'hidden',
  fontSize: "18px",
  fontWeight: "bold",
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  background: '#55BDB3',
  color: "white",
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  gap: 20,
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

AuctionCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function AuctionCard({ car, onDelete, handlePublish, handleEditCar }) {
  const {
    _id: id,
    carImage,
    carName,
    brand,
    year,
    isPublic,
    auctionDate,
    auctionTime,
    auctionLocation,
    locationMap,
    contactPhone1,
    contactPhone2,
    contactEmail
  } = car;
  const nav = useNavigate();

  const handleOpenMenu = event => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const [open, setOpen] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
    handleCloseMenu();
  };
  const handleCloseModal = () => {
    setOpenModal(false); 
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ position: 'relative' }}>
          <StyledCardMedia>
            <StyledCover alt={carName} src={carImage} />
          </StyledCardMedia>

          <CardContent
            sx={{
              pt: 3,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="start"
              spacing={2}
            >
              <StyledcarName
                color="inherit"
                variant="subcarName2"
                underline="none"
              >
                {carName}
                {
                  (!auctionDate || !auctionTime || !auctionLocation || !locationMap || !contactPhone1 || !contactPhone2 || !contactEmail) &&
                  <Typography variant="body1" color="red">
                    [ Missing some auction details ]
                  </Typography>
                } 
              </StyledcarName>
              <IconButton onClick={handleOpenMenu}>
                <Iconify
                  icon="eva:more-vertical-fill"
                  sx={{ width: 14, height: 16, mr: 0.5 }}
                />
              </IconButton>
            </Stack>

            <StyledInfo>
                <Stack direction="row" fontSize="medium" alignItems="center" gap={1}>
                    <BrandingWatermarkIcon color="secondary"/>
                    {brand}
                </Stack>
                <Stack direction="row" fontSize="medium" alignItems="center" gap={1}>
                    <CalendarMonthIcon color="secondary"/>
                    {year}
                </Stack>
            </StyledInfo>
          </CardContent>
        </Card>
      </Grid>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          sx={{ color: 'success.main' }}
          onClick={() => {
            if(!isPublic && (!auctionDate || !auctionTime || !auctionLocation || !locationMap || !contactPhone1 || !contactPhone2 || !contactEmail)){
              toast.error("This car is missing some auction details!")
              handleCloseMenu()
            }
            else {
              handlePublish(id, isPublic ? { isPublic: false } : { isPublic: true } )
              handleCloseMenu()
            }  
        }}
        >
          <Iconify icon={'eva:external-link-fill'} sx={{ mr: 2 }} />
            { isPublic ? 'Unpublish' : 'Publish' }
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleEditCar()
            handleCloseMenu()
          }}
        >
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem
          sx={{ color: 'error.main' }}
          onClick={handleOpenModal}
        >
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <ModalDialog
        title="Delete Car?"
        subTitle={`Are you sure you want to delete this car?`}
        item={carName}
        open={openModal}
        handleClose={handleCloseModal}
        handleClickOk={() => {
          handleCloseModal();
          onDelete(id);
      }}
      />
    </>
  );
}