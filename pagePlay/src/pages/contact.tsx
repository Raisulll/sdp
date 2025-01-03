import { Mail, Phone } from 'lucide-react'
import { ContactForm } from "@/components/contact-form"

export default function ContactSection() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left Column - Contact Info */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Contact Us</h2>
        <p className="text-muted-foreground">
          Not sure what you need? The team at Square Events will be happy to listen to
          you and suggest event ideas you hadn&apos;t considered.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <a href="mailto:pageplay2025@gmail.com" className="hover:underline">
              pageplay2025@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            <a href="tel:+8801798158614" className="hover:underline">
              Support: (+880) 179 815 8614
            </a>
          </div>
        </div>
        <div className="relative h-48 w-full">
          <img
            src="/placeholder.svg?height=200&width=300"
            alt="Decorative illustration"
            className="absolute bottom-0 right-0 h-auto w-3/4"
          />
        </div>
      </div>

      {/* Right Column - Contact Form */}
      <div className="relative rounded-lg bg-white/80 p-6 backdrop-blur-sm">
        <ContactForm />
      </div>
    </div>
  )
}

