// Function to demonstrate calling grid's API
function deselect() {
  gridOptions.api.deselectAll();
}

// Grid Options are properties passed to the grid
const gridOptions = {
  // each entry here represents one column
  columnDefs: [
    { field: "addr_id" },
    { field: "brand" },
    { field: "connection" },
    { field: "created" },
    { field: "cust_id" },
    { field: "description" },
    { field: "deteled" },
    { field: "disabled" },
    { field: "edge_id" },
    { field: "g_group" },
    { field: "id" }, 
    { field: "latitude" },
    { field: "longitude" },
    { field: "mac_addr" },
    { field: "model" },
    { field: "modified" },
    { field: "name" },
    { field: "nodered_url" },
    { field: "os" },
    { field: "serial_no" },
    { field: "site" },
    { field: "ssh_port" },
    { field: "status" },
    { field: "tunnel_client_id" },
    { field: "tunnel_server" },
    { field: "version" },
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
// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", () => {
  const gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);

  //User: display joined table

  //axios.get('https://www.ag-grid.com/example-assets/olympic-winners.json')
  axios
    .get(
      "https://krc2esyxjc.execute-api.ap-southeast-1.amazonaws.com/beta/datagrid/admin?table=gateway",
      config
    )
    .then((response) => {
      console.log(response.data);
      gridOptions.api.setRowData(response.data);
    });
});
