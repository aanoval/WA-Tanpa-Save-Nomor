import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMoon, IoSunny } from 'react-icons/io5';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900' : 'bg-gradient-to-br from-gray-200 via-blue-100 to-teal-100'} transition-colors duration-500 overflow-hidden`}>
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className={`fixed top-0 left-0 w-full p-4 sm:p-6 flex justify-between items-center z-50 ${scrolled ? (darkMode ? 'bg-gray-900 bg-opacity-90' : 'bg-white bg-opacity-90') : 'bg-transparent'} shadow-md`}
      >
        <Link href="/">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-green-400 animate-pulse cursor-pointer">
            AIBiz Dashboard
          </h1>
        </Link>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/login')}
          className="px-4 py-2 sm:px-6 sm:py-2.5 bg-green-500 text-white rounded-lg font-medium shadow-lg hover:bg-green-600 transition-all duration-300"
        >
          Login
        </motion.button>
      </motion.header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-screen pt-24 pb-20 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Privacy Policy
          </h2>
          <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-left space-y-6`}>
            <section>
              <h3 className="text-xl font-semibold mb-2">1. Introduction</h3>
              <p>
                Welcome to AIBiz Dashboard ("we", "our", "us"). This Privacy Policy explains how we collect, use, and protect your information when you use our services at{' '}
                <a href="https://wa.aibiz.id" className="text-green-400 hover:underline">https://wa.aibiz.id</a>. Our application (App ID: 2863139783849877) is designed to provide admin tools for WhatsApp integration and user management.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">2. Information We Collect</h3>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc list-inside ml-4">
                <li><strong>Contact Information:</strong> Email and phone numbers provided during registration.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our services, such as chat history and payment details.</li>
                <li><strong>Technical Data:</strong> Device information, IP address, and browser type for security and analytics purposes.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">3. How We Use Your Information</h3>
              <p>Your information is used to:</p>
              <ul className="list-disc list-inside ml-4">
                <li>Provide and improve our services, including WhatsApp messaging and payment verification.</li>
                <li>Communicate with you regarding updates or support.</li>
                <li>Analyze usage patterns to enhance user experience.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">4. Data Sharing</h3>
              <p>We do not sell your personal data. We may share it with:</p>
              <ul className="list-disc list-inside ml-4">
                <li>Third-party service providers (e.g., WhatsApp API via Meta) to facilitate our services.</li>
                <li>Legal authorities if required by law.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">5. Security</h3>
              <p>We implement industry-standard measures to protect your data, but no system is completely secure. Please contact us at <a href="mailto:cs@aibiz.id" className="text-green-400 hover:underline">cs@aibiz.id</a> or <a href="https://wa.me/6287780945321" className="text-green-400 hover:underline">+62 877-8094-5321</a> if you suspect a breach.</p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">6. Your Rights</h3>
              <p>You may request access, correction, or deletion of your data by contacting us at <a href="mailto:cs@aibiz.id" className="text-green-400 hover:underline">cs@aibiz.id</a> or <a href="https://wa.me/6287780945321" className="text-green-400 hover:underline">+62 877-8094-5321</a>. For account deletion, please refer to our <Link href="/delete"><span className="text-green-400 hover:underline cursor-pointer">Delete Instructions</span></Link>.</p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">7. Contact Us</h3>
              <p>For questions about this policy, reach us at:</p>
              <p>Email: <a href="mailto:cs@aibiz.id" className="text-green-400 hover:underline">cs@aibiz.id</a></p>
              <p>WhatsApp: <a href="https://wa.me/6287780945321" className="text-green-400 hover:underline">+62 877-8094-5321</a></p>
              <p>Website: <a href="https://wa.aibiz.id" className="text-green-400 hover:underline">https://wa.aibiz.id</a></p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">8. Changes to This Policy</h3>
              <p>We may update this policy periodically. The latest version will always be available at <a href="https://wa.aibiz.id/privacy" className="text-green-400 hover:underline">https://wa.aibiz.id/privacy</a>.</p>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
          © {new Date().getFullYear()} AIBiz.ID. All rights reserved.
        </p>
      </footer>

      {/* Dark/Light Mode Toggle */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-white text-gray-900'} transition-all duration-300`}
        onClick={toggleDarkMode}
      >
        <AnimatePresence mode="wait">
          {darkMode ? (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <IoSunny size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <IoMoon size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* CSS khusus */}
      <style jsx global>{`
        @media (max-width: 640px) {
          .max-w-3xl {
            max-width: 100%;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .text-4xl {
            font-size: 2rem;
          }
          .text-xl {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
}