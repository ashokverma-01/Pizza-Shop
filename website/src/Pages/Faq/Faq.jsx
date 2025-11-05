import React, { useState } from "react";

const Faq = () => {
  const faqs = [
    {
      question: "How can I place an order at Pizza Shop?",
      answer:
        "You can place an order directly on our website or app. Choose your favorite pizza, customize it, add to cart, and proceed to checkout!",
    },
    {
      question: "Do you offer home delivery?",
      answer:
        "Yes! We offer fast home delivery across Jaipur city. Orders above ₹499 are delivered for free.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major payment methods — UPI, Debit/Credit Cards, Net Banking, and Cash on Delivery (COD).",
    },
    {
      question: "Can I cancel my order after placing it?",
      answer:
        "You can cancel your order within 5 minutes of placing it by contacting our support team, provided it hasn’t been prepared yet.",
    },
    {
      question: "What if my pizza is cold or incorrect?",
      answer:
        "If your pizza arrives cold or incorrect, please contact our support immediately. We’ll arrange a replacement or refund as per our policy.",
    },
    {
      question: "Do you offer vegetarian or vegan options?",
      answer:
        "Absolutely! We offer a variety of vegetarian pizzas, and vegan-friendly options are coming soon.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is placed, you’ll receive a confirmation message with a live tracking link to monitor delivery in real-time.",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Page Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center pt-10 mb-10 text-gray-800 dark:text-white">
        Frequently Asked <span className="text-blue-600">Questions</span>
      </h1>

      {/* Background Section */}
      <div className="relative min-h-screen bg-[url('https://plus.unsplash.com/premium_photo-1678000616480-d4a041e6eba1?auto=format&fit=crop&q=60&w=1000')] bg-cover bg-center flex items-center justify-center py-12">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* FAQ Card */}
        <div className="relative bg-white/95 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl max-w-4xl w-full p-8 md:p-10 mx-4 transition-transform duration-300 hover:-translate-y-2">
          <h2 className="text-center text-blue-600 font-extrabold text-3xl mb-8">
            🍕 Pizza Shop FAQs
          </h2>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-8">
            Still have questions? Contact us at{" "}
            <a
              href="mailto:support@pizzashop.com"
              className="text-blue-600 font-semibold hover:underline"
            >
              support@pizzashop.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

// Accordion Item Component
const FAQItem = ({ faq }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border-b border-gray-300 dark:border-gray-700 py-4 cursor-pointer transition-all duration-300 ${
        open ? "bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4" : ""
      }`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center">
        <h4 className="text-blue-600 font-semibold text-lg">{faq.question}</h4>
        <span
          className={`text-blue-600 text-2xl font-bold transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </div>
      {open && (
        <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
          {faq.answer}
        </p>
      )}
    </div>
  );
};

export default Faq;
