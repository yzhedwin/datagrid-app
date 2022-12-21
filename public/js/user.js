const gridOptions = {
  columnDefs: [
    { field: "gateway_id", rowGroup: true, hide: false },
    { field: "device_id", rowGroup: true, hide: false },
    { field: "edge_id", rowGroup: true, hide: false },
    { field: "metric_id" },
    { field: "cust_id" },
    { field: "addr_id" },
    { field: "gateway_name" },
    { field: "device_name" },
    { field: "metric_name" },
    { field: "description" },
    { field: "decs" },
    { field: "brand" },
    { field: "connection" },
    { field: "g_group" },

    { field: "mac_addr" },
    { field: "model" },
    { field: "modified" },
    { field: "nodered_url" },
    { field: "os" },
    { field: "profile" },
    { field: "serial_no" },
    { field: "latitude" },
    { field: "longitude" },
    { field: "site" },
    { field: "ssh_port" },
    { field: "status" },
    { field: "tunnel_client_id" },
    { field: "tunnel_server" },
    { field: "uom" },
    { field: "version" },
    { field: "created" },
    { field: "disabled" },
    { field: "deteled" },
  ],
  defaultColDef: {
    sortable: true,
    filter: true,
    resizable: true,
  },
  enableRangeSelection: true,
  rowSelection: "multiple", // allow rows to be selected
  animateRows: true, // have rows animate to new positions when sorted
  autoGroupColumnDef: {
    minWidth: 200,
  },
  groupDefaultExpanded: 1,
};

function onBtForEachNode() {
  console.log("### api.forEachNode() ###");
  gridOptions.api.forEachNode(printNode);
}

function onBtForEachNodeAfterFilter() {
  console.log("### api.forEachNodeAfterFilter() ###");
  gridOptions.api.forEachNodeAfterFilter(printNode);
}

function onBtForEachNodeAfterFilterAndSort() {
  console.log("### api.forEachNodeAfterFilterAndSort() ###");
  gridOptions.api.forEachNodeAfterFilterAndSort(printNode);
}

function onBtForEachLeafNode() {
  console.log("### api.forEachLeafNode() ###");
  gridOptions.api.forEachLeafNode(printNode);
}

const printNode = (node, index) => {
  if (node.group) {
    console.log(index + " -> group: " + node.key);
  } else {
    console.log(
      index + " -> data: " + node.data.country + ", " + node.data.athlete
    );
  }
};
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic YWRtaW46cGFzc3dvcmQx`,
  },
};
function autoSizeAll(skipHeader) {
  const allColumnIds = [];
  gridOptions.columnApi.getColumns().forEach((column) => {
    allColumnIds.push(column.getId());
  });

  gridOptions.columnApi.autoSizeColumns(allColumnIds, skipHeader);
}
// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", () => {
  const gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);

  //User: display joined table

  //axios.get('https://www.ag-grid.com/example-assets/olympic-winners.json')
  axios
    .get(
      "https://krc2esyxjc.execute-api.ap-southeast-1.amazonaws.com/beta/datagrid/user",
      config
    )
    .then((response) => {
      // console.log(JSON.parse(response.data.body));
      gridOptions.api.setRowData(JSON.parse(response.data.body));
    });
});
autoSizeAll(false);
