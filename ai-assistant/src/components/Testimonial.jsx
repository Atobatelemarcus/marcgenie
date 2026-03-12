// src/components/Testimonial.jsx
import { User } from "lucide-react";

export default function Testimonial() {
  const testimonials = [
    {
      name: "Jane Doe",
      role: "Content Manager",
      text: "MarcGenie helped me generate LinkedIn posts in seconds. The AI is incredibly smart and intuitive!",
    },
    {
      name: "John Smith",
      role: "Tech Writer",
      text: "I love how I can draft Medium articles effortlessly. Saves hours of work every week.",
    },
    {
      name: "Emily Clark",
      role: "Social Media Strategist",
      text: "Creating engaging posts for X has never been easier. MarcGenie is a game-changer.",
    },
  ];

  const purple = "text-purple-600";

  return (
    <section className="py-16 bg-purple-300">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-purple-50 p-6 rounded-lg shadow-lg flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <User className={`${purple} w-8 h-8`} />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-600">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-700 flex-grow">"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
