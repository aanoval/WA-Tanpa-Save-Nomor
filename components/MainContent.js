import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { IoCopyOutline, IoTrashOutline, IoSendSharp, IoChevronBack, IoChevronForward, IoChatbubblesSharp, IoBookSharp, IoInformationCircle, IoLogoVercel, IoLogoReact, IoLogoNodejs, IoLogoJavascript, IoLogoGithub, IoLogoWhatsapp, IoLogoHtml5, IoLogoCss3 } from 'react-icons/io5';
import { SiNextdotjs, SiTailwindcss } from 'react-icons/si';

const content = {
  id: {
    history: {
      title: 'Riwayat Pesan',
      subtitle: 'Lihat hingga 10 pesan terakhir yang Anda kirim.',
      noHistory: 'Belum ada pesan.',
      copy: 'Salin',
      copyNumber: 'Salin Nomor',
      copyMessage: 'Salin Pesan',
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
      poweredBy: {
        title: 'Didukung Oleh',
      },
    },
  },
  en: {
    history: {
      title: 'Message History',
      subtitle: 'View up to 10 recent messages you sent.',
      noHistory: 'No messages yet.',
      copy: 'Copy',
      copyNumber: 'Copy Number',
      copyMessage: 'Copy Message',
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
      poweredBy: {
        title: 'Powered By',
      },
    },
  },
};

// Tech stack icons for the carousel
const techStack = [
  { icon: <IoLogoWhatsapp />, name: 'WhatsApp' },
  { icon: <SiNextdotjs />, name: 'Next.js' },
  { icon: <IoLogoVercel />, name: 'Vercel' },
  { icon: <IoLogoReact />, name: 'React' },
  { icon: <SiTailwindcss />, name: 'Tailwind CSS' },
  { icon: <IoLogoNodejs />, name: 'Node.js' },
  { icon: <IoLogoJavascript />, name: 'JavaScript' },
  { icon: <IoLogoGithub />, name: 'GitHub' },
  { icon: <IoLogoHtml5 />, name: 'HTML5' },
  { icon: <IoLogoCss3 />, name: 'CSS3' },
];

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
    // Prompt user to choose what to copy
    const choice = prompt(
      language === 'id'
        ? 'Pilih yang ingin disalin:\n1. Nomor\n2. Pesan'
        : 'Choose what to copy:\n1. Number\n2. Message'
    );
    if (choice === '1') {
      navigator.clipboard.writeText(item.number);
      alert(language === 'id' ? 'Nomor disalin ke clipboard!' : 'Number copied to clipboard!');
    } else if (choice === '2') {
      navigator.clipboard.writeText(item.message);
      alert(language === 'id' ? 'Pesan disalin ke clipboard!' : 'Message copied to clipboard!');
    }
  };

  const handleResend = (item) => {
    if (item.isPlaceholder || typeof window === 'undefined') return;
    // Extract country code and phone number
    const countryCode = item.number.match(/^\+(\d+)/)?.[1] || '62';
    const phone = item.number.replace(/^\+\d+/, '');
    // Dispatch event to populate form
    window.dispatchEvent(
      new CustomEvent('resendMessage', {
        detail: { countryCode, phone, message: item.message },
      })
    );
    // Scroll to form
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
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
          <div className="text-center mb-12">
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
        className="py-16 px-4 bg-gradient-to-br from-[var(--contact-gradient-start)] to-[var(--contact-gradient-end)] relative z-10"
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
          {/* Powered By Carousel */}
          <div className="mt-16 mb-12">
            <h3 className="section-heading text-3xl">{content[language].about.poweredBy.title}</h3>
            <div className="overflow-hidden mt-8 relative">
              <motion.div
                className="flex"
                animate={isClient ? { x: ['0%', '-100%'] } : { x: '0%' }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 30,
                    ease: 'linear',
                  },
                }}
              >
                {[...techStack, ...techStack].map((tech, index) => (
                  <div
                    key={`${tech.name}-${index}`}
                    className="flex-shrink-0 w-1/3 md:w-1/5 flex flex-col justify-center items-center px-6"
                  >
                    <motion.div
                      className="chat-bubble text-6xl text-[var(--whatsapp-dark-green)] mb-2"
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    >
                      {tech.icon}
                    </motion.div>
                    <span className="text-sm text-[var(--whatsapp-dark-green)]">{tech.name}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}