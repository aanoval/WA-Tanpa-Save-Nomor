import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { IoCopyOutline, IoTrashOutline, IoSendSharp, IoChevronBack, IoChevronForward, IoChatbubblesSharp, IoBookSharp, IoInformationCircle, IoPeopleSharp, IoTimeSharp, IoShieldCheckmarkSharp, IoLogoWhatsapp } from 'react-icons/io5';

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
      achievements: {
        title: 'Pencapaian Kami',
        items: [
          {
            title: 'Ratusan Klien',
            desc: 'Dipercaya oleh ratusan bisnis untuk solusi komunikasi.',
            icon: <IoPeopleSharp />,
          },
          {
            title: 'Uptime 99%',
            desc: 'Layanan stabil dengan uptime hampir sempurna.',
            icon: <IoTimeSharp />,
          },
          {
            title: 'Tech Provider Terverifikasi',
            desc: 'Penyedia teknologi resmi untuk solusi WhatsApp.',
            icon: <IoShieldCheckmarkSharp />,
          },
          {
            title: 'API WhatsApp Resmi',
            desc: 'Penyedia resmi WhatsApp Business API.',
            icon: <IoLogoWhatsapp />,
          },
        ],
      },
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
      achievements: {
        title: 'Our Achievements',
        items: [
          {
            title: 'Hundreds of Clients',
            desc: 'Trusted by hundreds of businesses for communication solutions.',
            icon: <IoPeopleSharp />,
          },
          {
            title: '99% Uptime',
            desc: 'Stable service with near-perfect uptime.',
            icon: <IoTimeSharp />,
          },
          {
            title: 'Verified Tech Provider',
            desc: 'Official technology provider for WhatsApp solutions.',
            icon: <IoShieldCheckmarkSharp />,
          },
          {
            title: 'Official WhatsApp API',
            desc: 'Official WhatsApp Business API provider.',
            icon: <IoLogoWhatsapp />,
          },
        ],
      },
    },
  },
};

