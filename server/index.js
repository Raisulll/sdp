import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.js";
import publisherRoutes from "./routes/publisherApis.js";
import adminRoutes from "./routes/adminApis.js";
import userRoutes from "./routes/userApis.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/publisher", publisherRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Server is running");
});
