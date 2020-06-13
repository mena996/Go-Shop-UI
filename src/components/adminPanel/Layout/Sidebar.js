import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { DataContext } from "../Admin";
import { makeStyles } from "@material-ui/styles";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  Button,
  colors,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import CategoryIcon from "@material-ui/icons/Category";
import SettingsIcon from "@material-ui/icons/Settings";
import ShopIcon from "@material-ui/icons/Shop";
import InputIcon from "@material-ui/icons/Input";
import ReceiptIcon from '@material-ui/icons/Receipt';
import { UserContext } from "../../../App";

const Sidebar = (props) => {
  const { open, variant, onClose, className, ...rest } = props;
  const { data, setData } = React.useContext(DataContext);
  const { setUser } = React.useContext(UserContext);

  const classes = useStyles();
  const navClases = navLinksStyles();
  // logout function
  const logout = () => {
    setUser();
   }
  const pages = [
    {
      title: "Dashboard",
      component: "dashboard",
      icon: <DashboardIcon />,
    },
    {
      title: "Users",
      component: "users",
      icon: <PeopleIcon />,
    },
    {
      title: "Brands",
      component: "brands",
      icon: <ShopIcon />,
    },
    {
      title: "Categories",
      component: "categories",
      icon: <CategoryIcon />,
    },
    {
      title: "Products",
      component: "products",
      icon: <ShoppingBasketIcon />,
    },
    {
      title: "Orders",
      component: "orders",
      icon: <ReceiptIcon />,
    },
    {
      title: "Settings",
      component: "settings",
      icon: <SettingsIcon />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <div className="text-center">
          <img
            src={data?.user?.user?.image}
            alt={data?.user?.user?.username}
            style={{ height: 100, width: 100, borderRadius: "50%", margin: 20 }}
          />
          <h4>{data?.user?.user?.firstName} {data?.user?.user?.lastName}</h4>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.nav}>
          <List {...rest} className={clsx(navClases.root, className)}>
            {pages.map((page) => (
              <ListItem
                className={navClases.item}
                disableGutters
                key={page.title}
              >
                <Button
                  className={navClases.button}
                  onClick={() => {
                    setData({ ...data, currentPage: page.component });
                    onClose();
                  }}
                >
                  <div className={navClases.icon}>{page.icon}</div>
                  {page.title}
                </Button>
              </ListItem>
            ))}
          </List>
          <Divider className={classes.divider} />
          <Button className={navClases.button} style={{color: colors.blueGrey[800]}} onClick={() => logout()}>
            <div className={navClases.icon}>
              <InputIcon />
            </div>{" "}
            Log out
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)",
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

const navLinksStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
}));

export default Sidebar;