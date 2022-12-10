const express = require("express");
const app = express();
const port = 3000;

// import body parser
const bodyParser = require("body-parser");

// import cors
const cors = require("cors");

// use cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// import router
const postsRouter = require("./routes/posts");
app.use("/api/posts", postsRouter);

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
