import express from "express";
import sql from "../db.js";

const router = express.Router();

// view pdf api for user
router.get("/pdfUrl", async (req, res) => {
  // console.log("User view pdf api");
  const { bookId } = req.query;
  // console.log("Received:", bookId);
  try {
    const pdfUrl = await sql`select * from books where id = ${bookId}`;
    // console.log(pdfUrl);
    res.status(200).json(pdfUrl);
  } catch (error) {
    // console.error(error);
    res.status(500).json("Something broke!");
  }
});

// view similar books api for user
router.get("/similarBooks", async (req, res) => {
  console.log("User view similar book api");
  const { bookId, genre } = req.query;
  console.log("Received:", bookId, genre);
  try {
    const similarBooks =
      await sql`select id, cover_image_url, publisher_id  from books where id = ${bookId} and genre = ${genre}`;
    console.log(similarBooks);
    res.status(200).json(similarBooks);
  } catch (error) {
    // console.error(error);
    res.status(500).json("Something broke!");
  }
});

// review api for user
router.get("/reviews", async (req, res) => {
  const { bookId, publisherId } = req.query;
  console.log("Received:", bookId, publisherId);
  try {
    const reviews = await sql`
      select firstname, lastname, image, rating, r.created_at, comment, likes  
      from users u, book_review r 
      where r.user_id=u.id and r.book_id=${bookId} and r.publisher_id=${publisherId};
    `;
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json("Something broke!");
  }
});

// add review api for user
router.post("/addReview", async (req, res) => {
  // console.log("User add review api");
  const { rating, comment, bookId, publisherId, userId } = req.body;
  // console.log("Received:", rating, comment, bookId, publisherId, userId);
  try {
    await sql`
      INSERT INTO book_review (user_id, publisher_id, rating, comment, book_id)
      VALUES (${userId}, ${publisherId}, ${rating}, ${comment}, ${bookId})
    `;
    res.status(200).json("Review added successfully!");
  } catch (error) {
    // console.error("Error adding review:", error);
    res.status(500).json("Something broke!");
  }
});

// fetch rating api for books
router.get("/rating", async (req, res) => {
  const { bookId, publisherId } = req.query;
  console.log("Received:", bookId, publisherId);
  try {
    const rating = await sql`
      select avg(rating) as rating from book_review where book_id=${bookId} and publisher_id=${publisherId}
    `;
    // console.log(rating);
    res.status(200).json(rating);
  } catch (error) {
    // console.error("Error fetching rating:", error);
    res.status(500).json("Something broke!");
  }
});

//  addToCart api for user
router.post("/addToCart", async (req, res) => {
  const { bookId, publisherId, userId } = req.body;

  if (!bookId || !publisherId || !userId) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    // Insert into the cart table and return the inserted row.
    const result = await sql`
      INSERT INTO cart (book_id, publisher_id, user_id)
      VALUES (${bookId}, ${publisherId}, ${userId})
      RETURNING *;
    `;

    res.status(200).json({
      message: "Book added to cart",
      cart: result,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res
      .status(500)
      .json({ error: "Something went wrong while adding to cart." });
  }
});


// wishlist
router.get("/wishlist", async (req, res) => {
  const { userId } = req.query;
  console.log("Received:", userId);
  try {
    const wishlist = await sql`
      select b.title, b.id, b.author, b.cover_image_url, b.price, b.description, c.cart_id
      from books b, cart c
      where b.id = c.book_id and c.user_id = ${userId}
    `;
    console.log(wishlist);
    res.status(200).json(wishlist);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json("Something broke!");
  }
})

export default router;
