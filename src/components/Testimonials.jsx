import { Typography, Card, CardContent, Avatar, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Ankit Verma",
    feedback:
      "Rohit is an exceptional developer who delivers polished, scalable solutions on time.",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Priya Singh",
    feedback:
      "Great collaboration skills! His React & MUI knowledge is top-notch.",
    image: "https://i.pravatar.cc/150?img=6",
  },
  {
    name: "Rahul Sharma",
    feedback:
      "Highly professional and detail-oriented. His UI/UX sense elevates every project.",
    image: "https://i.pravatar.cc/150?img=8",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const slideVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <section
      id="testimonials"
      className="bg-gradient-to-b from-gray-50 to-white py-24 px-4 sm:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        {/* Heading */}
        <Typography
          variant="h4"
          className="font-bold text-gray-800 mb-12 tracking-wide"
        >
          Testimonials
        </Typography>

        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            minHeight: 300,
          }}
          onMouseEnter={() => clearInterval()} // pauses on hover
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6 }}
            >
              <Card
                elevation={4}
                className="rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white mx-auto max-w-lg"
              >
                <CardContent className="flex flex-col items-center text-center space-y-5 p-8">
                  <Avatar
                    src={testimonials[index].image}
                    alt={testimonials[index].name}
                    sx={{ width: 90, height: 90, border: "3px solid #cc0102" }}
                  />
                  <Typography
                    variant="body1"
                    className="italic text-gray-700 leading-relaxed"
                  >
                    “{testimonials[index].feedback}”
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className="font-semibold text-[#cc0102]"
                  >
                    {testimonials[index].name}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === index ? "bg-[#cc0102] w-6" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
