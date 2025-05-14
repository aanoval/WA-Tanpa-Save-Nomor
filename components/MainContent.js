import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { IoCopyOutline, IoTrashOutline, IoSendSharp, IoChevronBack, IoChevronForward, IoChatbubblesSharp, IoBookSharp, IoInformationCircle } from 'react-icons/io5';

const content = {
  id: {
    history: {
      title: 'Riwayat Pesan',
      subtitle: 'Lihat hingga 10 pesan terakhir yang Anda kirim.',
      noHistory: 'Belum ada riwayat pesan.',
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
      subtitle: 'Aibiz ID adalah penyedia resmi WhatsApp Business Platform.',
      desc: 'Kami membantu bisnis mengotomatiskan komunikasi pelanggan melalui WhatsApp dengan solusi AI cerdas. Layanan kami mencakup Agent AI WhatsApp untuk pelayanan pelanggan, pemesanan otomatis, dan integrasi mudah dengan nomor bisnis Anda. Sebagai penyedia resmi WhatsApp Business API, kami memastikan solusi yang aman dan terpercaya untuk kebutuhan bisnis Anda.',
      cta: 'Pelajari Lebih Lanjut',
    },
  },
  en: {
    history: {
      title: 'Message History',
      subtitle: 'View up to 10 recent messages you sent.',
      noHistory: 'No message history yet.',
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
      subtitle: 'Aibiz ID is an official WhatsApp Business Platform provider.',
      desc: 'We help businesses automate customer communication via WhatsApp with smart AI solutions. Our services include WhatsApp AI Agent for customer service, automated ordering, and easy integration with your business number. As an official WhatsApp Business API provider, we ensure secure and reliable solutions for your business needs.',
      cta: 'Learn More',
    },
  },
};

export default function MainContent({ language }) {
  const [history, setHistory] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

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

  const handleCopy = (item) => {
    navigator.clipboard.writeText(`Number: ${item.number}\nMessage: ${item.message}`);
    alert(language === 'id' ? 'Teks disalin ke clipboard!' : 'Text copied to clipboard!');
  };

  const handleResend = (item) => {
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
    if (direction === 'next' && currentSlide < history.length - (window.innerWidth >= 768 ? 3 : 1)) {
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
        className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[#F5F6F5]"
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
          {history.length === 0 ? (
            <p className="text-[#005C4B]">{content[language].history.noHistory}</p>
          ) : (
            <div className="relative">
              <div className="flex overflow-hidden" ref={sliderRef}>
                <motion.div
                  className="flex"
                  animate={{ x: `-${currentSlide * (100 / (window.innerWidth >= 768 ? 3 : 1))}%` }}
                  transition={{ duration: 0.5 }}
                >
                  {history.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex-shrink-0 w-full md:w-1/3 px-4"
                      whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
                    >
                      <div className="p-6 rounded-xl bg-white shadow-lg border border-[#D1D7DB] h-64 w-full flex flex-col justify-between">
                        <div>
                          <p className="text-[#005C4B] font-medium">{item.number}</p>
                          <p className="text-[#005C4B] mt-2 line-clamp-3">{item.message}</p>
                        </div>
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
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              {history.length > (window.innerWidth >= 768 ? 3 : 1) && (
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
                    disabled={currentSlide >= history.length - (window.innerWidth >= 768 ? 3 : 1)}
                  >
                    <IoChevronForward />
                  </motion.button>
                </div>
              )}
            </div>
          )}
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
        className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[#F5F6F5]"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content[language].guide.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 rounded-xl bg-white shadow-lg border border-[#D1D7DB] flex items-start space-x-4"
              >
                <div className="flex-shrink-0">
                  <span className="inline-block w-8 h-8 bg-[#005C4B] text-white rounded-full text-center leading-8 font-bold">
                    {index + 1}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-3xl text-[#005C4B]"
                  >
                    {step.icon}
                  </motion.div>
                  <p className="text-[#005C4B]">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[#F5F6F5]"
        id="about"
      >
        <div className="max-w-lg mx-auto text-center bg-white/90 rounded-xl shadow-2xl p-8">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-6xl text-[#005C4B] mb-6 mx-auto"
          >
            <IoInformationCircle />
          </motion.div>
          <motion.h2
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-[#005C4B] mb-4"
          >
            {content[language].about.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#005C4B] mb-4"
          >
            {content[language].about.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#005C4B] mb-8"
          >
            {content[language].about.desc}
          </motion.p>
          <motion.a
            href="https://aibiz.id"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0, 92, 75, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-3 bg-[#005C4B] text-white rounded-lg font-medium hover:bg-[#004238] flex items-center justify-center space-x-2"
          >
            <IoSendSharp />
            <span>{content[language].about.cta}</span>
          </motion.a>
        </div>
      </motion.section>
    </main>
  );
}