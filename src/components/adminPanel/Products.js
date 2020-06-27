import React from "react";
import MaterialTable from "material-table";
import { Icons, fetchData, globalHandleSubmit } from "./helpers";
import { DataContext } from "./Admin";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  Switch,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const Products = () => {
  //products array
  const [products, setProducts] = React.useState([]);
  // user, loading data
  const { data, setData } = React.useContext(DataContext);
  //product to be edited
  let product = {};
  // product image ref
  const image = React.useRef("");
  // category and brand options in select menus
  const [options, setOptions] = React.useState({
    categories: [],
    brands: [],
  });
  const getBookOptions = async () => {
    await Promise.all([
      fetch("http://localhost:5000/categories").then((categories) =>
        categories.json()
      ),
      fetch("http://localhost:5000/brands").then((brands) => brands.json()),
    ]).then(([categories, brands]) => setOptions({ categories, brands }));
  };

  React.useEffect(() => {
    //setting loading to true
    setData({ ...data, loading: true });
    // fetching products
    fetchData("products").then((res) => setProducts(res));
    //setting loading to false
    setData({ ...data, loading: false });
    // fetching category and brand options in select menus
    getBookOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.loading, data.toggleUpdate]);

  const handleInputChange = (e) => {
    const {
      target: { name, value },
    } = e;
    product[name] = value;
  };

  return (
    <MaterialTable
      icons={Icons}
      title="Products"
      columns={[
        {
          title: "ID",
          render: (rowData) => rowData?.tableData.id + 1,
          editable: "never",
        },
        {
          title: "Product Image",
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
              alt="Brand Img"
            />
          ),
        },
        { title: "Product Name", field: "name" },
        { title: "Description", field: "description" },
        { title: "Price", field: "price" },
        {
          title: "Category",
          field: "category.name",
          editComponent: (tableData) => (
            <FormControl required>
              <Select
                autoWidth
                displayEmpty
                name="category"
                onChange={handleInputChange}
                inputProps={{ "aria-label": "Without label" }}
                defaultValue={
                  product?.category || tableData?.rowData?.category?._id || ""
                }
              >
                <MenuItem value="" disabled>
                  <em>Choose category</em>
                </MenuItem>
                {options.categories.map((cat) => {
                  return <MenuItem value={cat._id}>{cat.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          ),
        },
        {
          title: "Brand",
          field: "brand.name",
          editComponent: (tableData) => (
            <FormControl required>
              <Select
                autoWidth
                displayEmpty
                name="brand"
                onChange={handleInputChange}
                inputProps={{ "aria-label": "Without label" }}
                defaultValue={
                  product?.brand || tableData?.rowData?.brand?._id || ""
                }
              >
                <MenuItem value="" disabled>
                  <em>Choose brand</em>
                </MenuItem>
                {options.brands.map((brand) => {
                  return <MenuItem value={brand._id}>{brand.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          ),
        },
        {
          title: "Available",
          field: "available",
          editComponent: (tableData) => (
            <FormControl required>
              <Switch
                name="available"
                defaultChecked={tableData.rowData.available}
                onChange={() =>
                  (product.available =
                    product.available !== undefined
                      ? !product.available
                      : !tableData.rowData.available)
                }
                color="primary"
              />
            </FormControl>
          ),
          render: (rowData) => (
            <Switch checked={rowData?.available} color="primary" />
          ),
          editable: "onUpdate",
        },
      ]}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                null,
                "products",
                {
                  image: image.current?.files[0],
                  name: newData.name,
                  description: newData.description,
                  price: newData.price,
                  category: product?.category,
                  brand: product?.brand,
                },
                data,
                setData
              ).then((res) =>
                res
                  ? resolve()
                  : reject(
                      alert(
                        "error: All fields are required and price must be a number"
                      )
                    )
              );
            }, 100);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                oldData,
                "products",
                {
                  image: image.current?.files[0],
                  name: newData.name,
                  description: newData.description,
                  price: newData.price,
                  category: product?.category,
                  brand: product?.brand,
                  available: product?.available,
                },
                data,
                setData
              ).then((res) =>
                res
                  ? resolve()
                  : reject(
                      alert(
                        "error: All fields are required and price must be a number"
                      )
                    )
              );
            }, 100);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                oldData,
                "products",
                null,
                data,
                setData,
                true
              ).then((res) => (res ? resolve() : reject()));
            }, 100);
          }),
        onRowAddCancelled: () => product = {},
        onRowUpdateCancelled: () => product = {},
      }}
      data={products}
      options={{
        paging: false,
      }}
    />
  );
};

export default Products;
