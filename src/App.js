import { makeStyles, ThemeProvider, createMuiTheme, Paper } from "../node_modules/@material-ui/core"
import { useState } from 'react';
import { LoginPanel } from "./components/LoginPanel/LoginPanel";
import { Header } from "./components/Header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Manager } from "./components/Manager/Manager";

const useStyles = makeStyles(theme => ({
  app:{
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(https://source.unsplash.com/1920x1080/?light)",
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

export function App() {
  const [isLight, setIsLight] = useState(true);
  const [users] = useState([{username:"manager",password:"manager"},{username:"admin",password:"admin"}]);
  const [loggedUser, setLoggedUser] = useState("");

  const lightTheme = createMuiTheme({
    palette: {type: "light",},overrides:{MuiAppBar:{colorDefault: {backgroundColor: "#90CAF9"}},}
  })

  const darkTheme = createMuiTheme({
    palette: {type: "dark",}, overrides:{MuiTextField:{root:{color:{light:"#121212"}}}}
  })

  const handleTheme = () => {
    setIsLight(prev => !prev);
  }

  const logUser = (user) => {
    setLoggedUser(user);
  }

  const classes = useStyles();
  return (
    <BrowserRouter>
      <ThemeProvider theme={isLight?lightTheme : darkTheme}>
        <Paper className={isLight?classes.app:classes.appDark} square>
          <Header  isLight={isLight} handleTheme={handleTheme} />

          <Switch>
            <Route exact path="/">  
              <LoginPanel logUser={logUser} users={users} isLight={isLight}/>
            </Route>
            <Route path="/manager">
              <Manager loggedUser={loggedUser} users={users} isLight={isLight}/>
            </Route>
          </Switch>
        </Paper>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
