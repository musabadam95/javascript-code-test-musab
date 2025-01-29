const axios = require("axios");
const BookSearchApiClient = require("./BookSearchApiClient");

jest.mock("axios");

describe("BookSearchApiClient", () => {
  const baseURL = "http://api.book-seller-example.com";
  const format = "json";
  const client = new BookSearchApiClient(baseURL, format, 10);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getBooksByAuthor should return formatted book data", async () => {
    const mockResponse = {
      data: [
        {
          book: {
            title: "Hamlet",
            author: "William Shakespeare",
            isbn: "1234567890",
          },
          stock: { quantity: 5, price: 10.99 },
        },
      ],
    };

    axios.get.mockResolvedValue(mockResponse);

    const books = await client.getBooksByAuthor("Shakespeare");

    expect(books).toEqual([
      {
        title: "Hamlet",
        author: "William Shakespeare",
        isbn: "1234567890",
        quantity: 5,
        price: 10.99,
      },
    ]);
  });

  test("getBooksByTitle should return formatted book data", async () => {
    const mockResponse = {
      data: [
        {
          book: { title: "Holes", author: "Louis Sachar", isbn: "0987654321" },
          stock: { quantity: 3, price: 7.99 },
        },
      ],
    };

    axios.get.mockResolvedValue(mockResponse);

    const books = await client.getBooksByTitle("Holes");

    expect(books).toEqual([
      {
        title: "Holes",
        author: "Louis Sachar",
        isbn: "0987654321",
        quantity: 3,
        price: 7.99,
      },
    ]);
  });

//   test("should handle request failure", async () => {
//     const errorMessage = "Network Error";
//     axios.get.mockRejectedValue(new Error(errorMessage));

//     await expect(client.getBooksByAuthor("Shakespeare")).mockRejectedValueOnce()
//   });
});
