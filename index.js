const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5005;
require('dotenv').config()

// console.log("S3_BUCKET");
// Middleware
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}))


// routes
const bookRoutes = require("./src/books/book.route")
app.use('/api/books', bookRoutes)


// connection DB
async function main() {
  await mongoose.connect(process.env.DB_URL);
  // routes
  app.use("/", (req, res) => {
    res.send("Book store server is running!");
  });
}

main()
  .then(() => console.log("MongoDB Connect Successfully.."))
  .catch((err) => console.log(err));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
