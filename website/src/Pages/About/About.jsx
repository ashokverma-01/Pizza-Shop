import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Jane Smith",
    role: "Marketing Head",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Lee",
    role: "Lead Developer",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    name: "Sarah Johnson",
    role: "Customer Support",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const About = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4 sm:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center pt-10 mb-10 text-gray-800 dark:text-white">
        About <span className="text-blue-600">Us</span>
      </h1>
      <section
        id="about"
        className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-8"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80')",
          }}
        ></div>

        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative text-center max-w-3xl bg-white/95 dark:bg-gray-800/95 rounded-lg shadow-2xl p-6 sm:p-10 transition-colors duration-300">
          <h2 className="text-4xl sm:text-5xl font-bold text-red-600 dark:text-red-400 mb-6">
            🍕 About Pizza Shop
          </h2>

          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-4">
            Welcome to <strong>Pizza Shop</strong> — where every slice tells a
            story! We serve hot, cheesy, and freshly baked pizzas made with
            premium ingredients and lots of love.
          </p>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our mission is simple — to bring the authentic taste of Italy to
            your doorstep with fast delivery, amazing offers, and a smile.
            Whether it’s a family dinner, office lunch, or midnight craving,
            we’ve got your pizza needs covered!
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            From our classic Margherita to loaded cheese burst specials, we use
            hand-tossed dough, farm-fresh veggies, and flavorful sauces to
            create the perfect slice every time. Join the Pizza Shop family and
            experience the joy of great taste, great service, and great vibes!
            🍽️
          </p>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-12">
            Our <span className="text-blue-600">Values</span>
          </h2>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Quality",
                desc: "We deliver only high-quality products that meet customer expectations.",
                color: "from-blue-500 to-indigo-700",
              },
              {
                title: "Integrity",
                desc: "Honesty and transparency guide all our business practices.",
                color: "from-green-500 to-emerald-700",
              },
              {
                title: "Innovation",
                desc: "Constantly improving and bringing new solutions to enhance customer experience.",
                color: "from-pink-500 to-rose-700",
              },
              {
                title: "Customer First",
                desc: "Everything we do revolves around delivering the best to our customers.",
                color: "from-yellow-500 to-orange-600",
              },
            ].map((value, i) => (
              <div
                key={i}
                className={`relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg dark:shadow-gray-900 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl group animate-fadeIn`}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationFillMode: "both",
                }}
              >
                {/* Gradient accent bar */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${value.color} rounded-t-2xl`}
                ></div>

                <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle animated background glow */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_40%,rgba(37,99,235,0.1),transparent_60%)] dark:bg-[radial-gradient(circle_at_70%_40%,rgba(37,99,235,0.2),transparent_60%)] animate-pulse"></div>

        {/* Keyframe animation for fade-in */}
        <style>{`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.8s ease-out forwards;
    }
  `}</style>
      </section>

      {/* Team Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-12">
            Meet <span className="text-blue-600">Our</span> Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-gray-700 p-6 cursor-pointer transition-all duration-300 relative overflow-hidden"
              >
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-500 shadow-md group-hover:border-blue-600 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {member.role}
                </p>

                <div className="flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <i className="fab fa-linkedin text-2xl"></i>
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <i className="fab fa-github text-2xl"></i>
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <i className="fab fa-twitter text-2xl"></i>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-12">
            Why <span className="text-blue-600">Choose</span> Us
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "Fast Delivery",
                desc: "Quick and reliable shipping to your doorstep.",
                color: "from-blue-500 to-blue-700",
              },
              {
                title: "24/7 Support",
                desc: "Our team is always ready to assist you with any queries.",
                color: "from-green-500 to-emerald-700",
              },
              {
                title: "Secure Payments",
                desc: "Safe and trusted payment gateways for smooth transactions.",
                color: "from-purple-500 to-indigo-700",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg dark:shadow-gray-900 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl group animate-fadeIn`}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationFillMode: "both",
                }}
              >
                {/* Decorative gradient bar */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} rounded-t-2xl`}
                ></div>

                {/* Card Content */}
                <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating background animation */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2),transparent_60%)] animate-pulse"></div>

        {/* Keyframe animation */}
        <style>{`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.8s ease-out forwards;
    }
  `}</style>
      </section>
    </div>
  );
};

export default About;
