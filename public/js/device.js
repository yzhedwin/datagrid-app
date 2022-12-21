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
    { field: "gateway_id" },
    { field: "name", minWidth: 150 },
    { field: "desc", minWidth: 150 },
    { field: "disabled" },
    { field: "profile" },
    { field: "protocol" },
    { field: "status" },
    { field: "status_str" },
    { field: "created" },
    { field: "deleted" },
    { field: "modfied", minWidth: 200 },
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
  // // example event handler
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
    table: "device",
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
    table: "device",
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
    "https://krc2esyxjc.execute-api.ap-southeast-1.amazonaws.com/beta/datagrid/admin?table=device",
    config
  )
  .then((response) => {
    console.log(response.data);

    gridOptions.api.setRowData(response.data);
  });
autoSizeAll(false);
