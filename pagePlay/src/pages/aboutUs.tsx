import { Facebook, Github, Mail, Contact } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/navbar" 
import sabbir from "../assets/sabbir.jpg"
import rahad from "../assets/Raisul.png"
import arif from "../assets/arif.jpg"
import anika from "../assets/Anika.jpg"
import surjo from "../assets/Kabbo.jpg"
import foisal from "../assets/foisal.jpg"

interface TeamMember {
  name: string
  email: string
  facebook: string
  github: string
  phone?: string
  image: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Md. Sabbir Hossain",
    email: "example@example.com",
    facebook: "https://facebook.com/example",
    github: "https://github.com/example",
    phone: "12345678",
    image: sabbir
  },
  {
    name: "Md. Rafiqul Islam Rahad",
    email: "example2@example.com",
    facebook: "https://facebook.com/example2",
    github: "https://github.com/example2",
    phone: "12345678",
    image: rahad
  },
  {
    name: "Mr. Arif Abdullah",
    email: "example3@example.com",
    facebook: "https://facebook.com/example3",
    github: "https://github.com/example3",
    phone: "12345678",
    image: arif
  },
  {
    name: "Anika Tasnim",
    email: "example4@example.com",
    facebook: "https://facebook.com/example4",
    github: "https://github.com/example4",
    phone: "12345678",
    image: anika
  },
  {
    name: "Kabbo Sarkar Surjo",
    email: "example5@example.com",
    facebook: "https://facebook.com/example5",
    github: "https://github.com/example5",
    phone: "12345678",
    image: surjo
  },
  {
    name: "Md. Fahad Ahmed",
    email: "example6@example.com",
    facebook: "https://facebook.com/example6",
    github: "https://github.com/example6",
    phone: "12345678",
    image: foisal
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#e5eadd" }}>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="relative">
          {/* Decorative Elements */}
          <div className="absolute left-0 bottom-0 opacity-20">
            <img
              src={sabbir}
              alt=""
              className="w-48 h-32 object-cover"
              role="presentation"
            />
          </div>
          <div className="absolute right-0 top-0 opacity-20">
            <img
              src={foisal}
              alt=""
              className="w-48 h-32 object-cover"
              role="presentation"
            />
          </div>

          {/* Main Content */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            {teamMembers.map((member, index) => (
              <Card 
                key={index} 
                className={`bg-white/80 backdrop-blur-sm mb-8 ${
                  index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                }`}
                style={{ width: 'calc(100% - 2rem)', maxWidth: '600px' }}
              >
                <CardContent className="flex items-center gap-6 p-6">
                  <div className="flex-shrink-0">
                    <img
                      src={member.image}
                      alt={`${member.name}'s profile`}
                      className="w-32 h-24 object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        {member.email}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <a
                          href={member.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                          aria-label={`${member.name}'s Facebook profile`}
                        >
                          <Facebook className="w-5 h-5" />
                        </a>
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                          aria-label={`${member.name}'s GitHub profile`}
                        >
                          <Github className="w-5 h-5" />
                        </a>
                        <a
                          href={`tel:${member.phone}`}
                          className="text-gray-600 hover:text-green-600 transition-colors"
                          aria-label={`Call ${member.name}`}
                        >
                          <Contact className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

