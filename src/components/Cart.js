import React from "react";
import NavBarcomp from "./NavBarcomp";
import Footercomp from "./Footercomp";
import { fetchData } from "./adminPanel/helpers";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Paper, Button, Select, MenuItem } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const [cartData, setCartData] = React.useState({ items: [], loading: false });
  const [totalAmount, setTotalAmount] = React.useState(0);

  const classes = useStyles();

  React.useEffect(() => {
    //setting loading to true
    setCartData({ ...cartData, loading: true });
    fetchData("users/cart").then((res) =>
      setCartData({ ...cartData, items: res.cart })
    );
    //setting loading to false
    setCartData({ ...cartData, loading: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData.loading]);

  React.useEffect(() => {
    setTotalAmount(calcTotalAmount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData.items]);

  const calcTotalAmount = () => {
    return cartData.items?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  const formatCartArrayToSend = (array) => {
    return array.map((item) => {
      return {
        price: item.price,
        product: item.product._id,
        quantity: item.quantity,
      };
    });
  };
  const changeQuantity = async (e) => {
    if (e.target.value) {
      let newItems = [...cartData.items];
      newItems.forEach((item) => {
        if (item._id === e.target.name) item.quantity = e.target.value;
      });
      setCartData({ ...cartData, items: newItems });
      await fetch("http://localhost:5000/users/cart", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formatCartArrayToSend(newItems)),
      });
    }
  };

  const removeItem = async (itemToDelete) => {
    const cart = cartData.items.map((item) => {
      return {
        _id: item._id,
        product: item.product._id,
        price: item.price,
        quantity: item.quantity,
      };
    });
    let newCart;
    newCart = cart.filter((item) => {
      return item._id !== itemToDelete._id;
    });
    fetch("http://localhost:5000/users/cart", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newCart),
    }).then((res) => {
      res.status === 200
        ? res
            .json()
            .then((response) =>
              setCartData({ ...cartData, items: response.cart })
            )
        : alert("Couldn't remove product from cart");
    });
  };

  return (
    <div className="container flex m-0 col-12 p-0">
      <NavBarcomp />
      <div className="main justify-content-center">
        <div className="col-sm-6 text-center mx-auto p-3">
          <Paper className="p-3">
            <Typography variant="h4" gutterBottom>
              Cart
            </Typography>
            <List disablePadding>
              {cartData.items.length === 0 ? <h5>Cart is empty</h5> : (<>
              {cartData.items?.map((item) => (
                <ListItem className={classes.listItem} key={item._id}>
                  <Button
                    className="btn btn-danger mr-3"
                    size="small"
                    style={{ backgroundColor: "gray" }}
                    onClick={() => removeItem(item)}
                  >
                    x
                  </Button>
                  <ListItemText
                    primary={item.product.name}
                    secondary={item.product.description}
                  />
                  <Select
                    className="mr-2"
                    value={item.quantity}
                    style={{ width: "70px" }}
                    onChange={changeQuantity}
                    name={item._id}
                  >
                    {Array.from(Array(10), (_, i) => i + 1).map((q) => (
                      <MenuItem value={q} key={q}>
                        {q}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="body2">$ {item.price}</Typography>
                </ListItem>
              ))}
              <ListItem className={classes.listItem}>
                <ListItemText primary="Tax 14%" />
                <Typography
                  variant="subtitle1"
                  component={"h4"}
                  className={classes.total}
                >
                  $ {(totalAmount * 0.14).toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Total" />
                <Typography
                  variant="subtitle1"
                  component={"h3"}
                  className={classes.total}
                >
                  $ {(totalAmount * 1.14).toFixed(2)}
                </Typography>
              </ListItem>
              </>)}
            </List>
            {cartData.items.length !== 0 && <NavLink to="/checkout">Proceed to checkout</NavLink>}
          </Paper>
        </div>
      </div>
      <Footercomp />
    </div>
  );
};

export default Cart;

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));
