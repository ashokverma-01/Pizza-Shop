import React from "react";

const ShippingInfo = () => {
  return (
    <section
      id="shipping-info"
      className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-8 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80')",
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Card */}
      <div className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl max-w-4xl w-full p-8 md:p-10 mx-4 transition-transform duration-300 hover:-translate-y-1">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Shipping <span className="text-blue-500">Information</span>
        </h1>

        <h2 className="text-center text-blue-500 font-extrabold text-2xl mb-6">
          🚚 Fresh Pizza, Fast Delivery!
        </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center mb-6">
          At <strong>Pizza Shop</strong>, we ensure your favorite pizzas reach
          you hot, cheesy, and on time! Please read below to understand how our
          delivery and shipping process works.
        </p>

        <Section
          title="1. Delivery Coverage"
          list={[
            "We currently deliver across Jaipur city limits.",
            "Orders outside our delivery zone may not be accepted.",
            "You can check delivery availability during checkout using your pincode.",
          ]}
        />

        <Section
          title="2. Delivery Timings"
          content="We deliver from 10:00 AM to 11:00 PM every day. During weekends or rush hours, slight delays may occur due to high order volume."
        />

        <Section
          title="3. Delivery Charges"
          list={[
            "Free delivery for orders above ₹499.",
            "A nominal delivery fee applies for smaller orders.",
            "Delivery charges (if any) will be visible before checkout.",
          ]}
        />

        <Section
          title="4. Order Tracking"
          content="After placing your order, you’ll receive an SMS or email with your order ID and tracking link to monitor live updates."
        />

        <Section
          title="5. Contactless Delivery"
          content="We offer safe, 100% contactless delivery. Our delivery team follows hygiene protocols to ensure your safety."
        />

        <Section
          title="6. Delivery Delays"
          content="While we strive for timely deliveries, delays may occur due to weather, traffic, or other unexpected reasons. We appreciate your patience."
        />

        <Section
          title="7. Incorrect or Damaged Orders"
          content="If your order arrives incorrect, missing, or damaged, please contact our support team within 1 hour for a replacement or refund."
        />

        <Section
          title="8. Customer Support"
          list={[
            "📧 Email: support@pizzashop.com",
            "📞 Phone: +91 9636366250",
            "🕙 Working Hours: 10:00 AM - 10:00 PM",
          ]}
        />

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8">
          Last updated on <strong>October 30, 2025</strong>.
        </p>
      </div>
    </section>
  );
};

// 🔹 Reusable Section Component
const Section = ({ title, content, list }) => (
  <div className="mt-6">
    <h4 className="text-blue-500 font-semibold text-lg mb-2">{title}</h4>
    {content && (
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {content}
      </p>
    )}
    {list && (
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    )}
  </div>
);

export default ShippingInfo;
