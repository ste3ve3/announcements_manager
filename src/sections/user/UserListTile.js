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

const UserListTile = ({
  user,
  selectedUser,
  onCheckBoxClicked,
  editRole,
  currentUserId,
  deleteUser,
}) => {
  const {
    _id: id,
    names,
    role,
    email,
    isVerified,
    picture,
    nationalId,
  } = user;
  //Current role state
  const [currentRole, setCurrentRole] = useState(role);
  useMemo(() => {
    if (currentRole !== role) {
      setCurrentRole(role);
    }
  }, [role]);
  //Handle change current role
  const onChangeRole = e => {
    const { value } = e.target;
    setCurrentRole(value);
    handleOpenModal();
  };

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
    setCurrentRole(role);
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
            <Avatar alt={names} sx={{background: '#55BDB3', color: "white"}}>
               {names.charAt(0)}
            </Avatar>
            <Typography variant="subtitle1" noWrap>
              {names}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">
          <Link color="inherit" underline="hover">
            {email}
          </Link>
        </TableCell>

        <TableCell align="center">{nationalId}</TableCell>

        <TableCell align="center">
          {isVerified ? 'Yes' : 'No'}
        </TableCell>

        <TableCell align="left">
          <FormControl fullWidth sx={{ my: 1 }}>
            <Select
              labelId="select-role"
              id="select-role"
              value={currentRole}
              onChange={onChangeRole}
              label="Select Role"
              required
              disabled={
                currentUserId === id
              }
            >
              {ROLES.map((role, index) => {
                return (
                  <MenuItem
                    value={role.value}
                    key={index}
                  >
                    {role.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <ModalDialog
        title={
          openModal.action === 'DELETE'
            ? 'Delete User?'
            : 'Confirm this action!'
        }
        subTitle={
          openModal.action === 'DELETE'
            ? `Are you sure do you want to delete this user? He won't be able to login using this account!`
            : `This action will change what a user can or can't access on Magerwa VCC Platform!`
        }
        open={openModal.show}
        handleClose={handleCloseModal}
        handleClickOk={() => {
          if (openModal.action === 'DELETE') {
            deleteUser(id);
          } else {
            editRole(id, {
              role: currentRole,
            });
          }
          handleCloseModal();
        }}
      />
    </>
  );
};

export default UserListTile;
