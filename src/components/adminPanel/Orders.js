import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { fetchData, globalHandleSubmit } from "./helpers";
import { DataContext } from "./Admin";
import { Button } from "@material-ui/core";

export default function Orders() {
  //orders array
  const [orders, setOrders] = React.useState([]);
  const { data } = React.useContext(DataContext);

  React.useEffect(() => {
    // fetching orders
    fetchData("orders").then((res) => setOrders(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.toggleUpdate]);

  return (
    <Paper>
      <h4 style={{ margin: 20 }}>Orders</h4>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell><strong>Date</strong></TableCell>
              <TableCell align="left"><strong>Customer</strong></TableCell>
              <TableCell align="left"><strong>Status</strong></TableCell>
              <TableCell align="left"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <Row key={row._id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  // user, loading data
  const { data, setData } = React.useContext(DataContext);

  const generateStatus = (code) => {
    return code === 0 ? "🟡 Pending" : "🟢 Delivered";
  };

  const generateDeliveryButton = (order) => {
    return (
      <Button
        variant="contained"
        style={{ textTransform: "none" }}
        onClick={() => {
          submitDeliveryStatus(order, order.status ? 0 : 1);
        }}
      >
        {order.status ? "Mark as Pending" : "Mark as delivered"}
      </Button>
    );
  };

  const submitDeliveryStatus = (order, status) => {
    globalHandleSubmit(order, "orders", { status }, data, setData);
  };

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function subtotal(row) {
    return row.products.map(({ price, quantity }) => price * quantity).reduce((sum, i) => sum + i, 0);
  }

  const invoiceSubtotal = subtotal(row);
const invoiceTaxes = 0.14 * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date.substring(0, 10)}
        </TableCell>
        <TableCell align="left">{row.customer.username}</TableCell>
        <TableCell align="left">{generateStatus(row.status)}</TableCell>
        <TableCell align="left">{generateDeliveryButton(row)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Product</strong></TableCell>
                    <TableCell><strong>Price</strong></TableCell>
                    <TableCell align="left"><strong>Amount</strong></TableCell>
                    <TableCell align="left"><strong>Total price ($)</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell component="th" scope="row">
                        {product.product.name}
                      </TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell align="left">{product.quantity}</TableCell>
                      <TableCell align="left">
                        {Math.round(product.quantity * product.price * 100) /
                          100}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}><strong>Subtotal</strong></TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Tax</strong></TableCell>
            <TableCell align="right">{`${(0.14 * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}><strong>Total</strong></TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Customer Details
              </Typography>
              <Table size="small" aria-label="customer">
                <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <strong>Full Name:</strong>
                      </TableCell>
                      <TableCell>{row.customer.firstName} {row.customer.lastName}</TableCell>
                      <TableCell component="th" scope="row">
                      <strong>Email:</strong>
                      </TableCell>
                      <TableCell>{row.customer.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                      <strong>Address:</strong>
                      </TableCell>
                      <TableCell>{row.customer.address}</TableCell>
                      <TableCell component="th" scope="row">
                      <strong>Phone:</strong>
                      </TableCell>
                      <TableCell>{row.customer.phone}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});
