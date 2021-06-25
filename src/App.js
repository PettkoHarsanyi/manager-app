import './App.css';
import { makeStyles, Paper, ThemeProvider, createMuiTheme, Box, Typography, Switch } from "../node_modules/@material-ui/core"
import { useState } from 'react';

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
  }
}))

function App() {
  const [isLight, setIsLight] = useState(true);
  const theme = createMuiTheme({
    palette: {
      type: isLight ? "light" : "dark",
    }
  })

  const handleTheme = () => {
    setIsLight(prev => !prev);
  }

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.app}>
        <Paper className={classes.paper} square>
          <Switch color="primary" disableRipple onChange={handleTheme}/>
          <Typography style={{display:"inline-block"}} variant="h1">
            Hello
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default App;
