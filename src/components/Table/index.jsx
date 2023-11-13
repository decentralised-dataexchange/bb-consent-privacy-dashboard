// import MUIDataTable from "mui-datatables";

// import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const columns = [
  {
    name: "timestamp",
    label: "Timestamp",
    options: {
      filter: false,
      sort: true,
    },
  },
  {
    name: "log",
    label: "Log",
    options: {
      filter: false,
      sort: true,
    },
  },
];
const options = {
  filter: true,
  selectableRows: false,
  filterType: "checkbox",
  responsive: "scroll",
};

const data = [
  { timestamp: "2 Mar 2019,12:30:10", log: "Test Corp" },
  { timestamp: "3 Mar 2019,12:30:10", log: "Test Corp" },
  { timestamp: "4 Mar 2019,12:30:10", log: "Test Corp" },
  { timestamp: "5 Mar 2019,12:30:10", log: "Test Corp" },
];

const Table = () => {
  // const getMuiTheme = () =>
  //   createMuiTheme({
  //     overrides: {
  //       MUIDataTable: {
  //         root: {
  //           backgroundColor: "#FF000",
  //         },
  //         paper: {
  //           boxShadow: "none",
  //         },
  //       },
  //       MUIDataTableBodyCell: {
  //         root: {
  //           // backgroundColor: "#FF0000"
  //         },
  //       },
  //     },
  //   });

 
  return (
    <>View logs</>
    // <MuiThemeProvider theme={getMuiTheme()}>
      // <MUIDataTable
      //   // title={"Logs"}
      //   data={data}
      //   columns={columns}
      //   options={options}
      // />
    // </MuiThemeProvider>
  );
};

export default Table;
