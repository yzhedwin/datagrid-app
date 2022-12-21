const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes/index");
const PORT = 3005;
// Start the server
const app = express();
app.use(cors());
app.use("/", indexRouter);
app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => {
  console.log(`listening on port :${PORT}`);
});