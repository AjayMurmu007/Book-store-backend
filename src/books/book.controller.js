const Book = require("./book.model");

// Post a Book
const postABook = async (req, res) => {
  // console.log(req.body)
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res
      .status(200)
      .send({ message: "Book post successfully...", book: newBook });
  } catch (error) {
    console.log("Error creating book", error);
    res.status(500).send({ message: "Failed to create book..." });
  }
};

// Get all books
const getAllBook = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.log("Error Fetching book", error);
    res.status(500).send({ message: "Failed to fetch book..." });
  }
};

//get single book by id
const getSingleBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.log("Error Fetching book", error);
    res.status(500).send({ message: "Failed to fetch book..." });
  }
};

// Update a book
const updateABook = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).send({ message: "Book not found" });
    }
    res
      .status(200)
      .send({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.log("Error updating book", error);
    res.status(500).send({ message: "Failed to update book..." });
  }
};

// Delete a book
const deleteABook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    console.log("Error deleting book", error);
    res.status(500).send({ message: "Failed to delete book..." });
  }
};

module.exports = { postABook, getAllBook, getSingleBook, updateABook, deleteABook };
