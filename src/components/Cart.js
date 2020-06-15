import React from "react";
import NavBarcomp from "./NavBarcomp";
import Footercomp from "./Footercomp";
import { PayPalButton } from "react-paypal-button-v2";
import { fetchData, checkAccessTokenExpiry } from "./adminPanel/helpers";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { UserContext } from "../App";
import { Paper, Button } from "@material-ui/core";

const Cart = () => {
  const [cartData, setCartData] = React.useState({ items: [], loading: false });
  const [totalAmount, setTotalAmount] = React.useState(0);
  const { user } = React.useContext(UserContext);

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

  const changeQuantity = (e) => {
    if (e.target.value) {
      let newItems = [...cartData.items];
      newItems.forEach((item) => {
        if (item._id === e.target.id) item.quantity = e.target.value;
      });
      setCartData({ ...cartData, items: newItems });
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
    if (itemToDelete) {
      newCart = cart.filter((item) => {
        return item._id !== itemToDelete._id;
      });
    }else newCart = []
    await checkAccessTokenExpiry();
    fetch("http://localhost:5000/users/cart", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(newCart),
    }).then((res) => {
      res.status === 200
        ? res
            .json()
            .then((res) => setCartData({ ...cartData, items: res.cart }))
        : alert("Couldn't add product to cart");
    });
  };

  return (
    <div className="container flex m-0 col-12 p-0">
      <NavBarcomp />
      <div className="main justify-content-center">
        <div className="col-sm-6 text-center mx-auto p-3">
          <Paper className="p-3">
            <Typography variant="h4" gutterBottom>
              Order summary
            </Typography>
            <List disablePadding>
              {cartData.items.length === 0 && <h5>Cart is empty</h5>}
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
                  <input
                    type="number"
                    className="mr-2"
                    defaultValue={item.quantity}
                    style={{ width: "70px" }}
                    min="0"
                    id={item._id}
                    onChange={changeQuantity}
                  />
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
                  $ {totalAmount * 0.14}
                </Typography>
              </ListItem>
              <ListItem className={classes.listItem}>
              <ListItemText primary="Total" />
                <Typography
                  variant="subtitle1"
                  component={"h3"}
                  className={classes.total}
                >
                  $ {totalAmount * 1.14}
                </Typography>
              </ListItem>
            </List>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom className={classes.title}>
                  Shipping Info
                </Typography>
                <Typography gutterBottom>
                  Name: {user.firstName} {user.lastName}
                </Typography>
                <Typography gutterBottom>Address: {user.address}</Typography>
              </Grid>
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
                            value: totalAmount * 1.14,
                            breakdown: {
                              item_total: {
                                currency_code: "USD",
                                value: totalAmount,
                              },
                              tax_total: {
                                currency_code: "USD",
                                value: totalAmount * 0.14
                              }
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
                                value: item.price * 0.14
                              }
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

                      await checkAccessTokenExpiry();
                      return fetch("http://localhost:5000/orders", {
                        method: "POST",
                        headers: {
                          'Content-Type': "application/json",
                          Authorization: "Bearer " + localStorage.getItem('accessToken'),
                        },
                        body: JSON.stringify({
                          date: Date.now(),
                          customer: user._id,
                          products: cartData.items.map((item) => {
                            return {
                              product: item.product._id,
                              price: item.price,
                              quantity: item.quantity,
                              status: 0,
                            };
                          }),
                        }),
                      }).then((res) => removeItem(null));
                    });
                  }}
                />
              </Grid>
            </Grid>
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
