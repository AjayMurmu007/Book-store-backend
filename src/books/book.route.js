const express = require("express");
const Book = require("./book.model");
const { postABook, getAllBook, getSingleBook, updateABook, deleteABook } = require("./book.controller");

const router = express.Router();

// frontend => backend server(reqst) => controller => book schema => database => send to server => back to frontend
// post - when submit something frontend to DB
//  get - when get something back from DB
// put/patch - when edit or update something
// delete - delete something

// post a book
router.post("/create-book", postABook);

// get all books
router.get("/", getAllBook);

// get single book by id
router.get("/:id", getSingleBook);

// update a book
router.put("/edit/:id", updateABook);

// delete a book
router.delete("/delete/:id", deleteABook);
    

module.exports = router;
