import { makeStyles, ThemeProvider, createMuiTheme, Box, Paper } from "../node_modules/@material-ui/core"
import { useState } from 'react';
import { LoginPanel } from "./components/LoginPanel/LoginPanel";
import { Header } from "./components/Header/Header";

const useStyles = makeStyles(theme => ({
  app:{
    width: "100vw",
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
  appDark:{
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(https://source.unsplash.com/1920x1080/?dark)",
    backgroundPosition: "70% 100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  }
}))

function App() {
  const [isLight, setIsLight] = useState(true);
  const [users] = useState([{username:"manager",password:"manager"},{username:"admin",password:"admin"}]);
  const [error,setError] = useState();

  const lightTheme = createMuiTheme({
    palette: {
      type: "light",
    },
    overrides:{
      MuiAppBar:{
        colorDefault: {
          backgroundColor: "#90CAF9"
        }
      },
      MuiPaper:{
        root:{
        }
      }
    }
  })

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
    overrides:{
      MuiTextField:{
        root:{
          color:{
            light:"#121212"
          }
        }
      }
    }
  })

  const handleTheme = () => {
    setIsLight(prev => !prev);
  }

  const handleLogin = (username,password) => {
    var foundUser = users.find(user => user.username === username);

    if(username===""){
      setError({error:"error",message:"Please fill the username"})
    }else{
      if(!foundUser){
        setError({error:"error",message:`There is no user called ${username}!`})
      }else{
        if(password===""){
          setError({error:"error",message:"Please fill the password"})
        }else{
          if (password !== foundUser.password){
            setError({error:"error",message:"The password is incorrect!"});
          }else{
            setError({error:"",message:"Logged in!"})
          }
        }
      }
    }
  }


  const classes = useStyles();
  return (
    <ThemeProvider theme={isLight?lightTheme : darkTheme}>
      <Paper className={isLight?classes.app:classes.appDark} square>
        <Header  isLight={isLight} handleTheme={handleTheme} />
        <LoginPanel handleLogin={handleLogin} error={error} isLight={isLight}/>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
