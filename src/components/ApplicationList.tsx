import React from "react";
import api from "../services/api";
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from "@mui/material";

type Props = {
    handleOnclick: (item: string) => void;
    updateType: (item: boolean) => void;
};

const ApplicationList = (props: Props) => {
    const { handleOnclick, updateType } = props;
  const [applications, setApplications] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setIsLoading(true);
    try{
    api.getApplications().then((res) => {
      setApplications(res.data);
      setIsLoading(false);
    });
}
catch(err){
    console.log(err);
    setIsLoading(false);
}
  }, []);

  const handleListOnclick = (e:any) => {
    // console.log(e.target.innerText);
    handleOnclick(e.target.innerText);
    updateType(true);
  }

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper", overflow: 'auto',
      maxHeight: 300, }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      
      subheader={
        <ListSubheader component="h2" id="nested-list-subheader">
          Applications
        </ListSubheader>
      }
    >
      {(applications.length && !isLoading) ?
        applications.map((application, index) => (
          <ListItemButton key={`${index}-${application}`} >
            <ListItemText primary={application} onClick={handleListOnclick}/>
          </ListItemButton>
        ))
        :
        <CircularProgress />}
    </List>
  );
};

export default ApplicationList;
