import express from "express";
import sql from "../db.js";

const router = express.Router();

// view pdf api for user
router.get("/pdfUrl", async(req, res) => {
  console.log("User view pdf api");
  const { bookId } = req.query;
  console.log("Received:", bookId);
  try {
    const pdfUrl = await sql`select * from books where id = ${bookId}`;
    res.status(200).json(pdfUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something broke!");
  }
});

export default router;
