import React, { useState, useEffect } from "react";
import Axios from "axios";

const Ratecomp = ({ bookid, userid }) => {
  const [rate, setrate] = useState([]);


  useEffect(() => {
    if (bookid && userid) {
    Axios.get(`http://localhost:5000/products/rate/${userid}/${bookid}`)
      .then((res) => {
        // console.log(res.data[0].rate);
        try {
          setrate(res.data[0].rate);
        } catch (error) {
          setrate(0);
        }

      })
    }
  }, []);


  const changerate = (e) => {
    const { target: { id } } = e
    setrate(id);
    Axios.post('http://localhost:5000/products/rate', { "rate": id, "user": userid, "book": bookid }).then((messages) => { console.log(messages); });
  }
  if (bookid && userid) {
  return (
    <div className="container col-12">
      <span id="1" className={rate >= 1 ? "fa fa-star checked" : "fa fa-star"} onClick={changerate}></span>
      <span id="2" className={rate >= 2 ? "fa fa-star checked" : "fa fa-star"} onClick={changerate}></span>
      <span id="3" className={rate >= 3 ? "fa fa-star checked" : "fa fa-star"} onClick={changerate}></span>
      <span id="4" className={rate >= 4 ? "fa fa-star checked" : "fa fa-star"} onClick={changerate}></span>
      <span id="5" className={rate >= 5 ? "fa fa-star checked" : "fa fa-star"} onClick={changerate}></span>
    </div>
  )
  }
};

export default Ratecomp;
