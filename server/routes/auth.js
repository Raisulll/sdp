import express from "express";
import sql from "../db.js";

const router = express.Router();

// signup api for users
router.post("/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    dateOfBirth,
    gender,
    address,
  } = req.body;

  console.log("req.body", req.body);

  try {
    // Check if user already exists
    const userExists = await sql`SELECT * FROM allUser WHERE email = ${email}`;
    if (userExists.count > 0) {
      console.log("User already exists");
      return res.status(400).json("User already exists");
    }

    // Insert user
    const newUser = await sql`
      INSERT INTO users (firstName, lastName, email, phone_number, password, gender, date_of_birth, address)
      VALUES (${firstName}, ${lastName}, ${email}, ${phone}, ${password}, ${gender}, ${dateOfBirth}, ${address})
    `;
    const newAllUser =
      await sql`INSERT INTO allUser (email, role) VALUES (${email}, 'user')`;

    console.log("newAllUser", newAllUser);
    console.log("newUser", newUser);
    res.status(200).json("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Something broke!");
  }
});

//login api for users
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("req.body", req.body);
  try {
    const user = await sql`select * from allUser where email = ${email}`;
    if (user.count === 0) {
      return res.status(400).json("User not found");
    }
    if (user[0].role === "user") {
      const user = await sql`select * from users where email = ${email}`;
      if (user[0].password === password) {
        return res.status(200).json({userId: user[0].id, role: "user", image : user[0].image});
      } else {
        return res.status(400).json("Password is incorrect");
      }
    } else if (user[0].role === "admin" || user[0].role === "superadmin") {
      const admin = await sql`select * from admin where email = ${email}`;
      if (admin[0].password === password) {
        return res.status(200).json({role: "admin", adminId: admin[0].id, image: admin[0].image});
      } else {
        return res.status(400).json("Password is incorrect");
      }
    } else {
      const publisher =
        await sql`select * from publisher where email = ${email}`;
      if (publisher[0].password === password) {
        return res.status(200).json({publisherId: publisher[0].id, role: "publisher", image: publisher[0].image});
      } else {
        return res.status(400).json("Password is incorrect");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Something broke!");
  }
});

export default router;
