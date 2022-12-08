// Function to demonstrate calling grid's API
function deselect() {
  gridOptions.api.deselectAll();
}

// Grid Options are properties passed to the grid
const gridOptions = {
  // each entry here represents one column
  columnDefs: [
    { field: "created" },
    { field: "deleted" },
    { field: "desc" },
    { field: "disabled" },
    { field: "gateway_id" },
    { field: "id" },
    { field: "modfied" },
    { field: "name" },
    { field: "profile" },
    { field: "protocol" },
    { field: "status" },
    { field: "status_str" },
  ],

  // default col def properties get applied to all columns
  defaultColDef: { sortable: true, filter: true },

  rowSelection: "multiple", // allow rows to be selected
  animateRows: true, // have rows animate to new positions when sorted

  // example event handler
  onCellClicked: (params) => {
    console.log("cell was clicked", params);
  },
};

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic YWRtaW46cGFzc3dvcmQx`,
  },
};
// get div to host the grid
const eGridDiv = document.getElementById("myGrid");
// new grid instance, passing in the hosting DIV and Grid Options
new agGrid.Grid(eGridDiv, gridOptions);
// Fetch data from server
axios
  .get(
    "https://krc2esyxjc.execute-api.ap-southeast-1.amazonaws.com/beta/datagrid/admin?table=device",
    config
  )
  .then((response) => {
    console.log(response.data);

    gridOptions.api.setRowData(response.data);
  });
