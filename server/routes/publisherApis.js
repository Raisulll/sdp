import express from "express";
import sql from "../db.js";

const router = express.Router();

// Add a new book
router.post("/addBook", async (req, res) => {
  try {
    const {
      bookTitle,
      authorName,
      publicationDate,
      isbn,
      genre,
      description,
      publisherId,
      coverUrl,
      pdfUrl,
    } = req.body;

    console.log(
      "Received:",
      bookTitle,
      authorName,
      publicationDate,
      isbn,
      genre,
      description,
      publisherId
    );

    // Insert book details into the database
    const result = await sql`
        INSERT INTO books (
          title, 
          author, 
          publication_date, 
          isbn, 
          genre, 
          description, 
          publisher_id, 
          pdf_file_url,
          cover_image_url
        )
        VALUES (
          ${bookTitle},
          ${authorName},
          ${publicationDate},
          ${isbn},
          ${genre},
          ${description},
          ${publisherId},
          ${pdfUrl},
          ${coverUrl}
        )
        RETURNING id;
      `;

    console.log("Book added successfully");
    res
      .status(200)
      .json({ message: "Book added successfully", bookId: result[0].id });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Something broke!" });
  }
});

export default router;
