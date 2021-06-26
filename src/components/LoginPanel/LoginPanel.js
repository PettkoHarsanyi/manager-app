import { makeStyles, Paper, ThemeProvider, createMuiTheme, Box, Typography, Switch, AppBar, Toolbar, Grid, TextField, OutlinedInput, InputAdornment, IconButton, InputLabel, FormControl, Button } from "../../../node_modules/@material-ui/core"
import { useState } from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles(theme => ({
  paper:{
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(https://source.unsplash.com/collection/1548469/1920x1080?sig=683479)",
    backgroundPosition: "70% 100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
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
    "& *":{
      fontWeight:"bold"
    }
  },
  panelDark:{
    backgroundColor: "",
    padding: "5vh",
    borderRadius:"2vh",
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

  const { handleLogin, error, isLight } = props;
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

  return(
    <Grid container justify="center">
      <Grid item xs={12} sm={8} lg={6}>
        <Paper elevation={10} className={isLight?classes.panel:classes.panelDark} style={{display:"flex", alignContent:"center", border:"0.2vh solid black"}}>
          <Grid item container justify="center" spacing={3} alignContent="center">

            <Grid item xs={12}>
              <Typography variant="h3" style={{textAlign:"center"}}>Login to <u>Manager</u></Typography>
            </Grid>

            <Grid item xs={12} style={{marginBottom: "3vh"}}>
              <Typography variant="body1" style={{textAlign:"center", fontWeight:"bold"}}>Welcome to <u>Manager</u>. Below you can login into your account!</Typography>
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