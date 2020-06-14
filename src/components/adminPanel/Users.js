import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { fetchData, globalHandleSubmit } from './helpers';
import { DataContext } from './Admin';
import { Button } from '@material-ui/core';

export default function Users() {
    // user, loading data
  const { data, setData } = React.useContext(DataContext);
//users array
const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
  // fetching users
    fetchData('users',data?.user).then(res => setUsers(res));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.toggleUpdate]);

  const classes = useStyles();

  const generatePromotionButton = (user) => {
    return (
      <Button
        variant="contained"
        style={{ textTransform: "none" }}
        onClick={() => {
          submitUserRole(user, !user.isadmin);
        }}
      >
        {user.isadmin ? "Demote to user" : "Promote to admin"}
      </Button>
    );
  };

  const submitUserRole = (user, isadmin) => {
    globalHandleSubmit(user, "users", { isadmin }, data, setData);
  };
  return (
      <Paper>
      <h4 style={{ margin: 20 }}>Users</h4>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Full Name</strong></TableCell>
            <TableCell align="left"><strong>Username</strong></TableCell>
            <TableCell align="left"><strong>Email</strong></TableCell>
            <TableCell align="left"><strong>Phone</strong></TableCell>
            <TableCell align="left"><strong>Address</strong></TableCell>
            <TableCell align="left"><strong>Role</strong></TableCell>
            <TableCell align="left"><strong>Action</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user._id}>
              <TableCell component="th" scope="row">
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell align="left">{user.username}</TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left">{user.phone}</TableCell>
              <TableCell align="left">{user.address}</TableCell>
              <TableCell align="left">{user.isadmin ? '🟢 Admin' : '🔵 User'}</TableCell>
              <TableCell align="left">{generatePromotionButton(user)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
}
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });