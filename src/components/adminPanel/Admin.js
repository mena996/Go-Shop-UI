import React from "react";
import Dashboard from "./Dashboard";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { UserContext } from "../../App";
import Login from "../Login";

export const DataContext = React.createContext(null);

const Admin = () => {
  const { user } = React.useContext(UserContext);
  const [data, setData] = React.useState({
    user,
    currentPage: "",
    loading: false,
    toggleUpdate: false,
  });
  React.useEffect(() => {
    setData({ ...data, user });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const providerValue = { data, setData };

  if (user)
    return (
      <DataContext.Provider value={providerValue}>
        <ThemeProvider theme={lightTheme}>
          <Dashboard></Dashboard>
        </ThemeProvider>
      </DataContext.Provider>
    );
  else return <Login isAdmin={true} UserContext={UserContext} />;
};

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
});

export default Admin;
