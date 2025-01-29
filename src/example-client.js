const BookSearchApiClient = require("./BookSearchApiClient.js");
const baseURL = "http://api.book-seller-example.com";
const client = new BookSearchApiClient(baseURL, "json");
const booksByShakespeare = client.getBooksByAuthor("Shakespeare", 10);
const holesBook = client.getBooksByTitle("Holes");
