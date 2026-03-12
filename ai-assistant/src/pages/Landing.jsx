import Welcome from "../components/Welcome";
import Testimonial from "../components/Testimonial";
import Pricing from "../components/Pricing";

export default function Landing() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Welcome />       {/* Welcome / Hero Section */}
      <Testimonial />   {/* Testimonials */}
      <Pricing />       {/* Pricing */}
    </div>
  );
}
