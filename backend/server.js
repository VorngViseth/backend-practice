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

// images
app.use("/uploads", express.static("./src/uploads"));

// DerLg
const derlgRouter = require("./src/routes/derlg.route.js");
app.use("/api/derlg", derlgRouter);

// NhamEy
const nhameyRouter = require("./src/routes/nhamey.route.js");
app.use("/api/nhamey", nhameyRouter);

// Community
const communityRouter = require("./src/routes/community.route.js");
app.use("/api/community", communityRouter);

//Users
const usersRouter = require("./src/routes/user.route.js");
app.use("/api/users", usersRouter);

// ------------------ SERVER ------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});