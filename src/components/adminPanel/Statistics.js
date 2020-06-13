import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ShopIcon from "@material-ui/icons/Shop";
import StatisticsCard from "./StatisticsCard";
import CategoryIcon from "@material-ui/icons/Category";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { fetchData } from "./helpers";
import { DataContext } from "./Admin";

export default function Statistics() {
  // user, loading data
  const { data } = React.useContext(DataContext);
  //stats object
  const [stats, setStats] = React.useState({});
  React.useEffect(() => {
    // fetching stats
    fetchData("statistics", data?.user).then((res) => setStats(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.user]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <StatisticsCard
            title="TOTAL USERS"
            number={stats?.allUsersCount}
            iconColor="darkblue"
            icon={<PeopleIcon className={classes.icon} />}
            extended={{
              first: `${stats?.adminsCount} Admins`,
              second: `${stats?.usersCount} users`,
            }}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <StatisticsCard
            title="PRODUCTS"
            number={stats?.productsCount}
            iconColor="black"
            icon={<ShoppingBasketIcon className={classes.icon} />}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <StatisticsCard
            title="ORDERS"
            number={stats?.allOrdersCount}
            iconColor="gray"
            icon={<ReceiptIcon className={classes.icon} />}
            extended={{
              first: `${stats?.deliverdOrdersCount} Delivered`,
              second: `${stats?.pendingOrdersCount} Pending`,
            }}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <StatisticsCard
            title="BRANDS"
            number={stats?.brandsCount}
            iconColor="orange"
            icon={<ShopIcon className={classes.icon} />}
          />
        </Grid>
        <Grid item lg={3} md={6} xl={3} xs={12}>
          <StatisticsCard
            title="CATEGORIES"
            number={stats?.categoriesCount}
            iconColor="purple"
            icon={<CategoryIcon className={classes.icon} />}
          />
        </Grid>
        <Grid item lg={8} md={6} xl={3} xs={12}>
          <StatisticsCard
            title="TOTAL SALES"
            number={`$ ${stats?.totalSales}`}
            iconColor="green"
            icon={<AttachMoneyIcon className={classes.icon} />}
          />
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  iconStyle: {
    height: 56,
    width: 56,
  },
}));
