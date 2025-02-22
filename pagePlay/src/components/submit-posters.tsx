import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../Auth/SupabaseClient";

const SubmitPosterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    designerName: "",
    email: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      let fileUrl = "";
      if (file) {
        fileUrl = await fileUpload(file);
      }

      const response = await fetch("http://localhost:5000/user/submitPoster", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          designerName: formData.designerName,
          email: formData.email,
          imageUrl: fileUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit poster");
      }

      const data = await response.json();
      console.log("Poster submitted:", data);
      setFormData({ title: "", description: "", designerName: "", email: "" });
      setFile(null);
      toast.success("Poster Submitted Successfully");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Error submitting poster:", error);
      setSubmitMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fileUpload = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`
      .replace(/\s+/g, "-")
      .toLowerCase();
    console.log("Uploading file:", fileName);

    const { error } = await supabase.storage
      .from("posters_img")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image.");
      return "";
    }

    const { data: publicUrlData } = supabase.storage
      .from("posters_img")
      .getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  };

  return (
    <div className="min-h-screen bg-[#E5EADD] py-12 px-4">
      <Navbar />
      <ToastContainer />
      <div className="mt-8">
        <Card className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-[#FAF7ED] to-[#E5EADD] shadow-lg rounded-xl">
          <h1 className="text-3xl font-bold text-[#265073] mb-6 text-center">
            Submit Your Poster
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Poster Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter your poster title"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your poster design"
                className="resize-none"
              />
            </div>
            <div>
              <Label htmlFor="designerName">Designer Name</Label>
              <Input
                id="designerName"
                name="designerName"
                value={formData.designerName}
                onChange={handleInputChange}
                placeholder="Your name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your email address"
              />
            </div>
            <div>
              <Label htmlFor="posterUpload">Upload Poster</Label>
              <Input
                id="posterUpload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#5D4E96] hover:bg-[#4A3D7D] text-white transition-colors duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Poster"}
            </Button>
          </form>
          {submitMessage && (
            <p className="mt-4 text-center font-semibold text-[#265073]">
              {submitMessage}
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SubmitPosterPage;
