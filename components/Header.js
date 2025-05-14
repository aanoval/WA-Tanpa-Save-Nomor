import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Header({ language, toggleLanguage, scrolled }) {
  const content = {
    id: {
      cta: 'Mulai Sekarang',
    },
    en: {
      cta: 'Get Started',
    },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center ${scrolled ? 'bg-[#4CAF50]/90 shadow-md backdrop-blur-md' : 'bg-[#F5F6F5]'}`}
    >
      <motion.h1
        whileHover={{ scale: 1.05 }}
        className="text-2xl font-bold text-[#005C4B]"
      >
        <Link href="https://aibiz.id">Aibiz ID</Link>
      </motion.h1>
      <div className="flex items-center space-x-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleLanguage}
          className="flex items-center space-x-1 text-[#005C4B] cursor-pointer"
          aria-label="Toggle language"
        >
          <img
            src={language === 'id' ? 'https://flagcdn.com/16x12/id.png' : 'https://flagcdn.com/16x12/gb.png'}
            alt={language === 'id' ? 'Bendera Indonesia' : 'UK Flag'}
            className="w-5 h-5"
          />
          <span className="text-lg font-medium">{language === 'id' ? 'ID' : 'EN'}</span>
        </motion.div>
        <Link href="https://wa.aibiz.id">
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 4px 12px rgba(0, 92, 75, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-[#005C4B] text-white rounded-lg font-medium shadow hover:bg-[#004238] transition-all duration-300"
          >
            {content[language].cta}
          </motion.button>
        </Link>
      </div>
    </motion.nav>
  );
}