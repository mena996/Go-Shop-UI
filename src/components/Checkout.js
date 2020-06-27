import React from "react";
import NavBarcomp from "./NavBarcomp";
import Footercomp from "./Footercomp";
import { PayPalButton } from "react-paypal-button-v2";
import { fetchData } from "./adminPanel/helpers";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { UserContext } from "../App";
import { Paper, Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom';

const Checkout = () => {
  const [cartData, setCartData] = React.useState({ items: [], loading: false });
  const [totalAmount, setTotalAmount] = React.useState(0);
  const { user } = React.useContext(UserContext);
  const history = useHistory();

  const classes = useStyles();

  React.useEffect(() => {
    //setting loading to true
    setCartData({ ...cartData, loading: true });
    fetchData("users/cart").then((res) => {
      setCartData({ ...cartData, items: res.cart });
    });
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

  const cashOnDelivery = async () => {
    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        date: Date.now(),
        customer: user._id,
        paid: false,
        products: cartData.items.map((item) => {
          return {
            product: item.product._id,
            price: item.price,
            quantity: item.quantity,
            status: 0,
          };
        }),
      }),
    })
      .then(() => emptyCart())
      .then(() => {
        setCartData({ ...cartData, items: [] });
        alert("Order was submitted successfully. we will deliver it ASAP!");
        history.push('/')
      });
  };

  const emptyCart = async () => {
    await fetch("http://localhost:5000/users/cart", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify([]),
    });
  };

  return (
    <div className="container flex m-0 col-12 p-0">
      <NavBarcomp />
      <div className="main justify-content-center">
        <div className="col-sm-6 text-center mx-auto p-3">
          <Paper className="p-3">
            <Typography variant="h4" gutterBottom>
              Checkout
            </Typography>
            <List disablePadding>
              {cartData.items?.map((item) => (
                <ListItem className={classes.listItem} key={item._id}>
                  <ListItemText
                    primary={item.product.name}
                    secondary={item.product.description}
                  />
                  <Typography variant="body2" className="mr-2">
                    {item.quantity} x{" "}
                  </Typography>
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
            </List>
              <h3 className="my-4">Shipping Info:</h3>
              <Typography className="text-left">
                Name: {user.firstName} {user.lastName}
              </Typography>
              <Typography className="text-left">
                Address: {user.address}
              </Typography>
            <h3 className="my-4">Choose payment method:</h3>
            <Grid item container direction="column" xs={12} sm={6}>
              <PayPalButton
                options={{
                  clientId:
                    "AeyTfMtFsS6QiwdD7ojlsggsl2N7c7sGplvHS0HXfbpYzpEYahh2mKnf17OcEaB9Vnycb2uFJuiY9VHr",
                }}
                debug
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: (totalAmount * 1.14).toFixed(2),
                          breakdown: {
                            item_total: {
                              currency_code: "USD",
                              value: totalAmount,
                            },
                            tax_total: {
                              currency_code: "USD",
                              value: (totalAmount * 0.14).toFixed(2),
                            },
                          },
                        },
                        items: cartData.items?.map((item) => {
                          return {
                            name: item.product.name,
                            unit_amount: {
                              currency_code: "USD",
                              value: item.price,
                            },
                            quantity: item.quantity,
                            description: item.product.description,
                            tax: {
                              currency_code: "USD",
                              value: (item.price * 0.14).toFixed(2),
                            },
                          };
                        }),
                        shipping: {
                          name: {
                            full_name: user.firstName + " " + user.lastName,
                          },
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(async (details) => {
                    alert(
                      "Order was submitted successfully. we will deliver it ASAP!"
                    );

                    return fetch("http://localhost:5000/orders", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      credentials: "include",
                      body: JSON.stringify({
                        date: Date.now(),
                        customer: user._id,
                        paid: true,
                        products: cartData.items.map((item) => {
                          return {
                            product: item.product._id,
                            price: item.price,
                            quantity: item.quantity,
                            status: 0,
                          };
                        }),
                      }),
                    })
                      .then(() => emptyCart())
                      .then(() => {
                        setCartData({ ...cartData, items: [] });
                        history.push('/');
                      });
                  });
                }}
              />
            </Grid>
            <div className="d-flex mt-3">
              <Button
                onClick={cashOnDelivery}
                variant={"outlined"}
                style={{ backgroundColor: "grey" }}
              >
                Cash on delivery
              </Button>
            </div>
          </Paper>
        </div>
      </div>
      <Footercomp />
    </div>
  );
};

export default Checkout;

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
