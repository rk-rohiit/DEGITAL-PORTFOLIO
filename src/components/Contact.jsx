import React from "react";
import { Card, CardContent } from "@mui/material";
import { Mail, Phone, Linkedin, Github, MapPin } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "askrohiitsharma@gmail.com",
      href: "mailto:askrohiitsharma@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91-9523076517",
      href: "tel:+919523076517",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/rohitkumar46",
      href: "https://linkedin.com/in/rohitkumar46",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/rk-rohiit",
      href: "https://github.com/rk-rohiit",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-glow mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to collaborate on innovative solutions.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="block animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card
                  elevation={0}
                  className="hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-200 bg-white group"
                  sx={{
                    borderRadius: 3,
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(204, 1, 2, 0.15)",
                    },
                  }}
                >
                  <CardContent className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                      <p className="font-medium text-gray-800 group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          {/* Location Card */}
          <div className="mt-12 text-center">
            <Card
              elevation={0}
              className="bg-gradient-to-r from-primary/5 to-primary-glow/5 border border-primary/20"
              sx={{
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(204, 1, 2, 0.15)",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent>
                <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  Current Location
                </h3>
                <p className="text-gray-600">Punjab, India</p>
                <p className="text-sm text-gray-500 mt-2">
                  Open to remote opportunities and relocation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
