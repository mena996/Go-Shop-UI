import React, { useState } from "react";
import Axios from "axios";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';


const SignUpcomp = ({ productid, userid }) => {
  const classes = useStyles();
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
      console.log(newUserPhone);
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
      <div className="modal-dialog modal modal-dialog-centered">
        <div className="modal-content">
          <div className="container">
            <Container component="main">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
                <Typography component="h1" variant="h5" className='modal-header mb-3 my-2'>
                  Welcome to Go-Shop
              </Typography>
                <form id="form" className="col-12" onSubmit={handleSubmit}>
                  {erors != "" ? <div className="alert alert-danger">{erors}</div> : ""}
                  {done != "" ? <div className="alert alert-success">you can login now after verify your email</div> : ""}
                  <div className="form-group">
                    <TextField fullWidth variant="outlined" autoFocus type="text" label="firstName" value={newUserFirstName} onChange={e => { const { target: { value } } = e; setnewUserFirstName(value) }} aria-describedby="emailHelp" placeholder="first name" required />
                  </div>
                  <div className="form-group">
                    <TextField fullWidth variant="outlined" type="text" label="lastname" value={newUserLastName} onChange={e => { const { target: { value } } = e; setnewUserLastName(value) }} aria-describedby="emailHelp" placeholder="last name" required />
                  </div>
                  <div className="form-group">
                    <TextField fullWidth variant="outlined" type="text" label="username" value={newUserUsername} onChange={e => { const { target: { value } } = e; setnewUserUsername(value) }} aria-describedby="emailHelp" placeholder="username" required />
                  </div>
                  <div className="form-group">
                    <TextField fullWidth variant="outlined" type="email" label="email" value={newUserEmail} onChange={e => { const { target: { value } } = e; setnewUserEmail(value) }} aria-describedby="emailHelp" placeholder="Email address" required />
                  </div>
                  <div className="form-group">
                    <TextField fullWidth variant="outlined" type="password" label="password" value={newUserPassword} onChange={e => { const { target: { value } } = e; setnewUserPassword(value) }} aria-describedby="emailHelp" placeholder="password" required />
                  </div>
                  <div className="form-group">
                    <TextField fullWidth variant="outlined" type="password" label="passwordCheck" value={newUserPasswordCheck} onChange={e => { const { target: { value } } = e; setnewUserPasswordCheck(value) }} aria-describedby="emailHelp" placeholder="Retype Password" required />
                  </div>
                  <div className="form-group">
                    <TextField fullWidth variant="outlined" type="text" label="phone" value={newUserPhone} onChange={e => { const { target: { value } } = e; setnewUserPhone(value) }} aria-describedby="emailHelp" placeholder="phone" required />
                  </div>
                  <div className="form-group">
                    <TextField fullWidth variant="outlined" type="text" label="address" value={newUserAddress} onChange={e => { const { target: { value } } = e; setnewUserAddress(value) }} aria-describedby="emailHelp" placeholder="address" required />
                  </div>

                  {/* <div className="custom-file mb-3">
                <input type="file" className="custom-file-input" id="validatedCustomFile" value={newUserImage} onChange={(e) => handleChange(e)} required />
                <label className="custom-file-label" >upload your image</label>
                <div className="invalid-feedback">Example invalid custom file feedback</div>
              </div> */}
                  <div className="form-group mb-3 text-center">
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Signup</Button>
                    {/* <button className="btn btn-primary col-2" type="submit">Signup</button> */}
                  </div>
                </form>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  )
};


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default SignUpcomp;
