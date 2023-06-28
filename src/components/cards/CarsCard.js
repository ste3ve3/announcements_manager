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

CarsCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function CarsCard({ car, onDelete, onPublish }) {
  const {
    carImage,
    carName,
    brand,
    year,
    fuelType,
    transmission,
    passengerCapacity,
    ownedBy,
    slug,
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
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    handleCloseMenu();
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ position: 'relative' }}>
          <StyledCardMedia>
            <SvgColor
              color="paper"
              src={avatarShape}
              sx={{
                width: 80,
                height: 36,
                zIndex: 9,
                bottom: -15,
                position: 'absolute',
                color: 'background.paper',
              }}
            />
            <StyledAvatar alt={car.ownedBy.names}>
              {car.ownedBy.names.charAt(0).toUpperCase()}
            </StyledAvatar>

            <StyledCover alt={carName} src={carImage} />
          </StyledCardMedia>

          <CardContent
            sx={{
              pt: 4,
            }}
          >
            <Typography
              gutterBottom
              variant="caption"
              fontSize="small"
              fontWeight="bold"
              sx={{ color: 'text.disabled', display: 'block' }}
            >
              Owned by _ {ownedBy.names}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="start"
              spacing={2}
            >
              <StyledcarName
                color="inherit"
                variant="subcarName2"
                underline="hover"
                href={`${process.env.REACT_APP_WEB_URL}/blog/${slug}`}
                target="_blank"
                component="a"
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
                <Stack direction="row" fontSize="medium" alignItems="center" gap={1}>
                    <LocalGasStationIcon color="secondary"/>
                    {fuelType}
                </Stack>
                <Stack direction="row" fontSize="medium" alignItems="center" gap={1}>
                    <ElectricCarIcon color="secondary"/>
                    {transmission}
                </Stack>
                <Stack direction="row" fontSize="medium" alignItems="center" gap={1}>
                    <Groups2Icon color="secondary"/>
                    {passengerCapacity}
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
          sx={{ color: 'primary.main' }}
          href={`${process.env.REACT_APP_WEB_URL}/blog/${slug}`}
          target="_blank"
          component="a"
        >
          <Iconify icon={'eva:eye-fill'} sx={{ mr: 2 }} />
          Preview
        </MenuItem>
        <MenuItem
          sx={{ color: 'success.main' }}
          onClick={() => {
            handleCloseMenu();
            onPublish();
          }}
        >
          <Iconify icon={'eva:external-link-fill'} sx={{ mr: 2 }} />
          {isPublic === true ? 'Unpublish' : 'Publish'}
        </MenuItem>
        <MenuItem
          onClick={() => nav(`/dashboard/blogs/edit/${slug}`)}
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
        carName="Delete Blog?"
        subcarName={`Are you sure do you want to delete this blog?`}
        item={carName}
        open={openModal}
        handleClose={handleCloseModal}
        handleClickOk={() => {
          handleCloseModal();
          onDelete();
        }}
      />
    </>
  );
}