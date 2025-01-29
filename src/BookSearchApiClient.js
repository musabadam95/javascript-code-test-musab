const axios = require("axios");

function formatResponse(response, format) {
  if (format == "json") {
    return response.data.map(function (item) {
      return {
        title: item.book.title,
        author: item.book.author,
        isbn: item.book.isbn,
        quantity: item.stock.quantity,
        price: item.stock.price,
      };
    });
  } else if (format == "xml") {
    return response.data.documentElement.childNodes.map(function (item) {
      return {
        title: item.childNodes[0].childNodes[0].nodeValue,
        author: item.childNodes[0].childNodes[1].nodeValue,
        isbn: item.childNodes[0].childNodes[2].nodeValue,
        quantity: item.childNodes[1].childNodes[0].nodeValue,
        price: item.childNodes[1].childNodes[1].nodeValue,
      };
    });
  }
}

async function sendRequest(url, path, params) {
  const response = await axios
    .get(url + path, {
      params: params,
    })
    .catch((err) => {
      console.log("Request failed.  Returned status of " + err);
      return err;
    });
  return formatResponse(response, params.format);
}

function BookSearchApiClient(url, format, limit = 0) {
  this.url = url;
  this.format = format;
  this.limit = limit;
}

BookSearchApiClient.prototype.getBooksByAuthor = async function (authorName) {
  const pathName = "/by-author";
  return await sendRequest(this.url, pathName, {
    q: authorName,
    limit: this.limit,
    format: this.format,
  });
};

BookSearchApiClient.prototype.getBooksByTitle = function (title) {
  const pathName = "/by-title";
  return sendRequest(this.url, pathName, {
    q: title,
    limit: this.limit,
    format: this.format,
  });
};

module.exports = BookSearchApiClient;
