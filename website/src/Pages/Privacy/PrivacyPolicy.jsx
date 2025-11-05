import React from "react";

const PrivacyPolicy = () => {
  return (
    <section
      id="privacy-policy"
      className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-8"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1624976501514-8934589cc3e8?ixlib=rb-4.1.0&auto=format&fit=crop&w=1470&q=80')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-white bg-white/10 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10 max-w-4xl w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          Privacy <span className="text-blue-500">Policy</span>
        </h1>

        <div className="space-y-6 text-gray-100">
          <p>
            At <strong>Pizza Shop</strong>, your privacy is very important to
            us. This Privacy Policy explains how we collect, use, and protect
            your personal information when you visit or make a purchase from our
            website.
          </p>

          <h4 className="text-blue-400 font-semibold text-lg">
            1. Information We Collect
          </h4>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email, phone number,
              delivery address, and payment details when you place an order.
            </li>
            <li>
              <strong>Non-Personal Information:</strong> Browser type, device
              info, and your interactions with our website.
            </li>
          </ul>

          <h4 className="text-blue-400 font-semibold text-lg">
            2. How We Use Your Information
          </h4>
          <ul className="list-disc ml-6 space-y-2">
            <li>To process and deliver your pizza orders quickly.</li>
            <li>To improve our menu, website, and customer experience.</li>
            <li>To send order updates, offers, and promotions.</li>
            <li>To comply with legal requirements when needed.</li>
          </ul>

          <h4 className="text-blue-400 font-semibold text-lg">
            3. Data Security
          </h4>
          <p>
            We use secure servers and encryption to protect your data. However,
            no system can guarantee 100% security online.
          </p>

          <h4 className="text-blue-400 font-semibold text-lg">
            4. Cookies Policy
          </h4>
          <p>
            We use cookies to enhance your browsing experience and remember your
            preferences. You can disable cookies in your browser settings if
            desired.
          </p>

          <h4 className="text-blue-400 font-semibold text-lg">
            5. Third-Party Services
          </h4>
          <p>
            We may use third-party platforms like Razorpay, Google Analytics, or
            delivery partners, each governed by their own privacy policies.
          </p>

          <h4 className="text-blue-400 font-semibold text-lg">
            6. Your Rights
          </h4>
          <p>
            You have the right to access, update, or delete your data. Contact
            us at{" "}
            <a
              href="mailto:support@pizzashop.com"
              className="text-blue-400 font-semibold hover:underline"
            >
              support@pizzashop.com
            </a>
            .
          </p>

          <h4 className="text-blue-400 font-semibold text-lg">
            7. Policy Updates
          </h4>
          <p>
            We may update this Privacy Policy occasionally. Please revisit this
            page to stay informed of changes.
          </p>

          <h4 className="text-blue-400 font-semibold text-lg">8. Contact Us</h4>
          <ul className="list-disc ml-6 space-y-2">
            <li>Email: support@pizzashop.com</li>
            <li>Phone: +91 9636366250</li>
            <li>Address: Pizza Shop HQ, Mansarovar, Jaipur, India</li>
          </ul>

          <p className="text-center mt-6 text-gray-300 text-sm">
            Last updated on <strong>October 30, 2025</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
