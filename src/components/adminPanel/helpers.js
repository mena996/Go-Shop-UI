import { objectToFormData } from 'object-to-formdata';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

// material icons for the table
export const Icons = {
  Check: Check,
  Clear: Clear,
  DetailPanel: ChevronRight,
  Delete: DeleteOutline,
  Export: SaveAlt,
  Filter: FilterList,
  FirstPage: FirstPage,
  LastPage: LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  Search: Search,
  ThirdStateCheck: Remove,
  Add: AddBox,
  SortArrow: ArrowDownward,
  Edit: Edit,
  ViewColumn: ViewColumn
};
export const globalHandleSubmit = async (
  // old item
  item,
  // categories, products or brands
  currentView,
  // new data
  payload,
  // DataContext holding user data
  data,
  // the function to update component
  setData,
  // if it a delete request or not (false by default)
  remove = false
) => {
  let method,
  // general url
    url = `http://localhost:5000/${currentView}/`;
  // request headers that contains auth token
  await checkAccessTokenExpiry();
  let headers = new Headers({
    Authorization: "Bearer " + localStorage.getItem('accessToken'),
  });
  // data to be sent if the current view is products or brands, so we use FormData to send images
  let body = (payload && objectToFormData(payload)) || null;
  // if there is an old item
  if (item) {
    // decide weather the method is DELETE or PATCH depending on the "remove" parameter
    remove ? (method = "DELETE") : (method = "PATCH");
    // attaching item id to the request
    url += item._id;
  } else {
    // if it's a new item use POST method with the general url
    method = "POST";
  }
  // if current view is categories use application/json as a content type and use JSON.stringify with the body
  if (["categories", "orders", "users"].includes(currentView)) {
    headers.append("Content-Type", "application/json");
    body = (payload && JSON.stringify(payload)) || null;
  }
  // to send the request
  const fetchResponse = await fetch(url, {
    method,
    headers,
    body,
  });
  // if request was accepted by the server update the component
  if (fetchResponse.status === 200) {
    setData({...data, toggleUpdate: !data.toggleUpdate})  
    return true;
  }
};

// function to fetch the arrays
export const fetchData = async (currentView) => {
  await checkAccessTokenExpiry();
  const res = await fetch(`http://localhost:5000/${currentView}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem('accessToken'),
    }
  });
  return await res.json();
};

export const checkAccessTokenExpiry = async () => {
  const expTime = localStorage.getItem('expAt');
  const now = Math.ceil(Date.now() / 1000);
  if (expTime > (now + 4)) return ;
  else {
    const refreshToken = localStorage.getItem('refreshToken');
    const getNewToken = await fetch("http://localhost:5000/users/refresh", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    const res = await getNewToken?.json();
    const newAccessToken = res?.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("expAt", res?.expAt);
  }
}
