import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import {
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
  Box,
  Stack,
  IconButton,
  MenuItem,
  Popover,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import Groups2Icon from '@mui/icons-material/Groups2';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import avatarShape from "../../assets/images/shape-avatar.svg"
import SvgColor from '../../components/svg-color';
import Iconify from 'components/iconify/Iconify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalDialog from 'components/Global/ModalDialog';

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

export default function AuctionCard({ car, onDelete, onClearance, handlePublish, onMove }) {
  const {
    _id: id,
    carImage,
    carName,
    brand,
    year,
    isPublic,
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

  const [openClearanceModal, setOpenClearanceModal] = useState(false);
  const handleOpenClearanceModal = () => {
    setOpenClearanceModal(true);
    handleCloseMenu();
  };
  const handleCloseClearanceModal = () => {
    setOpenClearanceModal(false);
  };

  const [openMoveModal, setOpenMoveModal] = useState(false);
  const handleOpenMoveModal = () => {
    setOpenMoveModal(true);
    handleCloseMenu();
  };
  const handleCloseMoveModal = () => {
    setOpenMoveModal(false);
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
            handlePublish(id, isPublic ? false : true )
        }}
        >
          <Iconify icon={'eva:external-link-fill'} sx={{ mr: 2 }} />
            { isPublic ? 'Unpublish' : 'Publish' }
        </MenuItem>
        <MenuItem
          onClick={handleOpenMoveModal}
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
        title="Car Clearance?"
        subTitle={`Are you sure you want to clear this car?`}
        item={carName}
        open={openClearanceModal}
        handleClose={handleCloseClearanceModal}
        handleClickOk={() => {
          handleCloseClearanceModal();
          onClearance(id); 
      }}
      />
      <ModalDialog
        title="Move car to auction?"
        subTitle={`Are you sure you want to move this car to auction?`}
        item={carName}
        open={openMoveModal}
        handleClose={handleCloseMoveModal}
        handleClickOk={() => {
          handleCloseMoveModal();
          onMove(id);
      }}
      />
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