import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { IoCopyOutline, IoTrashOutline, IoSendSharp, IoChevronBack, IoChevronForward, IoChatbubblesSharp, IoBookSharp, IoInformationCircle } from 'react-icons/io5';

const content = {
  id: {
    history: {
      title: 'Riwayat Pesan',
      subtitle: 'Lihat hingga 10 pesan terakhir yang Anda kirim.',
      noHistory: 'Belum ada pesan.',
      copy: 'Salin',
      resend: 'Kirim Ulang',
      clear: 'Hapus Riwayat',
      prev: 'Sebelumnya',
      next: 'Selanjutnya',
    },
    guide: {
      title: 'Panduan Penggunaan',
      subtitle: 'Ikuti langkah-langkah berikut untuk mengirim pesan tanpa menyimpan nomor:',
      steps: [
        { text: 'Pilih kode telepon dari dropdown (default: 62 untuk Indonesia).', icon: <IoSendSharp /> },
        { text: 'Masukkan nomor telepon tujuan tanpa kode telepon (contoh: 858123131313).', icon: <IoSendSharp /> },
        { text: 'Tulis pesan yang ingin Anda kirim di kolom pesan.', icon: <IoSendSharp /> },
        { text: 'Klik "Kirim Pesan" untuk membuka WhatsApp dengan nomor dan pesan yang diisi.', icon: <IoSendSharp /> },
        { text: 'Riwayat pesan Anda akan disimpan secara lokal dan dapat dilihat di bagian riwayat.', icon: <IoSendSharp /> },
      ],
    },
    about: {
      title: 'Tentang Kami',
      subtitle: 'Aibiz ID - Penyedia Resmi WhatsApp Business Platform',
      desc: 'Kami adalah penyedia solusi komunikasi berbasis AI untuk bisnis Anda. Dengan WhatsApp Business API, kami membantu Anda mengotomatiskan layanan pelanggan, pemesanan, dan integrasi nomor bisnis dengan aman dan efisien.',
      cta: 'Pelajari Lebih Lanjut',
    },
  },
  en: {
    history: {
      title: 'Message History',
      subtitle: 'View up to 10 recent messages you sent.',
      noHistory: 'No messages yet.',
      copy: 'Copy',
      resend: 'Resend',
      clear: 'Clear History',
      prev: 'Previous',
      next: 'Next',
    },
    guide: {
      title: 'Usage Guide',
      subtitle: 'Follow these steps to send messages without saving the number:',
      steps: [
        { text: 'Select the phone code from the dropdown (default: 62 for Indonesia).', icon: <IoSendSharp /> },
        { text: 'Enter the destination phone number without the phone code (e.g., 858123131313).', icon: <IoSendSharp /> },
        { text: 'Write the message you want to send in the message field.', icon: <IoSendSharp /> },
        { text: 'Click "Send Message" to open WhatsApp with the number and message filled in.', icon: <IoSendSharp /> },
        { text: 'Your message history will be saved locally and can be viewed in the history section.', icon: <IoSendSharp /> },
      ],
    },
    about: {
      title: 'About Us',
      subtitle: 'Aibiz ID - Official WhatsApp Business Platform Provider',
      desc: 'We provide AI-driven communication solutions for your business. With WhatsApp Business API, we help you automate customer service, orders, and business number integration securely and efficiently.',
      cta: 'Learn More',
    },
  },
};

