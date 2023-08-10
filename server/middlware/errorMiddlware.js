// errorMiddleware.js

function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Send a 500 Internal Server Error response
  res.status(500).json({ error: "Something went wrong" });
}

module.exports = errorHandler;




// nesta3mla baad routes lkol ..