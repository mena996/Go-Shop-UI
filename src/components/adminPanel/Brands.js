import React from "react";
import MaterialTable from "material-table";
import { Icons, fetchData, globalHandleSubmit } from "./helpers";
import { DataContext } from "./Admin";
import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const Brands = () => {
  //brands array
  const [brands, setBrands] = React.useState([]);
  // user, loading data
  const { data, setData } = React.useContext(DataContext);
  // chosen image
  const [image, setImage] = React.useState();

  React.useEffect(() => {
    //setting loading to true
    setData({ ...data, loading: true });
    // fetching brands
    fetchData("brands").then((res) => setBrands(res));
    //setting loading to false
    setData({ ...data, loading: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.loading, data.toggleUpdate]);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <MaterialTable
      icons={Icons}
      title="Brands"
      columns={[
        {
          title: "ID",
          render: (rowData) => rowData?.tableData.id + 1,
          editable: "never",
        },
        {
          title: "Brand Picture",
          field: "image",
          editComponent: () => (
            <div value="photo">
              <input
                accept=".png, .jpg, .jpeg"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                required
                onChange={(e) => handleChange(e)}
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
              alt="Brand Img"
            />
          ),
        },
        { title: "Brand Name", field: "name" },
        { title: "Description", field: "description" },
      ]}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                null,
                "brands",
                { image, name: newData.name, description: newData.description },
                data,
                setData
              ).then((res) => {
                if (res) {
                  setData({ ...data, toggleUpdate: !data.toggleUpdate });
                  resolve();
                } else reject();
              });
            }, 100);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                oldData,
                "brands",
                { image, name: newData.name, description: newData.description },
                data,
                setData
              ).then((res) => (res ? resolve() : reject(alert("error: All fields are required"))));
            }, 100);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                oldData,
                "brands",
                null,
                data,
                setData,
                true
              ).then((res) => (res ? resolve() : reject(alert("error: All fields are required"))));
            }, 100);
          }),
      }}
      data={brands}
      options={{
        paging: false
      }}
    />
  );
};

export default Brands;
