import { Mail, Phone } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Contact Us</h2>
        <p className="text-gray-600">
          Not sure what you need? The team at Square Events will be happy to
          listen to you and suggest event ideas you hadn't considered.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-600">
          <Mail className="h-5 w-5" />
          <a
            href="mailto:pageplay2024@gmail.com"
            className="hover:text-[#265073] transition-colors"
          >
            pageplay2024@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <Phone className="h-5 w-5" />
          <a
            href="tel:+8801788155814"
            className="hover:text-[#265073] transition-colors"
          >
            Support: (+880) 178 815 5814
          </a>
        </div>
      </div>
    </div>
  );
}
