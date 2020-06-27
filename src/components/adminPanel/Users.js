import React from "react";
import MaterialTable from "material-table";
import { Icons, fetchData, globalHandleSubmit } from "./helpers";
import { DataContext } from "./Admin";

const Users = () => {
  //users array
  const [users, setUsers] = React.useState([]);
  // user, loading data
  const { data, setData } = React.useContext(DataContext);

  React.useEffect(() => {
    //setting loading to true
    setData({ ...data, loading: true })
    // fetching users
    fetchData('users').then(res => setUsers(res.filter((u)=> !u.isadmin)));
    //setting loading to false
    setData({ ...data, loading: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.loading, data.toggleUpdate]);

  return (
    <MaterialTable
      icons={Icons}
      title="Users"
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
      ]}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                null,
                "users",
                newData,
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
                newData,
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
      data={users}
      options={{
        paging: false
      }}
    />
  );
};

export default Users;