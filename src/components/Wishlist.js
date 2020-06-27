import React from "react";
import NavBarcomp from "./NavBarcomp";
import Footercomp from "./Footercomp";
import { fetchData } from "./adminPanel/helpers";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Paper, Button, Divider } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = React.useState({ items: [], loading: false });

  const classes = useStyles();

  React.useEffect(() => {
    //setting loading to true
    setWishlist({ ...wishlist, loading: true });
    fetchData("users/wishlist").then((res) =>
      setWishlist({ ...wishlist, items: res.wishlist })
    );
    //setting loading to false
    setWishlist({ ...wishlist, loading: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlist.loading]);


  const removeItem = async (itemToDelete) => {
    let newWishlist = wishlist.items.filter((item) => {
      return item._id !== itemToDelete._id;
    });
    fetch("http://localhost:5000/users/wishlist", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newWishlist),
    }).then((res) => {
      res.status === 200
        ? res
            .json()
            .then((response) =>
              setWishlist({ ...wishlist, items: response.wishlist })
            )
        : alert("Couldn't remove the product from wishlist");
    });
  };

  return (
    <div className="container flex m-0 col-12 p-0">
      <NavBarcomp />
      <div className="main justify-content-center">
        <div className="col-sm-6 text-center mx-auto p-3">
          <Paper className="p-3">
            <Typography variant="h4" gutterBottom>
              Wishlist
            </Typography>
            <List disablePadding>
              {wishlist.items.length === 0 ? <h5>Wishlist is empty</h5> : (<>
              {wishlist.items?.map((item) => (<>
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
                    primary={item.name}
                    secondary={item.description}
                  />
                  <Typography variant="body2">$ {item.price}</Typography>
                </ListItem>
                <ListItem>
                  <NavLink to={`/product/${item._id}`} ><Typography variant="body2">More Details</Typography></NavLink>
                  </ListItem>
                  <Divider />
              </>))}
              </>)}
            </List>
          </Paper>
        </div>
      </div>
      <Footercomp />
    </div>
  );
};

export default Wishlist;

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