export default function MainContent({ language }) {
  const [history, setHistory] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const sliderRef = useRef(null);

  // Initialize 10 placeholder history items
  const placeholderHistory = Array(10).fill().map((_, index) => ({
    id: `placeholder-${index}`,
    number: content[language].history.noHistory,
    message: content[language].history.noHistory,
    timestamp: new Date().toISOString(),
    isPlaceholder: true,
  }));

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // History Storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHistory = localStorage.getItem('waHistory');
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory).slice(0, 10);
        setHistory(parsedHistory);
        if (parsedHistory.length < 4) {
          setCurrentSlide(Math.floor(parsedHistory.length / 2));
        }
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
    if (item.isPlaceholder || typeof window === 'undefined') return;
    const countryCode = item.number.slice(0, item.number.length - 10);
    const phone = item.number.slice(-10);
    window.dispatchEvent(new CustomEvent('resendMessage', { detail: { countryCode, phone, message: item.message } }));
  };

  const handleClearHistory = () => {
    if (typeof window !== 'undefined') {
      setHistory([]);
      localStorage.removeItem('waHistory');
      setCurrentSlide(0);
    }
  };

  const handleSlide = (direction) => {
    const itemsPerSlide = isClient && typeof window !== 'undefined' && window.innerWidth >= 768 ? 3 : 1;
    if (direction === 'next' && currentSlide < displayHistory.length - itemsPerSlide) {
      setCurrentSlide(currentSlide + 1);
    } else if (direction === 'prev' && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <main className="bg-[var(--whatsapp-cream)]">
      {/* History Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="py-16 px-4 bg-[var(--whatsapp-cream)] text-[var(--whatsapp-dark-green)]"
        id="history"
      >
        <div className="container">
          <div className="text-center mb-12">
            <motion.div
              className="chat-bubble mx-auto text-4xl mb-4"
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              <IoChatbubblesSharp />
            </motion.div>
            <h2 className="section-heading">{content[language].history.title}</h2>
            <p className="section-subheading">{content[language].history.subtitle}</p>
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${currentSlide * (100 / (isClient && typeof window !== 'undefined' && window.innerWidth >= 768 ? 3 : 1))}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {displayHistory.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex-shrink-0 w-full md:w-1/3 px-4"
                    whileHover={{ scale: item.isPlaceholder ? 1 : 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="card h-64 flex flex-col justify-between">
                      <div>
                        <p className={`font-semibold text-[var(--whatsapp-dark-green)] ${item.isPlaceholder ? 'opacity-50' : ''}`}>
                          {item.number}
                        </p>
                        <p className={`mt-2 text-sm text-[var(--whatsapp-dark-green)] line-clamp-3 ${item.isPlaceholder ? 'opacity-50' : ''}`}>
                          {item.message}
                        </p>
                      </div>
                      {!item.isPlaceholder && (
                        <div className="mt-4 flex space-x-3 justify-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCopy(item)}
                            className="p-2 bg-[var(--whatsapp-dark-green)] text-white rounded-full hover:bg-[#004238]"
                            title={content[language].history.copy}
                          >
                            <IoCopyOutline />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleResend(item)}
                            className="p-2 bg-[var(--whatsapp-dark-green)] text-white rounded-full hover:bg-[#004238]"
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
            <div className="flex justify-center space-x-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSlide('prev')}
                className="p-3 bg-[var(--whatsapp-dark-green)] text-white rounded-full disabled:opacity-50"
                disabled={currentSlide === 0}
              >
                <IoChevronBack />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSlide('next')}
                className="p-3 bg-[var(--whatsapp-dark-green)] text-white rounded-full disabled:opacity-50"
                disabled={currentSlide >= displayHistory.length - (isClient && typeof window !== 'undefined' && window.innerWidth >= 768 ? 3 : 1)}
              >
                <IoChevronForward />
              </motion.button>
            </div>
          </div>
          {history.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearHistory}
              className="btn-primary mt-8 mx-auto flex items-center space-x-2"
            >
              <IoTrashOutline />
              <span>{content[language].history.clear}</span>
            </motion.button>
          )}
        </div>
      </motion.section>

      {/* Guide Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="py-16 px-4 pattern-usecases text-white"
        id="guide"
      >
        <div className="container">
          <div className="text-center mb Ární12">
            <motion.div
              className="chat-bubble mx-auto text-4xl mb-4"
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              <IoBookSharp />
            </motion.div>
            <h2 className="section-heading">{content[language].guide.title}</h2>
            <p className="section-subheading">{content[language].guide.subtitle}</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {content[language].guide.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card flex items-start space-x-4"
              >
                <span className="flex-shrink-0 w-10 h-10 bg-[var(--whatsapp-dark-green)] text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <div className="text-2xl text-[var(--whatsapp-dark-green)]">{step.icon}</div>
                <p className="text-[var(--whatsapp-dark-green)]">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

 {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="py-16 px-4 bg-gradient-to-br from-[var(--contact-gradient-start)] to-[var(--contact-gradient-end)]"
        id="about"
      >
        <div className="container text-center">
          <motion.div
            className="chat-bubble mx-auto text-5xl mb-6"
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <IoInformationCircle />
          </motion.div>
          <h2 className="section-heading text-4xl">{content[language].about.title}</h2>
          <p className="section-subheading font-light">{content[language].about.subtitle}</p>
          <p className="mt-6 text-base text-[var(--whatsapp-dark-green)] max-w-2xl mx-auto leading-relaxed">
            {content[language].about.desc}
          </p>
          <motion.a
            href="https://aibiz.id"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary mt-8 inline-flex items-center space-x-2"
          >
            <IoSendSharp />
            <span>{content[language].about.cta}</span>
          </motion.a>
          {/* Achievements Component */}
          <div className="mt-16">
            <h3 className="section-heading text-3xl">{content[language].about.achievements.title}</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-8 mt-8 max-w-5xl mx-auto">
              {content[language].about.achievements.items.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className="chat-bubble text-6xl text-[var(--whatsapp-dark-green)]"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  >
                    {achievement.icon}
                  </motion.div>
                  <p className="mt-4 text-sm text-[var(--whatsapp-dark-green)] max-w-[150px]">{achievement.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}