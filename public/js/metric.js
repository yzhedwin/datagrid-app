// Function to demonstrate calling grid's API
function deselect() {
  gridOptions.api.deselectAll();
}

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic YWRtaW46cGFzc3dvcmQx`,
  },
};

// Grid Options are properties passed to the grid
const gridOptions = {
  // each entry here represents one column
  columnDefs: [
    { field: "created" },
    { field: "decs" },
    { field: "device_id" },
    { field: "id" },
    { field: "modified" },
    { field: "name" },
    { field: "profile" },
    { field: "uom" },
  ],

  // default col def properties get applied to all columns
  defaultColDef: { flex: 1, sortable: true, filter: true, editable: true },

  rowSelection: "multiple", // allow rows to be selected
  animateRows: true, // have rows animate to new positions when sorted

  // example event handler
  onCellClicked: (params) => {
    console.log("cell was clicked", params);
  },
  getRowId: (params) => params.data.id,
  readOnlyEdit: true,
  onCellEditRequest: onCellEditRequest,
};

function onCellEditRequest(event) {
  const oldData = event.data;
  const field = event.colDef.field;
  const newValue = event.newValue;
  const newData = { ...oldData };
  newData[field] = event.newValue;
  const body = {
    table: "metric",
    id: event.data.id,
    field: field,
    newVal: event.newValue,
  };
  // console.log("onCellEditRequest, updating " + field + " to " + newValue);
  const tx = {
    update: [newData],
  };
  event.api.applyTransaction(tx);
  const url = `https://krc2esyxjc.execute-api.ap-southeast-1.amazonaws.com/beta/datagrid/admin`;
  axios.patch(url, body, config).then((response) => {
    console.log(response);
  });
}
// get div to host the grid
const eGridDiv = document.getElementById("myGrid");
// new grid instance, passing in the hosting DIV and Grid Options
new agGrid.Grid(eGridDiv, gridOptions);
// Fetch data from server
axios
  .get(
    "https://krc2esyxjc.execute-api.ap-southeast-1.amazonaws.com/beta/datagrid/admin?table=metric",
    config
  )
  .then((response) => {
    console.log(response.data);

    gridOptions.api.setRowData(response.data);
  });
