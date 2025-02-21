"use client";

import { useState, useEffect } from "react";
import { Facebook, Github, Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/navbar_guest";
import sabbir from "../assets/sabbir.jpg";
import rahad from "../assets/Raisul_1.jpg";
import arif from "../assets/arif.jpg";
import anika from "../assets/Anika.jpg";
import surjo from "../assets/Kabbo.jpg";
import foisal from "../assets/foisal.jpg";

interface TeamMember {
  name: string;
  email: string;
  facebook: string;
  github: string;
  phone?: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Md. Raisul Islam Rahad",
    email: "raisulll.rahad@gmail.com",
    facebook: "https://facebook.com/example2",
    github: "https://github.com/example2",
    phone: "01778665529",
    image: rahad,
  },
  {
    name: "Md. Sabbir Hossain",
    email: "sabbir1808769@gmail.com",
    facebook: "https://facebook.com/example",
    github: "https://github.com/example",
    phone: "01798155814",
    image: sabbir,
  },
  {
    name: "Mr. Arif Abdullah",
    email: "arif465109@gmail.com",
    facebook: "https://facebook.com/example3",
    github: "https://github.com/example3",
    phone: "01721171112",
    image: arif,
  },
  {
    name: "Anika Tasnim",
    email: "anika.tasnim0302@gmail.com",
    facebook: "https://facebook.com/example4",
    github: "https://github.com/example4",
    phone: "01711180435",
    image: anika,
  },
  {
    name: "Kabbo Sarkar Surjo",
    email: "sarkarkabbo72@gmail.com",
    facebook: "https://facebook.com/example5",
    github: "https://github.com/example5",
    phone: "01795121387",
    image: surjo,
  },
  {
    name: "Md. Foisal Ahmed",
    email: "mdfoisal552211@gmail.com",
    facebook: "https://facebook.com/example6",
    github: "https://github.com/example6",
    phone: "01533482516",
    image: foisal,
  },
];

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="relative">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

          {/* Main Content */}
          <div className="text-center mb-16 relative z-10">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're a diverse group of passionate individuals working together
              to create amazing experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className={`bg-white/90 backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-xl rounded-xl ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="mb-4 overflow-hidden rounded-full w-32 h-32 mx-auto">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={`${member.name}'s profile`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {member.name}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        {member.email}
                      </p>
                      <p className="flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        {member.phone}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-4">
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
