import { Box, Button, IconButton, makeStyles, Modal, Paper, TextField} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios"

const useStyles = makeStyles(theme=>({
  panel:{
    backgroundColor: "#FFF7E2",
    padding:"3vh",
    border:"0.3vh solid black",
    borderRadius:"2vh",
    "& *":{
      fontWeight:"bold"
    },
    minWidth:"350px",
  },
  panelDark:{
    backgroundColor: "",
    padding:"3vh",

    border:"0.3vh solid white",
    borderRadius:"2vh",
    "& *":{
      fontWeight:"bold"
    },
    minWidth:"350px",
  },
  add:{
    textAlign:"center",
    alignSelf:"center",

    [theme.breakpoints.up('lg')]:{
      textAlign:"right",


    }
  },
  header:{
    backgroundColor:""
  },
  headerDark:{
    backgroundColor:"gray",
  },
  members:{
    textAlign:"center",
    alignSelf:"center",

    [theme.breakpoints.up('lg')]:{
      textAlign:"left",


    }
  },
  membersDark:{
    textAlign:"center",
    alignSelf:"center",
    backgroundColor:"gray",

    [theme.breakpoints.up('lg')]:{
      textAlign:"left",


    }
  },
  member:{
    padding:"0vh 2vh 0vh 2vh",
    marginBottom:"1vh",
    textAlign:"left",
    "& *":{
      [theme.breakpoints.down('sm')]:{
        textAlign:"center",
      }
    }
  },
  memberDark:{
    padding:"0vh 2vh 0vh 2vh",
    marginBottom:"1vh",
    textAlign:"left",
    border:'0.1vh solid white',
    "& *":{
      [theme.breakpoints.down('sm')]:{
        textAlign:"center",
      }
    }
  },
  memberheader:{
    padding:"0vh 2vh 0vh 2vh",
    marginBottom:"1vh",
    textAlign:"left",
    "& *":{
      [theme.breakpoints.down('sm')]:{
        textAlign:"center",
      }
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    "& *":{
      fontWeight:"bold",
    }
  },
}))


export function Manager(props){
  const {loggedUser, users, isLight} = props;
  const [members,setMembers] = useState([])
  const [change,setChange]= useState({name:"",birth:"",team:""});
  const [modified,setModified] = useState({});
  const [action,setAction] = useState("");
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    let isSubscribed = true;
    axios.get("https://manager-backend.azurewebsites.net/users").then(response => {
      if(isSubscribed) setMembers(response.data.users)
    })
    return () => isSubscribed = false;
  },[]);

  const handleOpen = (event,member) => {
    setOpen(true);
    setChange(member);
    setAction(event);
    setModified(member);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if(users.find(user=>user.username===loggedUser)===undefined){
    return <Redirect to="/" />
  }

  const handleSend = () =>{
    if(action==="modify"){
      axios.put("https://manager-backend.azurewebsites.net/modifyuser",{from: change,to: modified}).then((response)=>{setMembers(response.data.users)});
      // setMembers(members.map(person => {if(person.name===change.name){ return modified }else {return person}}))
    }else{
      axios.post("https://manager-backend.azurewebsites.net/adduser", modified).then((response)=>{setMembers(response.data.users)});
    }
    handleClose();
  }

  const handleDelete = (member) => {
    axios.put("https://manager-backend.azurewebsites.net/deleteuser", member).then((response)=>{setMembers(response.data.users)});
  }

  const handleModify = (prop) => (event) => {
    setModified({...modified, [prop]: event.target.value});
  }


  return(
    <>
    <Grid container justify="center">
      <Grid item container xs={6} component={Paper} elevation={10} className={isLight?classes.panel:classes.panelDark} direction="row" alignItems="center">
        <Grid container item xs={12} component={Paper} elevation={4} className={isLight?classes.header:classes.headerDark} style={{marginBottom:"5vh", padding:"1vh 2vh 1vh 2vh"}}>
          <Grid xs={12} lg={6} className={classes.members} item component={Typography} variant="h3">
            Members
          </Grid>
          <Grid xs={12} lg={6} className={classes.add} item component={Typography} variant="h5">
            <IconButton  onClick={()=>handleOpen("add",{name:"",birth:"",team:""})}>
              <PersonAddIcon fontSize="large"/>
            </IconButton>
          </Grid>
        </Grid>
        <Grid item container xs={12} direction="row" justify="center" alignContent="flex-start" style={{textAlign:"center"}}>
          {members.map(member=>{
            return(
              <Grid key={member.name} item container direction="row" justify="space-between" alignItems="center" xs={11} component={Paper} className={isLight?classes.member:classes.memberDark}>
                <Grid item component={Typography} xs={4} md={3}>
                  {member.name}
                </Grid >
                <Grid item component={Typography} xs={4} md={3}>{member.birth}</Grid >
                <Grid item component={Typography} xs={4} md={3}>{member.team}</Grid >
                <Grid item component={Box} style={{flex:"0", minWidth:"fit-content"}}>
                  <IconButton onClick={()=>handleOpen("modify",member)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={()=>handleDelete(member)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </Grid>
    
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
      style={{backgroundColor: "rgba(0,0,0,0.8)"}}
    >
      <Grid container justify="center">
        <Grid container item xs={5} style={{backgroundColor:isLight?"white":"gray", padding: "2vh 5vh 2vh 5vh", border:isLight?"0.1vh solid black":"0.1vh solid white", borderRadius:"2vh"}} justify="center">
          <Grid item container xs={12} alignItems="center" style={{marginBottom:"5vh",}}>
            <Grid item xs={10}><Typography style={{ justifySelf:"flex-start", textAlign:"left", color:isLight?"black":"white"}}variant="h4">{action==="add"?"Add member":`Modify ${change.name}`}</Typography></Grid>
            <Grid item xs={2}><Typography style={{ justifySelf:"flex-end", textAlign:"right"}} variant="h4"><IconButton onClick={handleClose}><CloseIcon fontSize="large" /></IconButton></Typography></Grid>
          </Grid>
          
          <Grid item xs={12} container spacing={5} style={{marginBottom:"3vh"}}>
            <Grid item xs={12} lg={4}><TextField onKeyPress={(event)=>{if(event.key==="Enter"){handleSend(change)}}} label="Name" defaultValue={change.name} onChange={handleModify('name')} style={{width:"100%"}} variant="outlined"></TextField></Grid>
            <Grid item xs={12} lg={4}><TextField onKeyPress={(event)=>{if(event.key==="Enter"){handleSend(change)}}} label="Birth" defaultValue={change.birth} onChange={handleModify('birth')} style={{width:"100%"}} variant="outlined"></TextField></Grid>
            <Grid item xs={12} lg={4}><TextField onKeyPress={(event)=>{if(event.key==="Enter"){handleSend(change)}}} label="Team" defaultValue={change.team} onChange={handleModify('team')} style={{width:"100%"}} variant="outlined"></TextField></Grid>
          </Grid>

          <Grid item xs={12} container style={{textAlign:"center"}}>
            <Grid item xs={12}>
              <Button variant="outlined" style={{marginRight:"3vh", borderColor:isLight?"green":"white", color:isLight?"green":"white"}} onClick={()=>handleSend(change)}>{action==="add"?"Add":"Modify"}</Button>
              <Button variant="outlined" style={{borderColor:isLight?"red":"white", color:isLight?"red":"white"}} onClick={handleClose}>Cancel</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
    </Modal>
    </>
  )
}