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

const ResourceList = (props: Props) => {
  const { handleOnclick, updateType } = props;
  const [resources, setResources] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setIsLoading(true);
    try{
    api.getResources().then((res) => {
      setResources(res.data);
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
    updateType(false);
  }

  return (
    <List
      sx={{ width: "100%",  bgcolor: "background.paper", overflow: 'auto',
      maxHeight: 300, }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      
      subheader={
        <ListSubheader component="h2" id="nested-list-subheader">
          Resources
        </ListSubheader>
      }
    >
      {(resources.length && !isLoading) ?
        resources.map((resource, index) => (
          <ListItemButton key={`${index}-${resource}`}>
            <ListItemText primary={resource} onClick={handleListOnclick} />
          </ListItemButton>
        ))
        :
        <CircularProgress />}
    </List>
  );
};

export default ResourceList;