export default function MainContent({ language }) {
  const [history, setHistory] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // Inisialisasi 10 placeholder riwayat
  const placeholderHistory = Array(10).fill().map((_, index) => ({
    id: `placeholder-${index}`,
    number: content[language].history.noHistory,
    message: content[language].history.noHistory,
    timestamp: new Date().toISOString(),
    isPlaceholder: true,
  }));

  // History Storage
  useEffect(() => {
    const savedHistory = localStorage.getItem('waHistory');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory).slice(0, 10);
      setHistory(parsedHistory);
      if (parsedHistory.length < 4) {
        setCurrentSlide(Math.floor(parsedHistory.length / 2));
      }
    }
  }, []);

  const displayHistory = history.length > 0 ? [...history, ...placeholderHistory].slice(0, 10) : placeholderHistory;

  const handleCopy = (item) => {
    if (item.isPlaceholder) return;
    navigator.clipboard.writeText(`Number: ${item.number}\nMessage: ${item.message}`);
    alert(language === 'id' ? 'Teks disalin ke clipboard!' : 'Text copied to clipboard!');
  };

  const handleResend = (item) => {
    if (item.isPlaceholder) return;
    const countryCode = item.number.slice(0, item.number.length - 10);
    const phone = item.number.slice(-10);
    window.dispatchEvent(new CustomEvent('resendMessage', { detail: { countryCode, phone, message: item.message } }));
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('waHistory');
    setCurrentSlide(0);
  };

  const handleSlide = (direction) => {
    const itemsPerSlide = window.innerWidth >= 768 ? 3 : 1;
    if (direction === 'next' && currentSlide < displayHistory.length - itemsPerSlide) {
      setCurrentSlide(currentSlide + 1);
    } else if (direction === 'prev' && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <main className="bg-[#F5F6F5]">
      {/* History Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[#E8F0E6] border-t-2 border-b-2 border-[#D1D7DB]"
        id="history"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-5xl text-[#005C4B] mb-4 mx-auto"
          >
            <IoChatbubblesSharp />
          </motion.div>
          <motion.h2
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-[#005C4B] mb-4"
          >
            {content[language].history.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#005C4B] mb-8"
          >
            {content[language].history.subtitle}
          </motion.p>
          <div className="relative">
            <div className="flex overflow-hidden" ref={sliderRef}>
              <motion.div
                className="flex"
                animate={{ x: `-${currentSlide * (100 / (window.innerWidth >= 768 ? 3 : 1))}%` }}
                transition={{ duration: 0.5 }}
              >
                {displayHistory.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex-shrink-0 w-full md:w-1/3 px-4"
                    whileHover={{ scale: item.isPlaceholder ? 1 : 1.05, boxShadow: item.isPlaceholder ? 'none' : '0 8px 16px rgba(0, 0, 0, 0.1)' }}
                  >
                    <div className="p-6 rounded-xl bg-white shadow-lg border border-[#D1D7DB] h-64 w-full flex flex-col justify-between">
                      <div>
                        <p className={`text-[#005C4B] font-medium ${item.isPlaceholder ? 'opacity-50' : ''}`}>
                          {item.number}
                        </p>
                        <p className={`text-[#005C4B] mt-2 line-clamp-3 ${item.isPlaceholder ? 'opacity-50' : ''}`}>
                          {item.message}
                        </p>
                      </div>
                      {!item.isPlaceholder && (
                        <div className="mt-4 flex space-x-2 justify-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCopy(item)}
                            className="p-2 bg-[#005C4B] text-white rounded-lg"
                            title={content[language].history.copy}
                          >
                            <IoCopyOutline />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleResend(item)}
                            className="p-2 bg-[#005C4B] text-white rounded-lg"
                            title={content[language].history.resend}
                          >
                            <IoSendSharp />
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <div className="flex justify-center space-x-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSlide('prev')}
                className="p-2 bg-[#005C4B] text-white rounded-full disabled:opacity-50"
                disabled={currentSlide === 0}
              >
                <IoChevronBack />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSlide('next')}
                className="p-2 bg-[#005C4B] text-white rounded-full disabled:opacity-50"
                disabled={currentSlide >= displayHistory.length - (window.innerWidth >= 768 ? 3 : 1)}
              >
                <IoChevronForward />
              </motion.button>
            </div>
          </div>
          {history.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0, 92, 75, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearHistory}
              className="mt-8 mx-auto block px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 flex items-center justify-center space-x-2"
            >
              <IoTrashOutline />
              <span>{content[language].history.clear}</span>
            </motion.button>
          )}
        </div>
      </motion.section>

      {/* Guide Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[#F5F6F5] border-b-2 border-[#D1D7DB]"
        id="guide"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-5xl text-[#005C4B] mb-4 mx-auto"
          >
            <IoBookSharp />
          </motion.div>
          <motion.h2
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-[#005C4B] mb-4"
          >
            {content[language].guide.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#005C4B] mb-8"
          >
            {content[language].guide.subtitle}
          </motion.p>
          <ul className="space-y-4 text-left max-w-2xl mx-auto">
            {content[language].guide.steps.map((step, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md border border-[#D1D7DB]"
              >
                <span className="inline-block w-8 h-8 bg-[#005C4B] text-white rounded-full text-center leading-8 font-bold">
                  {index + 1}
                </span>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-2xl text-[#005C4B]"
                >
                  {step.icon}
                </motion.div>
                <p className="text-[#005C4B]">{step.text}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[#E6ECE8]"
        id="about"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-6xl text-[#005C4B] mb-6 mx-auto"
          >
            <IoInformationCircle />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif font-bold text-[#00362E] mb-4"
          >
            {content[language].about.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-[#4A5A56] mb-6 font-light"
          >
            {content[language].about.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base text-[#4A5A56] mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {content[language].about.desc}
          </motion.p>
          <motion.a
            href="https://aibiz.id"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, boxShadow: '0 6px 20px rgba(0, 92, 75, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="inline-block px-8 py-3 bg-[#005C4B] text-white rounded-full font-medium text-sm uppercase tracking-wide hover:bg-[#004238] flex items-center justify-center space-x-2"
          >
            <IoSendSharp />
            <span>{content[language].about.cta}</span>
          </motion.a>
        </div>
      </motion.section>
    </main>
  );
}