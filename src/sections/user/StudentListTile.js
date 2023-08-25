import {
    Avatar,
    Checkbox,
    FormControl,
    IconButton,
    Link,
    MenuItem,
    Popover,
    Select,
    Stack,
    TableCell,
    TableRow,
    Typography,
  } from '@mui/material';
  import React, { useMemo, useState } from 'react';
  import Iconify from 'components/iconify/Iconify';
  import ModalDialog from 'components/Global/ModalDialog';
  
  export const ROLES = [
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' },
  ];
  //------------------------------------------------------------------------------
  
  const StudentListTile = ({
    user,
    selectedUser,
    onCheckBoxClicked,
    currentUserId,
    deleteUser,
  }) => {
    const {
      _id: id,
      firstName,
      lastName,
      regNumber,
    } = user;
  
    //Open menu
    const [openMenu, setOpenMenu] = useState(null);
    const handleOpenMenu = e => {
      setOpenMenu(e.target);
    };
    const handleCloseMenu = () => {
      setOpenMenu(null);
    };
  
    const [openModal, setOpenModal] = useState({
      show: false,
      action: null,
    });
    const handleOpenModal = action => {
      setOpenModal({ show: true, action });
      handleCloseMenu();
    };
    const handleCloseModal = () => {
      setOpenModal({ show: false, action: null });
      handleCloseMenu(null);
    };
    return (
      <>
        <TableRow
          hover
          tabIndex={-1}
          role="checkbox"
          selected={selectedUser}
        >
          <TableCell padding="checkbox">
            <Checkbox
              checked={selectedUser}
              onChange={onCheckBoxClicked}
            />
          </TableCell>
  
          <TableCell component="th" scope="row" padding="none">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar alt={firstName} sx={{background: "#F86F03", color: "white"}}>
                 {firstName.charAt(0)}
              </Avatar>
              <Typography variant="subtitle1" noWrap>
                {firstName +" "+ lastName}
              </Typography>
            </Stack>
          </TableCell>
  
          <TableCell align="left">
            <Link color="inherit" underline="hover">
              {regNumber}
            </Link>
          </TableCell>
  
          <TableCell align="left">
            Student
          </TableCell>
  
          <TableCell align="right">
            <IconButton
              size="large"
              color="inherit"
              onClick={handleOpenMenu}
            >
              <Iconify icon={'eva:more-vertical-fill'} />
            </IconButton>
          </TableCell>
        </TableRow>
        <Popover
          open={Boolean(openMenu)}
          anchorEl={openMenu}
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
            sx={{ color: 'error.main' }}
            disabled={currentUserId === id}
            onClick={() => handleOpenModal('DELETE')}
          >
            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2, color: 'error.main' }} />
            <Typography variant="body1" color="error.main">Remove</Typography>
          </MenuItem>
        </Popover>
        <ModalDialog
          title="Remove Student?"
          subTitle="Are you sure do you want to remove this student? He won't be able to login using this account on the public app!"
          open={openModal.show}
          handleClose={handleCloseModal}
          handleClickOk={() => {
            deleteUser(id);
            handleCloseModal();
          }}
        />
      </>
    );
  };
  
  export default StudentListTile;
  