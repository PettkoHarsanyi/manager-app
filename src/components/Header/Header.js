import { AppBar, Box, makeStyles, Switch, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  modeButtonLight:{
    display:"flex", 
    flexDirection:"column", 
    alignItems:"center", 
    border: "0.3vh solid black", 
    padding:"0 2vh 0 2vh",
    borderRadius:"2vh",
    backgroundColor: "#FFF7E2",
    transition:"0.5s",
    "&:hover":{
      backgroundColor:"gray",
    }
  },
  modeButtonDark:{
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
  }
}))

export function Header(props){
  const {isLight,handleTheme} = props;
  const classes = useStyles();
  return(
    <AppBar position="fixed" color="default">
      <Toolbar>
        <Typography  variant="h6" style={{flex: "1"}}>
          <u>Manager</u>
        </Typography>
        <Box component="div" className={isLight ? classes.modeButtonLight : classes.modeButtonDark}>
          <Switch color="primary" disableRipple onChange={handleTheme}/>
          <Typography style={{fontSize:"1vh"}}>{isLight?"LIGHT MODE":"DARK MODE"}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}