import express from "express";
import sql from "../db.js";

const router = express.Router();

// Add a new book
router.post("/addBook", async (req, res) => {
  console.log("Publisher add book api");
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
      pages,
    } = req.body;

    console.log(
      "Received:",
      bookTitle,
      authorName,
      publicationDate,
      isbn,
      genre,
      description,
      publisherId,
      coverUrl,
      pdfUrl,
      pages
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
          cover_image_url,
          pages
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
          ${coverUrl},
          ${pages}
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

// requested books API for publisher
router.get("/requestedBooks", async (req, res) => {
  console.log("Publisher requested books API");
  const { publisherId } = req.query;
  try {
    console.log("Publisher ID:", publisherId);
    const requestedBooks = await sql`
      SELECT 
      b.id, 
      b.title, 
      b.author, 
      b.genre, 
      b.isbn, 
      b.publication_date,
      b.price,
      p.name, 
      b.description,
      b.cover_image_url, 
      b.status
      FROM books b
      JOIN publisher p ON b.publisher_id = p.id
      WHERE 
      b.publisher_id = ${publisherId}
      AND (b.status = 'pending' OR b.status = 'rejected')
    `;
    res.status(200).json(requestedBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something broke!");
  }
});

// publisher book list API
router.get("/booklist", async (req, res) => {
  console.log("Publisher book list API");
  const { publisherId } = req.query;
  try {
    console.log("Publisher ID:", publisherId);
    const bookList = await sql`
      SELECT 
      b.id, 
      b.title, 
      b.author, 
      b.genre, 
      b.isbn, 
      b.publication_date,
      b.price,
      p.name, 
      b.description,
      b.cover_image_url, 
      b.status
      FROM books b
      JOIN publisher p ON b.publisher_id = p.id
      WHERE 
      b.publisher_id = ${publisherId}
    `;
    res.status(200).json(bookList);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something broke!");
  }
});

// publisher profile API
router.get("/profileInfo", async(req, res)=>{
  console.log("Publisher profile API");
  const {publisherId} = req.query;
  try{
    console.log("Publisher ID:", publisherId);
    const publisherInfo = await sql`
      SELECT 
      *
      FROM publisher
      WHERE id = ${publisherId}
    `;
    console.log("Publisher Info:", publisherInfo);
    res.status(200).json(publisherInfo);
  }catch(error){
    console.error(error);
    res.status(500).json("Something broke!");
  }
});

// update publisher profile image API

router.post("/updateProfileImage", async(req, res)=>{
  console.log("Publisher update profile image API");
  const {publisherId, imageUrl} = req.body;
  try{
    console.log("Publisher ID:", publisherId);
    console.log("Image URL:", imageUrl);
    const updatedImage = await sql`
      UPDATE publisher
      SET image = ${imageUrl}
      WHERE id = ${publisherId}
      RETURNING image;
    `;
    console.log("Updated Image:", updatedImage);
    res.status(200).json(updatedImage);
  }catch(error){
    console.error(error);
    res.status(500).json("Something broke!");
  }
});


// update publisher profile API
router.post("/updateProfile", async(req, res)=>{
  console.log("Publisher update profile API");
  const {publisherId, name, email, phone, address, description} = req.body;
  try{
    console.log("Publisher ID:", publisherId);
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Address:", address);
    console.log("Description:", description);
    const updatedProfile = await sql`
      UPDATE publisher
      SET 
      name = ${name},
      email = ${email},
      phone = ${phone},
      address = ${address},
      description = ${description}
      WHERE id = ${publisherId}
      RETURNING *;
    `;
    console.log("Updated Profile:", updatedProfile);
    res.status(200).json(updatedProfile);
  }catch(error){
    console.error(error);
    res.status(500).json("Something broke!");
  }
});

export default router;
