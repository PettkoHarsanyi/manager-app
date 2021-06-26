import { Box, Button, IconButton, makeStyles, Modal, Paper, TextField} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

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
  },
}))


export function Manager(props){
  const {loggedUser, users, isLight} = props;
  const [members,setMembers] = useState([{name:"Figy Elek", birth:1999, team:"Feisbuk"},{name:"Patta Nóra", birth:2000, team:"Gogli"},{name:"Vak Cina", birth:1566, team:"Fájzer"}])
  const [change,setChange]= useState({name:"",birth:"",team:""});
  const [modified,setModified] = useState({});
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = (member) => {
    setOpen(true);
    setChange(member);
    setModified(member);

  };

  const handleClose = () => {
    setOpen(false);
  };
  if(users.find(user=>user.username===loggedUser)===undefined){
    return <Redirect to="/" />
  }

  const handleChange = (member,newMember) =>{
    setMembers(members.map(person => {if(person.name===member.name){ return newMember }else {return person}}))
    handleClose();
  }

  const handleDelete = (member) => {
    setMembers(members.filter(person => person.name !== member.name))
  }

  const handleModify = (prop) => (event) => {
    setModified({...modified, [prop]: event.target.value});
  }

  return(
    <>
    <Grid container justify="center">
      <Grid item container xs={6} component={Paper} elevation={10} className={isLight?classes.panel:classes.panelDark} direction="column" alignItems="center">
        <Grid container item xs={12} component={Paper} elevation={4} className={isLight?classes.header:classes.headerDark} style={{marginBottom:"5vh", padding:"1vh 2vh 1vh 2vh"}}>
          <Grid xs={12} lg={6} className={classes.members} item component={Typography} variant="h3">
            Members
          </Grid>
          <Grid xs={12} lg={6} className={classes.add} item component={Typography} variant="h5">
            <IconButton>
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
                  <IconButton onClick={()=>handleOpen(member)}>
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
        <Grid container item xs={5} style={{backgroundColor:isLight?"white":"gray", padding: "2vh 5vh 2vh 5vh"}} justify="center">
          <Grid item container xs={12} alignItems="center" style={{marginBottom:"5vh",}}>
            <Grid item xs={10}><Typography style={{ justifySelf:"flex-start", textAlign:"left"}} variant="h4">Modify {change.name}</Typography></Grid>
            <Grid item xs={2}><Typography style={{ justifySelf:"flex-end", textAlign:"right"}} variant="h4"><IconButton onClick={handleClose}><CloseIcon fontSize="large" /></IconButton></Typography></Grid>
          </Grid>
          
          <Grid item xs={12} container spacing={5} style={{marginBottom:"3vh"}}>
            <Grid item xs={12} md={4}><TextField id="outlined-required" label="Name" defaultValue={change.name} onChange={handleModify('name')} variant="outlined"></TextField></Grid>
            <Grid item xs={12} md={4}><TextField id="outlined-required" label="Birth" defaultValue={change.birth} onChange={handleModify('birth')} variant="outlined"></TextField></Grid>
            <Grid item xs={12} md={4}><TextField id="outlined-required" label="Team" defaultValue={change.team} onChange={handleModify('team')} variant="outlined"></TextField></Grid>
          </Grid>

          <Grid item xs={12} container style={{textAlign:"center"}}>
            <Grid item xs={6}>
              <Button variant="outlined" color="primary" onClick={()=>handleChange(change,modified)}>Modify</Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" color="secondary" onClick={handleClose}>Cancel</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
    </Modal>
    </>
  )
}