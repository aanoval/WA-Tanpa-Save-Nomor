import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { IoCopyOutline, IoTrashOutline, IoSendSharp, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import countryList from 'react-select-country-list';

const content = {
  id: {
    form: {
      title: 'Kirim Pesan WhatsApp Tanpa Simpan Nomor',
      subtitle: 'Masukkan nomor tujuan dan pesan, lalu kirim langsung via WhatsApp.',
      countryCode: 'Kode Negara',
      phone: 'Nomor Telepon',
      message: 'Pesan Anda',
      cta: 'Kirim Pesan',
      error: 'Harap isi semua kolom dengan benar.',
      invalidPhone: 'Nomor telepon hanya boleh berisi angka.',
    },
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
        { text: 'Pilih kode negara dari dropdown (default: +62 untuk Indonesia).', icon: <IoSendSharp /> },
        { text: 'Masukkan nomor telepon tujuan tanpa kode negara (contoh: 87787615432).', icon: <IoSendSharp /> },
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
      icon: <IoSendSharp />,
    },
  },
  en: {
    form: {
      title: 'Send WhatsApp Message Without Saving Number',
      subtitle: 'Enter the destination number and message, then send directly via WhatsApp.',
      countryCode: 'Country Code',
      phone: 'Phone Number',
      message: 'Your Message',
      cta: 'Send Message',
      error: 'Please fill in all fields correctly.',
      invalidPhone: 'Phone number must contain only digits.',
    },
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
        { text: 'Select the country code from the dropdown (default: +62 for Indonesia).', icon: <IoSendSharp /> },
        { text: 'Enter the destination phone number without the country code (e.g., 87787615432).', icon: <IoSendSharp /> },
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
      icon: <IoSendSharp />,
    },
  },
};

