// errorMiddleware.js

function errorHandler(err, req, res, next) {
  console.log(err);
  if (err.message === "Unsupported image type") {
    // Send a 400 Bad Request response for unsupported image type
    return res.status(400).json({ error: "Unsupported image type." });
  }

  console.error(err.stack);

  // For other errors, send a 500 Internal Server Error response
  res.status(500).json({ error: "Something went wrong" });
}

module.exports = errorHandler;

// nesta3mla baad routes lkol ..
