import express from "express";
import sql from "../db.js";

const router = express.Router();

// View profile info API for user
router.get("/profileInfo", async (req, res) => {
  const { userId } = req.query;

  console.log("User ID:", userId);

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Fetch user profile by joining 'users' and 'all_users' tables
    const profileInfo = await sql` SELECT * FROM users WHERE id = ${userId} `;

    console.log("Profile info:", profileInfo);

    res.status(200).json(profileInfo); // Return the user profile
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.post("/updateProfileImage", async (req, res) => {
  const { userId, image } = req.body; // Extract userId & image from request body
  console.log("Received:", userId, image);

  try {
    // Use double quotes around "user_id" to avoid case-sensitivity issues
    await sql`
      UPDATE users SET image = ${image} WHERE "id" = ${userId}
    `;
    res.status(200).json({ message: "Profile image updated successfully!" });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.post("/updateProfile", async (req, res) => {
  const { userId, fullName, location, birthday } = req.body;

  console.log("Updating profile for user ID:", userId);

  // Validate Input
  if (!userId || !fullName || !location || !birthday) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Split first name and last name safely
    const [firstname, ...lastname] = fullName.trim().split(/\s+/); // Splits by spaces, removes extra spaces
    const lastnameStr = lastname.length > 0 ? lastname.join(" ") : ""; // Ensures last name isn't 'undefined'

    // Update User Profile
    const result = await sql`
      UPDATE users 
      SET firstname = ${firstname}, lastname = ${lastnameStr}, address = ${location}, date_of_birth = ${birthday}, 
      updated_at = NOW()
      WHERE id = ${userId}
      RETURNING *;  -- Return the updated user data
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    console.log("Profile updated successfully:", result[0]);
    res
      .status(200)
      .json({ message: "Profile updated successfully!", user: result[0] });
  } catch (error) {
    console.error("Error updating profile:", error);
    res
      .status(500)
      .json({ error: "Something went wrong!", details: error.message });
  }
});

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

// addToCart API for user
router.post("/addToCart", async (req, res) => {
  const { bookId, publisherId, userId } = req.body;

  if (!bookId || !publisherId || !userId) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    // Check if the book is already in the cart
    const existingCartItem = await sql`
      SELECT * FROM cart 
      WHERE book_id = ${bookId} 
        AND publisher_id = ${publisherId} 
        AND user_id = ${userId}
    `;

    if (existingCartItem.length > 0) {
      return res.status(200).json({
        message: "Book already added to cart",
        cart: existingCartItem,
      });
    }

    // Insert into the cart table
    const newCartItem = await sql`
      INSERT INTO cart (book_id, publisher_id, user_id)
      VALUES (${bookId}, ${publisherId}, ${userId})
      RETURNING *;
    `;

    res.status(200).json({
      message: "Book added to cart",
      cart: newCartItem,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      error: "Something went wrong while adding to cart.",
    });
  }
});

// wishlist
router.get("/wishlist", async (req, res) => {
  const { userId } = req.query;
  console.log("Received:", userId);
  try {
    const wishlist = await sql`
      select b.title, b.id, b.author, b.cover_image_url, b.price, b.description, c.cart_id, c.publisher_id
      from books b, cart c
      where b.id = c.book_id and c.user_id = ${userId}
    `;
    console.log(wishlist);
    res.status(200).json(wishlist);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json("Something broke!");
  }
});

// DELETE /user/wishlist - Remove an item from the wishlist
router.delete("/wishlist", async (req, res) => {
  const { userId, bookId } = req.body;

  // Check if required fields are present
  if (!userId || !bookId) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    // Check if the item exists in the wishlist
    const existingItem = await sql`
      SELECT * FROM cart 
      WHERE user_id = ${userId} AND book_id = ${bookId}
    `;

    if (existingItem.length === 0) {
      return res.status(404).json({ error: "Item not found in cart." });
    }

    // Remove the item from the cart
    await sql`
      DELETE FROM cart 
      WHERE user_id = ${userId} AND book_id = ${bookId}
    `;

    res.status(200).json({ message: "Item removed from cart successfully." });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({
      error: "Something went wrong while removing the item from the cart.",
    });
  }
});

// fetch post api for user
router.get("/fetchPosts", async (req, res) => {
  try {
    const posts =
      await sql`select p.author_id,p.content, u.firstname, u.lastname, p.id, p.image as "post_image",p.likes,p.timestamp, u.image from posts p , users u where p.author_id = u.id`;

    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json("Something broke!");
  }
});

// add post api for user
router.post("/AddPosts", async (req, res) => {
  const { content, author, image } = req.body;
  console.log("Received:", author, image);
  try {
    await sql`
      INSERT INTO posts (content, author_id, image)
      VALUES (${content}, ${author}, ${image})
    `;
    res.status(200).json("Post added successfully!");
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json("Something broke!");
  }
});

router.post("/likePost", async (req, res) => {
  const { postId, userId } = req.body;
  console.log("Received:", postId, userId);
  try {
    const check =
      await sql`select count(*) from likes where post_id=${postId} and user_id=${userId}`;
    console.log(check);
    if (check[0].count > 0) {
      await sql`delete from likes where post_id=${postId} and user_id=${userId}`;
    } else {
      await sql`insert into likes (post_id, user_id) values (${postId}, ${userId})`;
    }
    const likes = await sql`select count(*) from likes where post_id=${postId}`;
    await sql`update posts set likes=${likes[0].count} where id=${postId}`;
    res.status(200).json("Post liked successfully!");
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json("Something broke!");
  }
});

// check if liked
router.post("/checkLike", async (req, res) => {
  const { postId, userId } = req.body;
  console.log("Received likes:", postId, userId);
  try {
    const check =
      await sql`select count(*) from likes where post_id=${postId} and user_id=${userId}`;
    console.log(check);
    if (check[0].count > 0) {
      // return count
      res.status(200).json({ liked: true });
    } else {
      res.status(200).json({ liked: false });
    }
  } catch (err) {}
});

// fetch comments api for posts
router.get("/fetchComments", async (req, res) => {
  const { postId } = req.query;
  try {
    // fetch parent comments (those with no parent_id)
    const comments = await sql`
      SELECT c.id, c.content, c.likes, c.timestamp, c.author_id, 
         u.firstname, u.lastname, u.image, c.parent_id
      FROM comments c
      JOIN users u ON c.author_id = u.id
      WHERE c.post_id = ${postId} AND c.parent_id IS NULL
      ORDER BY c.timestamp ASC
    `;
    console.log(comments);
    // fetch child comments (those with parent_id)
    const replies = await sql`
      SELECT c.id, c.content, c.likes, c.timestamp, c.author_id, 
         u.firstname, u.lastname, u.image, c.parent_id
      FROM comments c
      JOIN users u ON c.author_id = u.id
      WHERE c.post_id = ${postId} AND c.parent_id IS NOT NULL
      ORDER BY c.timestamp ASC
    `;

    // Build parent comments array with nested replies
    const commentsMap = comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      likes: comment.likes,
      timestamp: comment.timestamp,
      author: {
      id: comment.author_id,
      name: comment.firstname + " " + comment.lastname,
      avatar: comment.image,
      },
      parent_id: comment.parent_id,
      replies: [],
    }));

    // Create a lookup table to easily assign replies
    const commentById = {};
    commentsMap.forEach((comment) => {
      commentById[comment.id] = comment;
    });
    replies.forEach((reply) => {
      if (reply.parent_id && commentById[reply.parent_id]) {
      commentById[reply.parent_id].replies.push({
        id: reply.id,
        content: reply.content,
        likes: reply.likes,
        timestamp: reply.timestamp,
        author: {
        id: reply.author_id,
        name: reply.firstname + " " + reply.lastname,
        avatar: reply.image,
        },
        parent_id: reply.parent_id,
      });
      }
    });

    res.status(200).json(commentsMap);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json("Something broke!");
  }
});

/**
 * POST /:postId/comments
 * Create a new parent comment.
 * Expects body: { content: string, author: { id: number } }
 */
router.post("/addNewComment", async (req, res) => {
  const { postId, content, author } = req.body;

  // console.log("Received:", postId, content, author);
  try {
    const newComment = await sql`
      INSERT INTO comments (content, author_id, post_id, parent_id)
      VALUES (${content}, ${author.id}, ${postId}, NULL)
      RETURNING id, content, likes, timestamp
    `;

    const userResult = await sql`
      SELECT firstname, lastname, image
      FROM users
      WHERE id = ${author.id}
    `;
    if (userResult.length === 0) {
      return res.status(404).json("Author not found");
    }

    const commentResponse = {
      id: newComment[0].id,
      content: newComment[0].content,
      likes: newComment[0].likes,
      timestamp: newComment[0].timestamp,
      author: {
        id: author.id,
        name: userResult[0].firstname + " " + userResult[0].lastname,
        avatar: userResult[0].image,
      },
      replies: [],
    };
    // console.log("Comment response:", commentResponse);
    res.status(201).json(commentResponse);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json("Something broke!");
  }
});

/**
 * POST /:postId/comments/:commentId/replies
 * Reply to an existing comment.
 * Expects body: { content: string, author: { id: number } }
 */
router.post("/:postId/comments/:commentId/replies", async (req, res) => {
  const { postId, commentId } = req.params;
  const { content, author } = req.body;

  try {
    const newReply = await sql`
      INSERT INTO comments (content, author_id, post_id, parent_id)
      VALUES (${content}, ${author.id}, ${postId}, ${commentId})
      RETURNING id, content, likes, timestamp
    `;

    const userResult = await sql`
      SELECT firstname, lastname, image
      FROM users
      WHERE id = ${author.id}
    `;
    if (userResult.length === 0) {
      return res.status(404).json("Author not found");
    }

    const replyResponse = {
      id: newReply[0].id,
      content: newReply[0].content,
      likes: newReply[0].likes,
      timestamp: newReply[0].timestamp,
      author: {
        id: author.id,
        name: userResult[0].firstname + " " + userResult[0].lastname,
        avatar: userResult[0].image,
      },
    };

    res.status(201).json(replyResponse);
  } catch (error) {
    console.error("Error replying to comment:", error);
    res.status(500).json("Something broke!");
  }
});

/**
 * POST /:postId/comments/:commentId/like
 * Increment the likes count of a comment.
 */
router.post("/:postId/comments/:commentId/like", async (req, res) => {
  const { commentId } = req.params;

  try {
    const updated = await sql`
      UPDATE comments
      SET likes = COALESCE(likes, 0) + 1
      WHERE id = ${commentId}
      RETURNING likes
    `;

    if (updated.length === 0) {
      return res.status(404).json("Comment not found");
    }

    res.status(200).json({ likes: updated[0].likes });
  } catch (error) {
    console.error("Error liking comment:", error);
    res.status(500).json("Something broke!");
  }
});

router.post("/payment", async (req, res) => {
  const { userId, bookId, publisherId } = req.body;
  console.log("Received:", userId, bookId, publisherId);
  try {
    await sql`
      INSERT INTO transactions (user_id, book_id, publisher_id)
      VALUES (${userId}, ${bookId}, ${publisherId})
    `;
    
    await sql`
      DELETE FROM cart
      WHERE user_id = ${userId} AND book_id = ${bookId} AND publisher_id = ${publisherId}
    `;
    res.status(200).json("Payment successful!");
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json("Something broke!");
  }
});


// fetch trending books
router.get("/trendingBooks", async (req, res) => {
  try {
    const trendingBooks = await sql`
      SELECT * FROM books 
      WHERE rating > 4 AND status = 'approved'
      ORDER BY rating DESC;
    `;
    console.log(trendingBooks);
    res.status(200).json(trendingBooks);
  } catch (error) {
    console.error("Error fetching trending books:", error);
    res.status(500).json("Something broke!");
  }
})

// fetch suggested books
router.get("/suggestedBooks", async (req, res) => {
  try {
    const suggestedBooks = await sql`
      SELECT * FROM books 
      WHERE rating > 0 AND status = 'approved'
      ORDER BY rating DESC;
    `;
    console.log(suggestedBooks);
    res.status(200).json(suggestedBooks);
  } catch (error) {
    console.error("Error fetching suggested books:", error);
    res.status(500).json("Something broke!");
  }
})

// search books
router.get("/search", async (req, res) => {
  const { query } = req.query;
  console.log("Received:", query);
  try {
    const searchResults = await sql`
      SELECT * FROM books 
      WHERE title ILIKE ${"%"+query+"%"} OR author ILIKE ${"%"+query+"%"}
    `;
    console.log(searchResults);
    res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).json("Something broke!");
  }
})


export default router;
