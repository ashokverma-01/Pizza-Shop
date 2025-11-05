import React from "react";

const TermsAndConditions = () => {
  return (
    <section
      id="terms"
      className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-8 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1678917827802-721b5f5b4bf0?ixlib=rb-4.1.0&auto=format&fit=crop&w=1470&q=80')",
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Main Content Card */}
      <div className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl max-w-4xl w-full p-8 md:p-10 mx-4 transition-transform duration-300 hover:-translate-y-1">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Terms and <span className="text-blue-500">Conditions</span>
        </h1>

        <h2 className="text-center text-blue-500 font-extrabold text-2xl mb-6">
          🍕 Pizza Shop Terms & Conditions
        </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center mb-6">
          Welcome to <strong>Pizza Shop</strong>! By accessing or using our
          website, you agree to comply with and be bound by the following terms
          and conditions. Please read them carefully before placing your order.
        </p>

        <Section
          title="1. Acceptance of Terms"
          content="By using our website and placing an order, you confirm that you have read, understood, and agreed to our Terms & Conditions and Privacy Policy."
        />

        <Section
          title="2. Ordering Policy"
          list={[
            "All pizza orders are subject to availability and confirmation.",
            "Prices displayed include all applicable taxes.",
            "Once confirmed, orders cannot be modified or canceled unless approved by our support team.",
          ]}
        />

        <Section
          title="3. Delivery Policy"
          content="We aim to deliver your pizza hot and fresh within the estimated time. However, delays may occur due to traffic, weather, or high demand."
        />

        <Section
          title="4. Payment Terms"
          content="We accept secure payments through Razorpay, UPI, and Cash on Delivery (COD). You agree that you are authorized to use your chosen payment method."
        />

        <Section
          title="5. Refund & Cancellation"
          list={[
            "Refunds apply only to incorrect or damaged deliveries.",
            "Cancellations must be made before order preparation begins.",
            "Refunds (if approved) are processed within 5–7 business days.",
          ]}
        />

        <Section
          title="6. User Responsibilities"
          list={[
            "Provide accurate delivery and contact details.",
            "Do not misuse our platform for fraudulent or illegal activity.",
            "Treat our delivery partners respectfully.",
          ]}
        />

        <Section
          title="7. Intellectual Property"
          content="All logos, text, designs, and content on the Pizza Shop website are owned by Pizza Shop and may not be reproduced without written consent."
        />

        <Section
          title="8. Limitation of Liability"
          content="Pizza Shop is not responsible for any indirect, incidental, or consequential losses resulting from use of our services or website."
        />

        <Section
          title="9. Modifications"
          content="We reserve the right to update these Terms & Conditions at any time. All updates will be posted on this page."
        />

        <Section
          title="10. Contact Information"
          list={[
            "📧 Email: support@pizzashop.com",
            "📞 Phone: +91 9636366250",
            "🏠 Address: Pizza Shop HQ, Mansarovar, Jaipur, India",
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

export default TermsAndConditions;
