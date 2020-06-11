import React, { useState, useEffect } from "react";
import Axios from "axios";

const Favoritecomp = ({ productid, userid }) => {
  const [loved, setloved] = useState([]);


  useEffect(() => {
    if (productid && userid) {
      Axios.get(`http://localhost:5000/products/favorite/${userid}/${productid}`)
        .then((res) => {
          // console.log(res.data[0].rate);
          try {
            if (res.data[0])
              setloved(true);
            else
              setloved(false);
          } catch (error) {
            setloved(false);
          }

        })
    }
  }, []);


  const changerate = (e) => {
    const { target: { className } } = e
    setloved(!loved);
    console.log(className);
    Axios.post('http://localhost:5000/products/favorite', { "user": userid, "product": productid }).then((messages) => { console.log(messages); });
  }
  if (productid && userid) {
    return (
      <div className="container col-12">
        <span id="love" className={loved != true ? "fa fa-heart" : "fa fa-heart favorite"} onClick={changerate}></span>
      </div>
    )
  }
  return (<></>)
};

export default Favoritecomp;
