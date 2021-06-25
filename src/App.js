import './App.css';
import { makeStyles, Paper, ThemeProvider, createMuiTheme, Box, Typography, Switch, AppBar, Toolbar, Grid, TextField, OutlinedInput, InputAdornment, IconButton, InputLabel, FormControl, Button } from "../node_modules/@material-ui/core"
import { useState } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(theme => ({
  app:{
    width: "100%",
    height: "100%",
  },
  paper:{
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  dButtonLight:{
    display:"flex", 
    flexDirection:"column", 
    alignItems:"center", 
    border: "0.3vh solid black", 
    padding:"0 2vh 0 2vh",
    borderRadius:"2vh",
    backgroundColor: "#DCDCDC",
    transition:"0.5s",
    "&:hover":{
      backgroundColor:"gray",
    }
  },
  dButtonDark:{
    display:"flex", 
    flexDirection:"column", 
    alignItems:"center", 
    border: "0.3vh solid black", 
    padding:"0 2vh 0 2vh",
    borderRadius:"2vh",
    backgroundColor: "#212121",
    transition:"0.5s",
    "&:hover":{
      backgroundColor:"gray",
    }
  },
  panel:{
    padding: "5vh",
    borderRadius:"2vh",
  }
}))

function App() {
  const [isLight, setIsLight] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [users,setUsers] = useState([{username:"manager",password:"manager"},{username:"admin",password:"admin"}]);
  const [error,setError] = useState({error:"",message:""});

  const lightTheme = createMuiTheme({
    palette: {
      type: "light",
    },
    overrides:{
      MuiAppBar:{
        colorDefault: {
          backgroundColor: "#90CAF9"
        }
      }
    }
  })

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
    overrides:{
    }
  })

  const handleTheme = () => {
    setIsLight(prev => !prev);
  }

  const handlePassword = (prop) => (event) => {
    setPassword(event.target.value);
  }

  const handleUsername = (prop) => (event) => {
    setUsername(event.target.value);
    console.log(username);
  }

  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  }

  const handleLogin = () => {
    var foundUser = users.find(user => user.username === username);

    if(!foundUser){
      setError({error:"error",message:`There is no user called ${username}!`})
    }else{
      if (password !== foundUser.password){
        setError({error:"error",message:"Passwords don't match!"});
      }else{
        setError({error:"",message:"Bejelentkezve!"})
      }
    }
  }


  const classes = useStyles();
  return (
    <ThemeProvider theme={isLight?lightTheme : darkTheme}>
      <Box className={classes.app}>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <Typography  variant="h6" style={{flex: "1"}}>
              Manager
            </Typography>
            <Box component="div" className={isLight ? classes.dButtonLight : classes.dButtonDark}>
              <Switch color="primary" disableRipple onChange={handleTheme}/>
              <Typography style={{fontSize:"1vh"}}>{isLight?"LIGHT MODE":"DARK MODE"}</Typography>
            </Box>
          </Toolbar>
        </AppBar>
        
        <Paper className={classes.paper} square>
          <Grid container justify="center">
            <Grid item xs={6}>
              <Paper elevation={10} className={classes.panel} style={{display:"flex", alignContent:"center", border:"0.2vh solid black"}}>
                <Grid item container justify="center" spacing={3} alignContent="center">

                  <Grid item xs={12}>
                    <Typography variant="h3" style={{textAlign:"center"}}>Login to Manager</Typography>
                  </Grid>

                  <Grid item xs={12} style={{marginBottom: "3vh"}}>
                    <Typography variant="body1" style={{textAlign:"center"}}>Welcome to Manager. Below you can login into your account!</Typography>
                  </Grid>
                  
                  <Grid item container xs={12} md={6} justify="center">
                    <FormControl variant="outlined" style={{width: "80%"}}>
                      <TextField color="primary" label="Username" variant="outlined" onChange={handleUsername()}/>
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

                  <Grid item xs={12} style={{marginTop: "3vh"}}>
                    <Typography color={error.error?"error":'primary'} style={{textAlign:"center"}}>{error.message}</Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <Button style={{ width:"100%", }} color="primary" variant="contained" onClick={handleLogin}>Login</Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default App;
