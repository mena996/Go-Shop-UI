import React from "react";
import MaterialTable from "material-table";
import { Icons, fetchData, globalHandleSubmit } from "./helpers";
import { DataContext } from "./Admin";
import { Button, FormControl, Select, MenuItem } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const Advertisements = () => {
  //ads array
  const [ads, setAds] = React.useState([]);
  // user, loading data
  const { data, setData } = React.useContext(DataContext);
  // chosen image
  const image = React.useRef();

  const [options, setOptions] = React.useState([]);

  let product = '';

  const getProductOptions = async () => {
    if (options.length === 0) {
      const res = await fetch("http://localhost:5000/products");
      const advs = await res.json();
      setOptions(advs);
    }
  };

  React.useEffect(() => {
    //setting loading to true
    setData({ ...data, loading: true });
    // fetching ads
    fetchData("ads").then((res) => setAds(res));
    //setting loading to false
    setData({ ...data, loading: false });
    getProductOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.loading, data.toggleUpdate]);

  return (
    <MaterialTable
      icons={Icons}
      title="Advertisements"
      columns={[
        {
          title: "ID",
          render: (rowData) => rowData?.tableData.id + 1,
          editable: "never",
        },
        {
          title: "Adv. Picture",
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
              alt="Ads Img"
            />
          ),
        },
        { title: "Ad. Image Alt.", field: "alt" },
        {
          title: "Product",
          field: "product.name",
          editComponent: (tableData) => (
            <FormControl required>
              <Select
                autoWidth
                displayEmpty
                name="product"
                onChange={(e) => product = e.target.value}
                inputProps={{ "aria-label": "Without label" }}
                defaultValue={product || tableData?.rowData?.product?._id || ""}
              >
                <MenuItem value="" disabled>
                  <em>Choose product</em>
                </MenuItem>
                {options.map((prod) => {
                  return (
                    <MenuItem value={prod._id} key={prod._id}>
                      {prod.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          ),
        },
      ]}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                null,
                "ads",
                {
                  image: image.current?.files[0],
                  alt: newData.alt,
                  product: product,
                },
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
                "ads",
                {
                  image: image.current?.files[0],
                  alt: newData.alt,
                  product: product,
                },
                data,
                setData
              ).then((res) =>
                res
                  ? resolve()
                  : reject(alert("error: All fields are required"))
              );
            }, 100);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                oldData,
                "ads",
                null,
                data,
                setData,
                true
              ).then((res) =>
                res
                  ? resolve()
                  : reject(alert("error: All fields are required"))
              );
            }, 100);
          }),
      }}
      data={ads}
      options={{
        paging: false,
      }}
    />
  );
};

export default Advertisements;
