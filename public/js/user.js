const gridOptions = {
  columnDefs: [
    { field: "gateway_id", rowGroup: true, hide: true },
    { field: "device_id", rowGroup: true, hide: true },
    { field: "edge_id", rowGroup: true, hide: true },
    { field: "metric_id" },
    { field: "cust_id" },
    { field: "addr_id" },
    { field: "brand" },
    { field: "connection" },
    { field: "created" },
    { field: "description" },
    { field: "decs" },
    { field: "disabled" },
    { field: "deteled" },
    { field: "g_group" },
    { field: "latitude" },
    { field: "longitude" },
    { field: "mac_addr" },
    { field: "model" },
    { field: "modified" },
    { field: "name" },
    { field: "nodered_url" },
    { field: "os" },
    { field: "profile" },
    { field: "serial_no" },
    { field: "site" },
    { field: "ssh_port" },
    { field: "status" },
    { field: "tunnel_client_id" },
    { field: "tunnel_server" },
    { field: "uom" },
    { field: "version" },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
  },
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