export default function MainContent({ language }) {
  const [formData, setFormData] = useState({ countryCode: '+62', phone: '', message: '' });
  const [formError, setFormError] = useState('');
  const [history, setHistory] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const countries = countryList().getData();

  useEffect(() => {
    const savedHistory = localStorage.getItem('waHistory');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory).slice(0, 10);
      setHistory(parsedHistory);
      // Center slide if history is less than 4
      if (parsedHistory.length < 4) {
        setCurrentSlide(Math.floor(parsedHistory.length / 2));
      }
    }
  }, []);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    if (id === 'phone') {
      // Remove leading zeros
      const cleanedValue = value.replace(/^0+/, '');
      setFormData((prev) => ({ ...prev, [id]: cleanedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
    setFormError('');
  };

  const handleCountryChange = (e) => {
    setFormData((prev) => ({ ...prev, countryCode: e.target.value }));
    setFormError('');
  };

  const handleFormSubmit = () => {
    const { countryCode, phone, message } = formData;
    if (!phone || !message || !countryCode) {
      setFormError(content[language].form.error);
      return;
    }
    if (!/^\d+$/.test(phone)) {
      setFormError(content[language].form.invalidPhone);
      return;
    }
    const fullNumber = `${countryCode}${phone}`.replace('+', '');
    const waMessage = encodeURIComponent(message);
    const newHistory = {
      id: Date.now(),
      number: fullNumber,
      message,
      timestamp: new Date().toISOString(),
    };
    const updatedHistory = [newHistory, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem('waHistory', JSON.stringify(updatedHistory));
    // Open WhatsApp API (web or mobile)
    window.open(`https://wa.me/${fullNumber}?text=${waMessage}`, '_blank');
    setFormData({ countryCode: '+62', phone: '', message: '' });
  };

  const handleCopy = (item) => {
    navigator.clipboard.writeText(`Number: ${item.number}\nMessage: ${item.message}`);
    alert(language === 'id' ? 'Teks disalin ke clipboard!' : 'Text copied to clipboard!');
  };

  const handleResend = (item) => {
    const countryCode = item.number.slice(0, item.number.length - 10).replace(/^(\d+)/, '+$1');
    const phone = item.number.slice(-10);
    setFormData({ countryCode, phone, message: item.message });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('waHistory');
    setCurrentSlide(0);
  };

  const handleSlide = (direction) => {
    if (direction === 'next' && currentSlide < history.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (direction === 'prev' && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <main className="bg-[#F5F6F5]">
      {/* Hero Form Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-[80vh] flex items-center justify-center pt-20 px-4 bg-gradient-to-br from-[#005C4B] to-[#4CAF50] text-white pattern-usecases"
        id="form"
      >
        <div className="max-w-lg mx-auto text-center bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-8">
          <motion.h2
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {content[language].form.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg mb-8"
          >
            {content[language].form.subtitle}
          </motion.p>
          <div className="space-y-6">
            <div>
              <label htmlFor="countryCode" className="block text-left font-medium mb-2">
                {content[language].form.countryCode}
              </label>
              <select
                id="countryCode"
                value={formData.countryCode}
                onChange={handleCountryChange}
                className="w-full p-3 bg-white/90 border border-[#D1D7DB] rounded-lg shadow-sm text-[#005C4B] focus:ring-2 focus:ring-[#005C4B] transition-all"
              >
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label} ({country.value})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="phone" className="block text-left font-medium mb-2">
                {content[language].form.phone}
              </label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleFormChange}
                placeholder={content[language].form.phone}
                className="w-full p-3 bg-white/90 border border-[#D1D7DB] rounded-lg shadow-sm text-[#005C4B] focus:ring-2 focus:ring-[#005C4B] transition-all"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-left font-medium mb-2">
                {content[language].form.message}
              </label>
              <textarea
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleFormChange}
                placeholder={content[language].form.message}
                className="w-full p-3 bg-white/90 border border-[#D1D7DB] rounded-lg shadow-sm text-[#005C4B] focus:ring-2 focus:ring-[#005C4B] transition-all"
              ></textarea>
            </div>
            {formError && <p className="text-red-300">{formError}</p>}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0, 92, 75, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFormSubmit}
              className="w-full px-6 py-3 bg-[#005C4B] text-white rounded-lg font-medium hover:bg-[#004238] flex items-center justify-center space-x-2"
            >
              <IoSendSharp />
              <span>{content[language].form.cta}</span>
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* History Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="min-h-[80vh] flex items-center justify-center py-16 px-4 bg-[#F5F6F5] pattern-contact"
        id="history"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-[#005C4B] mb-4"
          >
            {content[language].history.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#005C4B] mb-8"
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
                  animate={{ x: `-${currentSlide * (100 / Math.min(history.length, 3))}%` }}
                  transition={{ duration: 0.5 }}
                >
                  {history.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 px-4"
                      whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
                    >
                      <div className="p-6 rounded-xl bg-white shadow-lg border border-[#D1D7DB] min-h-[200px] flex flex-col justify-between">
                        <div>
                          <p className="text-[#005C4B] font-medium">+{item.number}</p>
                          <p className="text-[#005C4B] mt-2 truncate">{item.message}</p>
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
              {history.length > 3 && (
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
                    disabled={currentSlide >= history.length - 3}
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
        className="min-h-[80vh] flex items-center justify-center py-16 px-4 bg-gradient-to-br from-[#A5D6A7] to-[#FFFFFF] pattern-usecases"
        id="guide"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-[#005C4B] mb-4"
          >
            {content[language].guide.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#005C4B] mb-8"
          >
            {content[language].guide.subtitle}
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content[language].guide.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 rounded-xl bg-white shadow-lg border border-[#D1D7DB] flex items-start space-x-4"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-3xl text-[#005C4B]"
                >
                  {step.icon}
                </motion.div>
                <p className="text-[#005C4B]">{step.text}</p>
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
        className="min-h-[80vh] flex items-center justify-center py-16 px-4 bg-[#F5F6F5] pattern-contact"
        id="about"
      >
        <div className="max-w-lg mx-auto text-center bg-white/90 rounded-xl shadow-xl p-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-5xl text-[#005C4B] mb-6 mx-auto"
          >
            {content[language].about.icon}
          </motion.div>
          <motion.h2
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-[#005C4B] mb-4"
          >
            {content[language].about.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#005C4B] mb-4"
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