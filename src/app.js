require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Import route files
const usersRouter = require("./routes/user");
const rootRouter = require("./routes/root");
const categoriesRouter = require("./routes/categories");
const itemsRouter = require("./routes/items");

app.use("/", rootRouter);
app.use("/api/users", usersRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/items", itemsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
