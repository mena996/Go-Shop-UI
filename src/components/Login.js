import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from "react-router-dom";
// error variable if any
let error = null;

const Login = ({UserContext, isAdmin}) => {
  //user context that holds user info
  const { setUser } = React.useContext(UserContext);
  //auth data state
  const [authData, setAuthData] = React.useState({
    username: "",
    password: "",
    isAdmin,
  });

  const classes = useStyles();

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setAuthData({ ...authData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authData.username && authData.password){
    const res = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      body: JSON.stringify(authData),
      headers: {
        "Content-Type": "application/json",
      },
    });
// if user is successfully logged in as an admin or user
    if((res.status === 201 && isAdmin) || (res.status === 200 && !isAdmin)){
      const response = await res.json();
      const getUser = await fetch("http://localhost:5000/users/me", {
        method: "POST",
        body: JSON.stringify({ token: response.accessToken }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const user = await getUser.json();
      user.token = response.accessToken;
      setImmediate(()=> setUser(user));
    }
// if an user is trying to access admin panel
    else if (res.status === 200 && isAdmin) error = "Sorry only Admins can access this page";
// if no user was found in DB or invalid username/password combination
    else if (res.status === 404 || res.status === 401) error = "Invalid credintials";
// server side problem
    else error = "some thing wrong happened";
    setAuthData({ username: "", password: "", isAdmin: true });
  }
  };
//admin panel
   return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" className='my-2'>
        {isAdmin ? "Sign in to Admin panel" : "Welcome to Go-Shop"}
      </Typography>
      {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required={true}
          fullWidth
          id="username"
          label="Username"
          name="username"
          onChange={handleInputChange}
          value={authData.username}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={handleInputChange}
          value={authData.password}
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
      </form>
    </div>
    <Box mt={8}>
    </Box>
  </Container>
  )
};


//style settings for the material form
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default Login;