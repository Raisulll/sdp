import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Book,
  Bookmark,
  BookOpen,
  Calendar,
  FileText,
  User,
} from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../Auth/SupabaseClient";

// Import PDF.js worker settings
import { GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import * as pdfjsLib from "pdfjs-dist";

// Import react-toastify
import { toast } from "react-toastify";

// Set the worker source for PDF.js
GlobalWorkerOptions.workerSrc = pdfWorker;

interface AddBookDialogProps {
  onClose: () => void;
}

export function AddBookDialog({ onClose }: AddBookDialogProps) {
  // Define available genres
  const genres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Science Fiction",
    "Romance",
    "Fantasy",
    "Biography",
    "History",
    "Children's",
    "Young Adult",
  ];

  const [authorName, setAuthorName] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [isbn, setIsbn] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const user = localStorage.getItem("user");
  const userObj = JSON.parse(user || "{}");
  const publisherId = userObj.publisherId;

  const coverInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const fileUpload = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    fileName.replace(/\s+/g, "-").toLowerCase();
    console.log("file: ", fileName);

    const { data, error } = await supabase.storage
      .from("books")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file.");
      return null;
    }
    console.log(data);
    const { data: publicUrlData } = supabase.storage
      .from("books")
      .getPublicUrl(fileName);
    const publicUrl = publicUrlData.publicUrl;
    console.log("Public URL:", publicUrl);
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a FormData instance to handle file uploads along with other fields
    const formData = new FormData();
    formData.append("authorName", authorName);
    formData.append("bookTitle", bookTitle);
    formData.append("publicationDate", publicationDate);
    formData.append("isbn", isbn);
    formData.append("genre", genre);
    formData.append("description", description);
    formData.append("publisherId", publisherId);
    if (coverFile) {
      formData.append("coverFile", coverFile);
    }
    if (pdfFile) {
      formData.append("pdfFile", pdfFile);
    }

    const coverUrl = coverFile ? await fileUpload(coverFile) : null;
    const pdfUrl = pdfFile ? await fileUpload(pdfFile) : null;
    let pages = 0;
    if (pdfFile) {
      const pdfData = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
      pages = pdf.numPages;
    }

    const data = {
      authorName: authorName,
      bookTitle: bookTitle,
      publicationDate: publicationDate,
      isbn: isbn,
      price: price,
      genre: genre,
      description: description,
      publisherId: publisherId,
      coverUrl: coverUrl,
      pdfUrl: pdfUrl,
      pages: pages,
    };
    console.log("Data: ", data);

    console.log("Form Data ready to submit");

    try {
      const result = await fetch("http://localhost:5000/publisher/addBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await result.json();
      console.log("Response:", responseData);

      if (result.ok) {
        toast.success("Book added successfully!");
      } else {
        toast.error("Error uploading book. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error uploading book. Please try again.");
    } finally {
      // Clear form fields
      setAuthorName("");
      setBookTitle("");
      setPublicationDate("");
      setIsbn("");
      setGenre("");
      setDescription("");
      setCoverFile(null);
      setPdfFile(null);
      // Close the dialog regardless of outcome
      onClose();
    }
  };

  return (
    <DialogContent className="max-w-4xl bg-[#FAF7ED] max-h-[80vh] overflow-y-auto p-4 custom-scrollbar">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-[#265073] text-center">
          Add Book
        </DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-6 py-4">
        {/* Left Column - Form Fields */}
        <div className="space-y-6">
          {/* Author Name */}
          <div className="relative">
            <label className="text-sm font-medium text-[#265073] flex items-center gap-2">
              <User className="h-4 w-4" />
              Author Name
            </label>
            <Input
              placeholder="Enter author name"
              className="mt-2 border-[#265073] focus-visible:ring-[#265073]"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
            />
          </div>

          {/* Book Title */}
          <div className="relative">
            <label className="text-sm font-medium text-[#265073] flex items-center gap-2">
              <Book className="h-4 w-4" />
              Book Title
            </label>
            <Input
              placeholder="Enter book title"
              className="mt-2 border-[#265073] focus-visible:ring-[#265073]"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              required
            />
          </div>

          {/* Publication Date */}
          <div className="relative">
            <label className="text-sm font-medium text-[#265073] flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Publication Date
            </label>
            <Input
              type="date"
              className="mt-2 border-[#265073] focus-visible:ring-[#265073]"
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
              required
            />
          </div>

          {/* ISBN */}
          <div className="relative">
            <label className="text-sm font-medium text-[#265073] flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              ISBN
            </label>
            <Input
              placeholder="Enter ISBN"
              className="mt-2 border-[#265073] focus-visible:ring-[#265073]"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              required
            />
          </div>

          {/* add price filed */}
          <div className="relative">
            <label className="text-sm font-medium text-[#265073] flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              Price
            </label>
            <Input
              placeholder="Enter Price"
              className="mt-2 border-[#265073] focus-visible:ring-[#265073]"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Genre */}
          <div className="relative">
            <label className="text-sm font-medium text-[#265073] flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Genre
            </label>
            <Select onValueChange={(value) => setGenre(value)} required>
              <SelectTrigger className="mt-2 border-[#265073] focus:ring-[#265073]">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genreOption) => (
                  <SelectItem
                    key={genreOption}
                    value={genreOption.toLowerCase()}
                  >
                    {genreOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="relative">
            <label className="text-sm font-medium text-[#265073] flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Description
            </label>
            <Input
              placeholder="Enter book description"
              className="mt-2 border-[#265073] focus-visible:ring-[#265073]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Right Column - Cover Upload & PDF Upload */}
        <div className="space-y-4">
          {/* Cover Upload */}
          <div
            className="aspect-[2/3] border-2 border-dashed border-[#265073] rounded-lg flex flex-col items-center justify-center p-4 hover:bg-[#265073]/5 transition-colors cursor-pointer"
            onClick={() =>
              coverInputRef.current && coverInputRef.current.click()
            }
          >
            {coverFile ? (
              <img
                src={URL.createObjectURL(coverFile)}
                alt="Cover Preview"
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <div className="text-center space-y-2">
                <Book className="h-12 w-12 text-[#265073] mx-auto" />
                <div className="text-sm text-[#265073]">
                  <p className="font-medium">Click to upload cover</p>
                  <p className="text-xs">or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              </div>
            )}
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              ref={coverInputRef}
              onChange={(e) =>
                setCoverFile(e.target.files ? e.target.files[0] : null)
              }
              required
            />
          </div>

          {/* PDF Upload */}
          <div className="relative">
            <label className="text-sm font-medium text-[#265073] flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Upload PDF
            </label>
            <Input
              type="file"
              accept="application/pdf"
              className="mt-2"
              onChange={(e) =>
                setPdfFile(e.target.files ? e.target.files[0] : null)
              }
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
        <Button
          variant="outline"
          type="button"
          className="border-[#265073] text-[#265073] hover:bg-[#265073] hover:text-white"
          onClick={() => {
            // Clear form fields and close the dialog
            setAuthorName("");
            setBookTitle("");
            setPublicationDate("");
            setIsbn("");
            setGenre("");
            setDescription("");
            setCoverFile(null);
            setPdfFile(null);
            onClose();
        }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-[#265073] text-white hover:bg-[#1a3b5c]"
          onClick={handleSubmit}
        >
          Add Book
        </Button>
      </div>
    </DialogContent>
  );
}
