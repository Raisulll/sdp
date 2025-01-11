import ContactForm from "@/components/contact-form";
import ContactInfo from "@/components/contact-info";
import Navbar from "@/components/navbar";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#E5EADD]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold text-center text-[#265073] mb-12">
          CONTACT US
        </h1>

        <div className="grid md:grid-cols-2 gap-8 items-start justify-center min-h-[calc(100vh-10rem)]">
          <ContactInfo />
          <ContactForm />
        </div>
      </main>
    </div>
  );
}
