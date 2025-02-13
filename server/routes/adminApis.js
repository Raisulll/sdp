import express from "express";
import sql from "../db.js";

const router = express.Router();

// pending books api for admin
router.get("/pendingBooks", async (req, res) => {
  console.log("Admin pending books api");
  try {
    const pendingBooks =
      await sql`select b.id, title, author,genre, isbn, p.name, publisher_id, b.description, cover_image_url from books b, publisher p where b.publisher_id = p.id and status = 'pending'`;
    res.status(200).json(pendingBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something broke!");
  }
});

// approve book api for admin
router.post("/approveBook", async (req, res) => {
  console.log("Admin approve book api");
  const { bookId, publisher_id } = req.body;
  try {
    await sql`update books set status = 'approved' where id = ${bookId} and publisher_id = ${publisher_id}`;
    res.status(200).json("Book approved successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Something broke!");
  }
});

// reject book api for admin
router.post("/rejectBook", async (req, res) => {
  console.log("Admin reject book api");
  const { bookId, publisher_id } = req.body;
  try {
    await sql`update books set status = 'rejected' where id = ${bookId} and publisher_id = ${publisher_id}`;
    res.status(200).json("Book rejected successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Something broke!");
  }
});

export default router;
