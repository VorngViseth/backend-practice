const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ------------------ DATABASE ------------------
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// ------------------ APIs ------------------
const derlgRouter = require("./src/routes/derlg.router.js");
app.use("/api/derlg", derlgRouter);

// ------------------ SERVER ------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


