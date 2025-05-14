import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMoon, IoSunny } from 'react-icons/io5';
import Link from 'next/link';

export default function DeleteInstructions() {
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
          className="px-4 py-2 sm:px-6 sm:py-2.5 bg-green-500 text-white rounded-lg font-medium shadow-lg hover:bg-green-600 transition-all(duration-300"
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
            Delete Your Account
          </h2>
          <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-left space-y-6`}>
            <section>
              <h3 className="text-xl font-semibold mb-2">How to Delete Your Data</h3>
              <p>
                To request the deletion of your account and personal data from AIBiz Dashboard, please contact our admin team manually. We do not provide an automated deletion option to ensure that all requests are reviewed carefully.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">Steps to Request Deletion</h3>
              <ol className="list-decimal list-inside ml-4 space-y-2">
                <li>Prepare your request, including your registered email or phone number.</li>
                <li>Contact us via one of the following methods:</li>
                <ul className="list-disc list-inside ml-6">
                  <li>Email: <a href="mailto:cs@aibiz.id" className="text-green-400 hover:underline">cs@aibiz.id</a></li>
                  <li>WhatsApp: <a href="https://wa.me/6287780945321" className="text-green-400 hover:underline">+62 877-8094-5321</a></li>
                </ul>
                <li>Our team will verify your identity and process your request within 7-14 business days.</li>
              </ol>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">What Happens Next?</h3>
              <p>
                Once your request is approved, we will permanently delete your account and associated data from our systems, including chat history, payment records, and user analytics, in accordance with our Privacy Policy.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
              <p>
                If you have any questions or need assistance, feel free to reach out to us at{' '}
                <a href="mailto:cs@aibiz.id" className="text-green-400 hover:underline">cs@aibiz.id</a> or{' '}
                <a href="https://wa.me/6287780945321" className="text-green-400 hover:underline">+62 877-8094-5321</a>.
              </p>
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