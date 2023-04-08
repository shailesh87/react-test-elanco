import { Button, Card, Grid } from "@mui/material";
import React from "react";
import ResourceList from "./components/ResourceList";
import ApplicationList from "./components/ApplicationList";
import DataTable from "./components/DataTable";

function App() {
  const [isApplication, setIsApplication] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<string>("");
  const reset = () => {
    setSelectedItem("");
    setIsApplication(false);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <ApplicationList
          handleOnclick={setSelectedItem}
          updateType={setIsApplication}
        />
        <ResourceList
          handleOnclick={setSelectedItem}
          updateType={setIsApplication}
        />
      </Grid>
      <Grid item xs={10}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h2>
            {selectedItem
              ? !isApplication
                ? `${selectedItem} Resource Data`
                : `${selectedItem} Application Data`
              : `Raw Data`}
          </h2>{" "}
        </Grid>
        <Grid item xs={2}>
          {selectedItem && (
            <Button  size="small" onClick={reset}>
              Clear
            </Button>
          )}
        </Grid>
        </Grid>
        <Card>
          <DataTable isApplication={isApplication} dataFor={selectedItem} />
        </Card>
      </Grid>
    </Grid>
  );
}

export default App;
