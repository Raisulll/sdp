// db.js
import dotenv from "dotenv";
import postgres from "postgres";

dotenv.config();

// console.log("DATABASE_URL", process.env.DATABASE_URL);
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Please provide a DATABASE_URL");
}

const sql = postgres(connectionString);

export default sql;
