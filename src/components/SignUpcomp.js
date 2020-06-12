import React, { useState } from "react";
import Axios from "axios";

const SignUpcomp = ({ productid, userid }) => {
  const [erors, setErors] = useState([]);
  const [done, setdone] = useState([]);
  const [newUserFirstName, setnewUserFirstName] = useState([]);
  const [newUserLastName, setnewUserLastName] = useState([]);
  const [newUserUsername, setnewUserUsername] = useState([]);
  const [newUserEmail, setnewUserEmail] = useState([]);
  const [newUserPhone, setnewUserPhone] = useState([]);
  const [newUserAddress, setnewUserAddress] = useState([]);
  const [newUserPassword, setnewUserPassword] = useState([]);
  const [newUserPasswordCheck, setnewUserPasswordCheck] = useState([]);
  // const [newUserImage, setnewUserImage] = useState([]);
  // const handleChange = (e) => {
  //   setnewUserImage(e.target.files[0]);
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    let newUser = {
      "firstName": newUserFirstName,
      "lastName": newUserLastName,
      "username": newUserUsername,
      "email": newUserEmail,
      "password": newUserPassword,
      "phone": newUserPhone,
      "address": newUserAddress,
      // "image": newUserImage,
      "isadmin": false
    };
    // console.log(newUser)(;
    if (!(/^(012[2|7]|010[0|6]|011[1|4]|0155).{7}$/.test(newUserPhone))) {
      setErors("please enter valid phone")
    }
    else if (newUserAddress.length < 5) {
      setErors("address is too short")
    }
    else if (newUserPassword.length < 4) {
      setErors("password is too short")
    }
    else if (newUserPassword !== newUserPasswordCheck) {
      setErors("password doesnot match");
    } else {
      console.log(newUser);
      Axios.post('http://localhost:5000/users', newUser).then((messages) => {
        setdone(messages);
        setErors("");
        setnewUserFirstName("");
        setnewUserLastName("");
        setnewUserUsername("");
        setnewUserEmail("");
        setnewUserPassword("");
        setnewUserPasswordCheck("");
        setnewUserPhone("");
        setnewUserAddress("");
        // setnewUserImage("");
      }).catch((err) => {
        setErors(err.response.data);
        setdone("");
        console.log(err);
      });
    }
  }
  return (
    <div className="modal fade" id="signUp" tabIndex="-1" role="dialog" aria-labelledby="signUp" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered p-3">
        <div className="modal-content">
          <div className="container">
            <form id="form" onSubmit={handleSubmit}>
              <div className="modal-header mb-3">
                <h5 className="modal-title" id="exampleModalLongTitle">Signup</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {erors != "" ? <div className="alert alert-danger">{erors}</div> : ""}
              {done != "" ? <div className="alert alert-success">you can login now</div> : ""}
              <div className="form-group">
                <label>first name</label>
                <input type="text" className="form-control" id="firstName" value={newUserFirstName} onChange={e => { const { target: { value } } = e; setnewUserFirstName(value) }} aria-describedby="emailHelp" placeholder="first name" required />
              </div>
              <div className="form-group">
                <label >last name</label>
                <input type="text" className="form-control" id="lastname" value={newUserLastName} onChange={e => { const { target: { value } } = e; setnewUserLastName(value) }} aria-describedby="emailHelp" placeholder="last name" required />
              </div>
              <div className="form-group">
                <label >username</label>
                <input type="text" className="form-control" id="username" value={newUserUsername} onChange={e => { const { target: { value } } = e; setnewUserUsername(value) }} aria-describedby="emailHelp" placeholder="username" required />
              </div>
              <div className="form-group">
                <label >Email address</label>
                <input type="email" className="form-control" id="email" value={newUserEmail} onChange={e => { const { target: { value } } = e; setnewUserEmail(value) }} aria-describedby="emailHelp" placeholder="Email address" required />
              </div>
              <div className="form-group">
                <label >password</label>
                <input type="password" className="form-control" id="password" value={newUserPassword} onChange={e => { const { target: { value } } = e; setnewUserPassword(value) }} aria-describedby="emailHelp" placeholder="password" required />
              </div>
              <div className="form-group">
                <label >Retype Password</label>
                <input type="password" className="form-control" id="passwordCheck" value={newUserPasswordCheck} onChange={e => { const { target: { value } } = e; setnewUserPasswordCheck(value) }} aria-describedby="emailHelp" placeholder="Retype Password" required />
              </div>
              <div className="form-group">
                <label >phone</label>
                <input type="text" className="form-control" id="username" value={newUserPhone} onChange={e => { const { target: { value } } = e; setnewUserPhone(value) }} aria-describedby="emailHelp" placeholder="phone" required />
              </div>
              <div className="form-group">
                <label >address</label>
                <input type="text" className="form-control" id="address" value={newUserAddress} onChange={e => { const { target: { value } } = e; setnewUserAddress(value) }} aria-describedby="emailHelp" placeholder="address" required />
              </div>

              {/* <div className="custom-file mb-3">
                <input type="file" className="custom-file-input" id="validatedCustomFile" value={newUserImage} onChange={(e) => handleChange(e)} required />
                <label className="custom-file-label" >upload your image</label>
                <div className="invalid-feedback">Example invalid custom file feedback</div>
              </div> */}
              <div className="form-group mb-3 text-center">
                <button className="btn btn-primary col-2" type="submit">Signup</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignUpcomp;
