import { filter } from 'lodash';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TextField,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from '@mui/material';
// components
import Scrollbar from 'components/scrollbar';
// sections
import {
  UserListHead,
  StudentListTile,
  UserListToolbar,
} from 'sections/user';
import { API, useFetcher } from 'api';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-hot-toast';
import {
  getStudents,
  deleteStudent,
  addStudent
} from 'store/actions/student';
import DataWidget from 'components/Global/DataWidget';
import Sidebar from 'components/Global/Sidebar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Student Name', alignRight: false },
  { id: 'regNumber', label: 'Registration Number', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return array.filter(
      _user =>
        _user.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.lastName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map(el => el[0]);
}

const initState = { loading: false, error: null };

const initFormData = {
    firstName: '',
    lastName: '',
    regNumber: '',
    studentEmail: ''
};

const StudentsPage = ({
  students,
  getStudents,
  deleteStudent,
  addStudent
}) => {

  const { data, isError, isLoading } = useFetcher('/student');

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [state, setState] = useState(initState);

  const [formData, setFormData] = useState(initFormData);

  const [openSidebar, setOpenSidebar] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
   
  useEffect(() => {
      if (!isChecked) {
          setFormData({ ...formData, studentEmail: "" });
      }
  }, [isChecked]);
   
  useEffect(() => {
      if (data?.registeredUsers?.length) {
          getStudents({ students: data?.registeredUsers });
      }
  }, [data?.registeredUsers?.length]);

  console.log(data)
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = students?.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  console.log(formData);
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
}

  const handleAddStudent = async () => {
    setState(initState);
    try {
        setState((prev) => ({ ...prev, loading: true }));
            const result = await toast.promise(
                API.post(`/student`, formData),
                {
                    loading: `Adding student, please wait...`,
                    success: `Student added successfully!`,
                    error: `Something went wrong while adding this student, please try again!`
                },
                { position: 'top-center' }
            );
            addStudent(result.data.addedStudent)
            setFormData(initFormData);
            setOpenSidebar(false);
    } catch (error) {
        setState((prev) => ({
            ...prev,
            error: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
        }));
    } finally {
        setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleDeleteUser = async (id) => {
      setState(initState);
      try {
          setState((prev) => ({ ...prev, loading: true }));
          await toast.promise(API.delete(`/student?userId=${id}`), {
              loading: `Hold on, we are deleting this user from our system.`,
              success: `User deleted successfully`,
              error: (error) => {
                  if (error.response) {
                      return `Error: ${error.response?.data?.message || error.message || 'Unknown error occured'}`;
                  } else {
                      return 'Something went wrong while deleting project, please try again';
                  }
              }
          });
          deleteStudent(id);
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
      }));
      } finally {
          setState((prev) => ({ ...prev, loading: false }));
      }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = event => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - students?.length)
      : 0;

  const filteredUsers = applySortFilter(
    students,
    getComparator(order, orderBy),
    filterName,
  );

  const isNotFound = !filteredUsers.length && !!filterName;

    const handleOpenSidebar = () => {
    setOpenSidebar(true);
    };

    const handleCloseSidebar = () => {
        if (state.loading) return;
        setOpenSidebar(false);
        setState(initState);
    };


  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <Typography variant="h3" gutterBottom>
            Manage Students Access
          </Typography>
          <Sidebar
                title='Add New Student'
                openSidebar={openSidebar}
                onOpenSidebar={() => {
                    handleOpenSidebar();
                }}
                onCloseSidebar={() => {
                    handleCloseSidebar()
                }}
                handleSubmit ={handleAddStudent}
                state={state}
            >
                <TextField
                    label="First Name"
                    color="secondary"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Last Name"
                    color="secondary"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Registration Number"
                    type='number'
                    color="secondary"
                    name="regNumber"
                    value={formData.regNumber}
                    onChange={handleChange}
                    fullWidth
                />
                <FormGroup>
                    <FormControlLabel control={<Checkbox color='secondary' checked={isChecked} onChange={handleCheckboxChange}/>} label="Notify Student" />
                </FormGroup>
                {isChecked && (
                    <TextField
                    label="Student Email"
                    color="secondary"
                    name="studentEmail"
                    fullWidth
                    value={formData.studentEmail}
                    onChange={handleChange}
                    />
                )}
            </Sidebar>
        </Stack>

        <Card
        style={{
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
        >
          <DataWidget
            title={'Students'}
            isLoading={isLoading && !students?.length && !isError}
            isError={
              !isLoading && isError && !students?.length ? isError : null
            }
            isEmpty={!isError && !isLoading && !students?.length}
          >
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800, overflowX: 'hidden' }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={students?.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map(row => {
                        const selectedUser =
                          selected.indexOf(row.name) !== -1;

                        return (
                          <StudentListTile
                            user={row}
                            selectedUser={selectedUser}
                            key={row._id}
                            onCheckBoxClicked={event =>
                              handleClick(event, row.name)
                            }
                            deleteUser={handleDeleteUser}
                          />
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell
                          align="center"
                          colSpan={6}
                          sx={{ py: 3 }}
                        >
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>
                                &quot;{filterName}&quot;
                              </strong>
                              .
                              <br /> Try checking for typos or using
                              complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={students?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </DataWidget>
        </Card>
      </Container>
    </>
  );
};

const mapStateToProps = state => ({
students: state.student.students,
});

const mapDispatchToProps = dispatch => {
  return {
    getStudents: (data) => dispatch(getStudents(data)), 
    deleteStudent: id => dispatch(deleteStudent(id)),
    addStudent: data => dispatch(addStudent(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentsPage);