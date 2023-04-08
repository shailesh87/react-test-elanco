import React from "react";
import api from "../services/api";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

type Props = {
  isApplication: boolean;
  dataFor: string;
};

type Tags = {
  "app-name": string;
  "business-unit": string;
  environment: string;
};

type Resource = {
  ConsumedQuantity: string;
  Cost: number;
  Date: string;
  InstanceId: string;
  Location: string;
  MeterCategory: string;
  ResourceGroup: string;
  ResourceLocation: string;
  ServiceName: string;
  Tags: Tags;
  UnitOfMeasure: string;
};

const DataTable = (props: Props) => {
  const { isApplication, dataFor } = props;
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [resources, setResources] = React.useState<Resource[]>([]);

  React.useEffect(() => {
    if (dataFor) {
      try {
        if (isApplication) {
          api.getApplicationByName(dataFor).then((res) => {
            setResources([...res.data]);
            setIsLoading(false);
          });
        } else {
          api.getResourceByName(dataFor).then((res) => {
            setResources([...res.data]);
            setIsLoading(false);
          });
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
    else{
        try{
        api.getRaws().then((res) => {
          setResources([...res.data]);
          setIsLoading(false);
        });}
        catch(err){
            console.log(err);
            setIsLoading(false);
        }
    }
  }, [isApplication, dataFor]);

  const columns: GridColDef[] = [
    { field: "ConsumedQuantity", headerName: "Consumed Quantity", width: 150 },
    { field: "Cost", headerName: "Cost", width: 150 },
    { field: "Date", headerName: "Date", width: 150 },
    // { field: 'InstanceId', headerName: 'Instance ID', width: 150 },
    { field: "Location", headerName: "Location", width: 150 },
    { field: "MeterCategory", headerName: "Meter Category", width: 150 },
    { field: "ResourceGroup", headerName: "Resource Group", width: 150 },
    { field: "ResourceLocation", headerName: "Resource Location", width: 150 },
    { field: "ServiceName", headerName: "Service Name", width: 150 },
    // { field: "Tags", headerName: "Tags", width: 150 },
    { field: "UnitOfMeasure", headerName: "Unit of Measure", width: 150 },
  ];
  
  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <DataGrid
        rows={resources}
        columns={columns}
        checkboxSelection={false}
        getRowId={() => "id" + Math.random().toString(16).slice(2)}
        loading={isLoading}
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
};

export default DataTable;
