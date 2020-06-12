import React from "react";
import MaterialTable from "material-table";
import { Icons, fetchData, globalHandleSubmit } from "./helpers";
import { DataContext } from "./Admin";

const Categories = () => {
//categories array
  const [categories, setCategories] = React.useState([]);
// user, loading data
  const { data, setData } = React.useContext(DataContext);

  React.useEffect(() => {
  //setting loading to true
    setData({...data, loading: true})
  // fetching categories
    fetchData('categories').then(res => setCategories(res));
  //setting loading to false
    setData({...data, loading: false})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.loading,data.toggleUpdate]);
  return (
    <MaterialTable
      icons={Icons}
      title="Categories"
      columns={[
        {
          title: "ID",
          render: (rowData) => rowData?.tableData.id + 1,
          editable: "never",
        },
        { title: "Category Name", field: "name" },
      ]}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                null,
                "categories",
                { name: newData.name },
                data,
                setData
                ).then(res => {if (res) { setData({...data, toggleUpdate: !data.toggleUpdate});resolve()} else reject()})
            }, 100);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                oldData,
                "categories",
                { name: newData.name },
                data,
                setData
                ).then(res => (res) ? resolve() : reject(alert("error: Name is required")))
            }, 100);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                oldData,
                "categories",
                null,
                data,
                setData,
                true
                ).then(res => (res) ? resolve() : reject(alert("error: Name is required")))
            }, 100);
          }),
      }}
      data={categories}
    />
  );
};

export default Categories;