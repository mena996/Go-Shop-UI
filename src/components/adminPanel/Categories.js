import React from "react";
import MaterialTable from "material-table";
import { Icons, fetchData, globalHandleSubmit } from "./helpers";
import { DataContext } from "./Admin";
import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const Categories = () => {
  //categories array
  const [categories, setCategories] = React.useState([]);
  // user, loading data
  const { data, setData } = React.useContext(DataContext);
  // chosen image
  const image = React.useRef();

  React.useEffect(() => {
    //setting loading to true
    setData({ ...data, loading: true })
    // fetching categories
    fetchData('categories').then(res => setCategories(res));
    //setting loading to false
    setData({ ...data, loading: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.loading, data.toggleUpdate]);
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
        {
          title: "Category Picture",
          field: "image",
          editComponent: () => (
            <div value="photo">
              <input
                accept=".png, .jpg, .jpeg"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                required
                ref={image}
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload
                </Button>
              </label>
            </div>
          ),
          render: (rowData) => (
            <img
              style={{ height: 200, width: 150 }}
              src={rowData.image}
              alt="Category Img"
            />
          ),
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
                { image: image.current?.files[0], name: newData.name},
                data,
                setData
              ).then(res => (res) ? resolve() : reject(alert("error: All fields are required")))
            }, 100);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                oldData,
                "categories",
                { image: image.current?.files[0], name: newData.name },
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
                "categories",
                null,
                data,
                setData,
                true
              ).then(res => (res) ? resolve() : reject(alert("error: All fields are required")))
            }, 100);
          }),
      }}
      data={categories}
      options={{
        paging: false
      }}
    />
  );
};

export default Categories;