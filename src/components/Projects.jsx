import React from "react";
import { Card, CardContent } from "@mui/material";
import { Button } from "@mui/material";
import { ExternalLink, Code } from "lucide-react";
import { Chip } from "@mui/material";

const Projects = () => {
  const projects = [
    {
      title: "Collex – Your Campus Marketplace",
      description:
        "Built a campus marketplace platform enabling verified students to sell, rent, and buy products. Implemented secure authentication and listing features with seamless integration.",
      tech: ["React.js", "Express.js", "MongoDB", "JWT"],
      date: "September 2024",
      status: "Live",
      link: "https://collex-dev.vercel.app/",
    },
    {
      title: "RestroSol – Hotel Management",
      description:
        "Designed a comprehensive hotel management system with modern UI and secure authentication. Built REST APIs for smooth frontend-backend communication.",
      tech: ["NEXT Js", "CSS", "JavaScript", "Material UI", "MongoDB", "Node.js"],
      date: "June 2024",
      status: "Live",
      link: "https://restrosol.bizpluscrm.in/",
    },
    {
      title: "Grocery Management System",
      description:
        "Developed a software solution for small shopkeepers to efficiently manage inventory and reduce product loss through smart tracking modules.",
      tech: ["Visual Basic", "Oracle SQL"],
      date: "February 2024",
      status: "Completed",
    },
  ];

  const internship = {
    company: "Mirobytes Technologies",
    position: "Full Stack Developer Intern",
    duration: "December 2023 – June 2024",
    description:
      "Developed and maintained responsive web applications using ReactJS and modern frameworks. Collaborated with cross-functional teams to deliver high-quality solutions with scalable features.",
    tech: ["React.js", "Redux", "Material UI", "Figma", "Express.js", "MongoDB"],
  };

  return (
    <section id="projects" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience & Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6"></div>
        </div>

        {/* Internship Section */}
        <div className="mb-16 animate-slide-up">
          <h3 className="text-2xl font-bold mb-6">Professional Experience</h3>
          <Card
            className="p-6 md:p-8 hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white rounded-2xl"
            elevation={3}
          >
            <CardContent>
              <div className="flex flex-wrap justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-red-600">{internship.position}</h4>
                  <p className="text-lg font-medium text-gray-500">{internship.company}</p>
                </div>
                <Chip
                  label={internship.duration}
                  variant="outlined"
                  sx={{
                    bgcolor: "rgba(255, 0, 0, 0.05)",
                    color: "#cc0102",
                    borderColor: "rgba(255, 0, 0, 0.2)",
                  }}
                />
              </div>
              <p className="text-gray-600 mb-4">{internship.description}</p>
              <div className="flex flex-wrap gap-2">
                {internship.tech.map((tech, index) => (
                  <Chip
                    key={index}
                    label={tech}
                    variant="outlined"
                    size="small"
                    sx={{ borderColor: "#ccc", color: "#555" }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Featured Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 bg-white rounded-2xl flex flex-col animate-scale-in"
                elevation={2}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent>
                  <div className="flex justify-between items-start mb-3">
                    <Code className="w-8 h-8 text-red-600" />
                    {project.status && (
                      <Chip
                        label={project.status}
                        variant="outlined"
                        size="small"
                        sx={{
                          bgcolor:
                            project.status === "Live"
                              ? "rgba(0, 128, 0, 0.1)"
                              : "rgba(200, 200, 200, 0.2)",
                          color: project.status === "Live" ? "green" : "gray",
                          borderColor:
                            project.status === "Live" ? "rgba(0, 128, 0, 0.3)" : "rgba(200, 200, 200, 0.4)",
                        }}
                      />
                    )}
                  </div>

                  <h4 className="text-lg font-bold mb-2">{project.title}</h4>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <Chip
                        key={techIndex}
                        label={tech}
                        size="small"
                        sx={{
                          bgcolor: "rgba(255, 0, 0, 0.05)",
                          color: "#cc0102",
                          borderColor: "rgba(255, 0, 0, 0.2)",
                        }}
                      />
                    ))}
                  </div>

                  <div className="text-xs text-gray-500 mb-3">{project.date}</div>
                  {project.link && (
                    <Button
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        borderColor: "#cc0102",
                        color: "#cc0102",
                        "&:hover": {
                          bgcolor: "rgba(204,1,2,0.1)",
                          borderColor: "#cc0102",
                        },
                      }}
                      endIcon={<ExternalLink className="w-4 h-4" />}
                       onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
                    >
                      View Project
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
