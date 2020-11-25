import React, { useState, useEffect, useCallback } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Spinner from '../../components/Spinner/Spinner';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '../../components/Dialog/Dialog';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#598afd',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(username, mobile, email, address, id) {
  return { username, mobile, email, address, id };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  const [dg, setDg] = useState({});

  const getData = useCallback(async () => {
    const res = await axios.get('http://localhost:3000/api/v1/user/');
    console.log(res.data);
    setRows(
      res.data.users.map((el) =>
        createData(el.username, el.mobile, el.email, el.address, el._id)
      )
    );
    setLoading(false);
  }, []);

  const deleteHandler = useCallback(async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/v1/user/${id}`);
      setDg({
        open: true,
        title: 'Success!!',
        content: `userID ${id} deleted successfully`,
      });
      setRows((pre) => {
        return pre.filter((el) => el.id !== id);
      });
    } catch (er) {
      setDg({
        open: true,
        title: 'Error!!',
        content: er.response.data.message,
      });
      console.log(er);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  if (loading) return <Spinner />;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Username</StyledTableCell>
            <StyledTableCell align="left">Mobile</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="left">{row.username}</StyledTableCell>
              <StyledTableCell align="left">{row.mobile}</StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell>{row.address}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => deleteHandler(row.id)}
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>{' '}
      <Dialog
        open={dg.open}
        title={dg.title}
        content={dg.content}
        handleClose={() => setDg({})}
      />
    </TableContainer>
  );
}
