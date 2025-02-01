import express from "express";
import multer from "multer";
import sql from "../db.js";
import fs from "fs";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

// Configure multer to store files temporarily
const upload = multer({ dest: "uploads/" });

// Retrieve and format credentials
const client_email = process.env.CLIENT_EMAIL;
const private_key = process.env.PRIVATE_KEY
  ? process.env.PRIVATE_KEY.replace(/\\n/g, "\n")
  : "";
const DRIVE_SCOPE = ["https://www.googleapis.com/auth/drive"];

// Authorize with Google Drive
async function authorize() {
  const jwtClient = new google.auth.JWT(
    client_email,
    null,
    private_key,
    DRIVE_SCOPE
  );
  await jwtClient.authorize();
  return jwtClient;
}

// Upload PDF file to Google Drive and return its URL
async function uploadBookPdf(authClient, file) {
  console.log("Uploading PDF:", file.originalname);
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: "v3", auth: authClient });
    const fileMetadata = {
      name: file.originalname,
      parents: ["1axZl-qW9uZWHyGKMvqo6IzUX6fkcoLE-"], // Change to your Drive folder ID
    };
    const media = {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.path),
    };

    drive.files.create(
      {
        resource: fileMetadata,
        media,
        fields: "id",
      },
      (err, response) => {
        // Remove the local file after upload
        fs.unlinkSync(file.path);

        if (err) {
          console.error("Error uploading PDF to Google Drive:", err);
          return reject(err);
        }
        const fileId = response.data.id;
        const fileUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
        console.log("PDF uploaded successfully:", fileUrl);
        resolve(fileUrl);
      }
    );
  });
}

// Upload cover image to Google Drive and return its URL
async function uploadCoverImage(authClient, file) {
  console.log("Uploading cover image:", file.originalname);
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: "v3", auth: authClient });
    const fileMetadata = {
      name: file.originalname,
      parents: ["14dkI02BBs905t9McYtr3S2q8HSQBSkR2"], // Change to your Drive folder ID
    };
    const media = {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.path),
    };

    drive.files.create(
      {
        resource: fileMetadata,
        media,
        fields: "id",
      },
      (err, response) => {
        // Remove the local file after upload
        fs.unlinkSync(file.path);

        if (err) {
          console.error("Error uploading cover image to Google Drive:", err);
          return reject(err);
        }
        const fileId = response.data.id;
        const fileUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
        console.log("Cover image uploaded successfully:", fileUrl);
        resolve(fileUrl);
      }
    );
  });
}

const router = express.Router();

// Use multer middleware to expect two file fields: pdfFile and coverFile.
router.post(
  "/addBook",
  upload.fields([
    { name: "pdfFile", maxCount: 1 },
    { name: "coverFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        bookTitle,
        authorName,
        publicationDate,
        isbn,
        genre,
        description,
        publisherId,
      } = req.body;

      // Access files from req.files
      const pdfFile =
        req.files && req.files.pdfFile ? req.files.pdfFile[0] : null;
      const imageFile =
        req.files && req.files.coverFile ? req.files.coverFile[0] : null;

      if (!pdfFile || !imageFile) {
        return res
          .status(400)
          .json({ error: "Both PDF file and cover image are required." });
      }

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
      console.log("Files:", pdfFile.originalname, imageFile.originalname);

      const authClient = await authorize();

      const pdfUrl = await uploadBookPdf(authClient, pdfFile);
      const coverUrl = await uploadCoverImage(authClient, imageFile);

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
  }
);

export default router;
