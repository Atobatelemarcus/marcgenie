// src/components/Pricing.jsx
import { Check } from "lucide-react";

export default function Pricing() {
  const purple = "bg-purple-400";
  const hoverPurple = "hover:bg-purple-700";

  const plans = [
    {
      name: "Starter",
      price: "$0",
      features: ["5 posts per month", "Basic AI assistance", "Email support"],
    },
    {
      name: "Pro",
      price: "$19",
      features: ["50 posts per month", "Advanced AI features", "Priority support"],
    },
    {
      name: "Enterprise",
      price: "$49",
      features: ["Unlimited posts", "Full AI customization", "Dedicated support"],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className="border rounded-lg shadow-lg p-6 flex flex-col gap-6 hover:shadow-xl transition">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="text-3xl font-extrabold">{plan.price}</p>
              <ul className="flex flex-col gap-2">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className={`${purple} w-4 h-4`} />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`mt-auto px-4 py-2 text-white rounded ${purple} ${hoverPurple} transition`}>
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
