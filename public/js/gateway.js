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
    { field: "id" },
    { field: "cust_id" },
    { field: "edge_id" },
    { field: "name" },
    { field: "description" },
    { field: "addr_id" },
    { field: "brand" },
    { field: "connection" },
    { field: "status" },
    { field: "disabled" },
    { field: "g_group" },
    { field: "site" },
    { field: "latitude" },
    { field: "longitude" },
    { field: "mac_addr" },
    { field: "model" },
    { field: "nodered_url" },
    { field: "os" },
    { field: "serial_no" },
    { field: "ssh_port" },
    { field: "tunnel_client_id" },
    { field: "tunnel_server" },
    { field: "version" },
    { field: "created" },
    { field: "modified" },
    { field: "deteled" },
  ],

  // default col def properties get applied to all columns
  defaultColDef: {
    sortable: true,
    filter: true,
    editable: true,
    resizable: true,
  },

  enableRangeSelection: true,
  enableFillHandle: true,
  rowSelection: "multiple", // allow rows to be selected
  animateRows: true, // have rows animate to new positions when sorted
  readOnlyEdit: true,
  // example event handler
  // onCellClicked: (params) => {
  //   console.log("cell was clicked", params);
  // },
  getRowId: (params) => params.data.id,
  onCellValueChanged: onCellValueChanged,
  onCellEditRequest: onCellEditRequest,
  // fillOperation: (fillOperationParams) => {
  //   console.log(fillOperationParams);
  //   return "Foo";
  // },
};

function autoSizeAll(skipHeader) {
  const allColumnIds = [];
  gridOptions.columnApi.getColumns().forEach((column) => {
    allColumnIds.push(column.getId());
  });
  gridOptions.columnApi.autoSizeColumns(allColumnIds, skipHeader);
}

function onCellValueChanged(params) {
  var changedData = [params.data];
  params.api.applyTransaction({ update: changedData });
  const body = {
    table: "gateway",
    id: params.data.id,
    field: params.colDef.field,
    newVal: params.newValue,
  };
  console.log(body)
  const url = `https://krc2esyxjc.execute-api.ap-southeast-1.amazonaws.com/beta/datagrid/admin`;
  axios.patch(url, body, config).then((response) => {
    console.log(response);
  });
}

function onCellEditRequest(event) {
  const oldData = event.data;
  const field = event.colDef.field;
  const newValue = event.newValue;
  const newData = { ...oldData };
  newData[field] = event.newValue;
  const body = {
    table: "gateway",
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

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", () => {
  const gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);

  //User: display joined table

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
autoSizeAll(false);
