import { makeStyles, Paper,  Typography, Grid, TextField, OutlinedInput, InputAdornment, IconButton, InputLabel, FormControl, Button } from "../../../node_modules/@material-ui/core"
import { useState } from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paperDark:{
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(https://source.unsplash.com/1920x1080/?dark)",
    backgroundPosition: "70% 100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover", 
  },
  panel:{
    backgroundColor: "#FFF7E2",
    padding: "5vh",
    borderRadius:"2vh",
    minWidth:"300px", 
    border:"0.3vh solid black",
    "& *":{
      fontWeight:"bold"
    }
  },
  panelDark:{
    backgroundColor: "",
    padding: "5vh",
    borderRadius:"2vh",
    border:"0.3vh solid white",
    minWidth:"300px",

    "& *":{
      fontWeight:"bold"
    }
  }
}))

export function LoginPanel(props){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error,setError] = useState();

  const { logUser, users, isLight } = props;
  const classes = useStyles();

  const handlePassword = (prop) => (event) => {
    
    setPassword(event.target.value);
  }

  const handleUsername = (prop) => (event) => {
    setUsername(event.target.value);
  }

  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  }


  const handleLogin = (username,password) => {
    var foundUser = users.find(user => user.username === username);

    if(username===""){
      setError({error:"error",message:"Please fill the username!"})
    }else{
      if(!foundUser){
        setError({error:"error",message:`There is no user called ${username}!`})
      }else{
        if(password===""){
          setError({error:"error",message:"Please fill the password!"})
        }else{
          if (password !== foundUser.password){
            setError({error:"error",message:"The password is incorrect!"});
          }else{
            setError({error:"",message:"Logged"})
            logUser(username);
          }
        }
      }
    }
  }

  if(error && error.message === "Logged"){
    return <Redirect to="/manager"></Redirect>
  }

  return(
    <Grid container justify="center">
      <Grid item xs={12} sm={8} lg={6}>
        <Paper elevation={10} className={isLight?classes.panel:classes.panelDark} style={{display:"flex", alignContent:"center"}}>
          <Grid item container justify="center" spacing={3} alignContent="center">

            <Grid item xs={12}>
              <Typography variant="h3" style={{textAlign:"center"}}>Login to <u style={{fontFamily: 'Pacifico', letterSpacing: "8px"}}>Manager</u></Typography>
            </Grid>

            <Grid item xs={12} style={{marginBottom: "3vh"}}>
                <Typography variant="body1" style={{textAlign:"center", fontWeight:"bold"}}>Welcome to <u style={{fontFamily: 'Pacifico', letterSpacing: "3px"}}>Manager</u>. Below you can login into your account!</Typography>
            </Grid>
            
            <Grid item container xs={12} md={6} justify="center">
              <FormControl variant="outlined" style={{width: "80%"}}>
                <TextField label="Username" variant="outlined" onChange={handleUsername()} onKeyPress={(event)=>{if(event.key==="Enter"){handleLogin(username,password)}}}/>
              </FormControl>
            </Grid>

            <Grid item container xs={12} md={6} justify="center">
              <FormControl variant="outlined" style={{width: "80%"}}>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePassword()}
                  onKeyPress={(event)=>{if(event.key==="Enter"){handleLogin(username,password)}}}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                  />
              </ FormControl>
            </Grid>

            <Grid container item xs={12} style={{marginTop: "3vh"}} justify="center">
              {error?<Paper style={{maxWidth:"fit-content", padding: "1vh 2vh 1vh 2vh", border:"0.2vh solid black", backgroundColor:isLight?"white":"lightgray",}}>
                <Typography color={error.error?"error":'primary'} style={{ fontWeight:"bold"}}>{error.message}</Typography>
              </Paper>:""}
            </Grid>

            <Grid item xs={3}>
              <Button style={{ width:"100%", }} color="primary" variant="contained" onClick={()=>handleLogin(username,password)}>Login</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}