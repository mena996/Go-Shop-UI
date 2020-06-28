import React from "react";
import MaterialTable from "material-table";
import { Icons, fetchData, globalHandleSubmit } from "./helpers";
import { DataContext } from "./Admin";
import { Button } from "@material-ui/core";

const AdminUsers = () => {
  //admins array
  const [admins, setAdmins] = React.useState([]);
  // user, loading data
  const { data, setData } = React.useContext(DataContext);

  React.useEffect(() => {
    //setting loading to true
    setData({ ...data, loading: true })
    // fetching admins
    fetchData('users').then(res => setAdmins(res.filter((u)=> u.isadmin && data.user._id !== u._id)));
    //setting loading to false
    setData({ ...data, loading: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.loading, data.toggleUpdate]);

   const generatePromotionButton = (user) => {
    return (
      <Button
        variant="contained"
        style={{ textTransform: "none" }}
        onClick={() => {
          submitUserRole(user, false);
        }}
      >
        Demote to user
      </Button>
    );
  };

  const submitUserRole = (user, isadmin) => {
    globalHandleSubmit(user, "users", { isadmin }, data, setData);
  };

  return (
    <MaterialTable
      icons={Icons}
      title="Admins"
      columns={[
        {
          title: "ID",
          render: (rowData) => rowData?.tableData.id + 1,
          editable: "never",
        },
        { title: "First Name", field: "firstName" },
        { title: "Last Name", field: "lastName" },
        { title: "Username", field: "username" },
        { title: "Email", field: "email" },
        { title: "Phone", field: "phone" },
        { title: "Address", field: "address" },
        { title: "Action", 
            render: (rowData) => generatePromotionButton(rowData)
        },
      ]}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                null,
                "users",
                {...newData, isadmin: true, verified: true},
                data,
                setData
              ).then(res => {
                if (res) {
                  setData({ ...data, toggleUpdate: !data.toggleUpdate }); 
                  resolve();
                } else reject();
              })
            }, 100);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                oldData,
                "users",
                {...newData, isadmin: true, verified: true},
                data,
                setData
              ).then(res => (res) ? resolve() : reject(alert("error: All fields are required")))
            }, 100);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                oldData,
                "users",
                null,
                data,
                setData,
                true
              ).then(res => (res) ? resolve() : reject(alert("error: All fields are required")))
            }, 100);
          }),
      }}
      data={admins}
      options={{
        paging: false
      }}
    />
  );
};

export default AdminUsers;