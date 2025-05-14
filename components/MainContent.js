import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { IoCopyOutline, IoTrashOutline, IoSendSharp } from 'react-icons/io5';
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
    },
    history: {
      title: 'Riwayat Pesan',
      subtitle: 'Lihat hingga 10 pesan terakhir yang Anda kirim.',
      noHistory: 'Belum ada riwayat pesan.',
      copy: 'Salin',
      resend: 'Kirim Ulang',
      clear: 'Hapus Riwayat',
    },
    guide: {
      title: 'Panduan Penggunaan',
      subtitle: 'Ikuti langkah-langkah berikut untuk mengirim pesan tanpa menyimpan nomor:',
      steps: [
        'Pilih kode negara dari dropdown (default: +62 untuk Indonesia).',
        'Masukkan nomor telepon tujuan tanpa kode negara (contoh: 87787615432).',
        'Tulis pesan yang ingin Anda kirim di kolom pesan.',
        'Klik "Kirim Pesan" untuk membuka WhatsApp dengan nomor dan pesan yang diisi.',
        'Riwayat pesan Anda akan disimpan secara lokal dan dapat dilihat di bagian riwayat.',
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
    form: {
      title: 'Send WhatsApp Message Without Saving Number',
      subtitle: 'Enter the destination number and message, then send directly via.Concurrent WhatsApp.',
      countryCode: 'Country Code',
      phone: 'Phone Number',
      message: 'Your Message',
      cta: 'Send Message',
      error: 'Please fill in all fields correctly.',
    },
    history: {
      title: 'Message History',
      subtitle: 'View up to 10 recent messages you sent.',
      noHistory: 'No message history yet.',
      copy: 'Copy',
      resend: 'Resend',
      clear: 'Clear History',
    },
    guide: {
      title: 'Usage Guide',
      subtitle: 'Follow these steps to send messages without saving the number:',
      steps: [
        'Select the country code from the dropdown (default: +62 for Indonesia).',
        'Enter the destination phone number without the country code (e.g., 87787615432).',
        'Write the message you want to send in the message field.',
        'Click "Send Message" to open WhatsApp with the number and message filled in.',
        'Your message history will be saved locally and can be viewed in the history section.',
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
  const [formData, setFormData] = useState({ countryCode: '+62', phone: '', message: '' });
  const [formError, setFormError] = useState('');
  const [history, setHistory] = useState([]);
  const countries = countryList().getData();

  useEffect(() => {
    const savedHistory = localStorage.getItem('waHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory).slice(0, 10));
    }
  }, []);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
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
      setFormError(language === 'id' ? 'Nomor telepon hanya boleh berisi angka.' : 'Phone number must contain only digits.');
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
  };

  return (
    <main className="bg-[#F5F6F5]">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-16 px-4 bg-gradient-to-br from-[#005C4B] to-[#4CAF50] text-white"
      >
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content[language].form.title}</h2>
          <p className="text-lg mb-8">{content[language].form.subtitle}</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="countryCode" className="block text-left font-medium mb-1">
                {content[language].form.countryCode}
              </label>
              <select
                id="countryCode"
                value={formData.countryCode}
                onChange={handleCountryChange}
                className="w-full p-3 bg-white border border-[#D1D7DB] rounded-lg shadow-sm text-[#005C4B]"
              >
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label} ({country.value})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="phone" className="block text-left font-medium mb-1">
                {content[language].form.phone}
              </label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleFormChange}
                placeholder={content[language].form.phone}
                className="w-full p-3 bg-white border border-[#D1D7DB] rounded-lg shadow-sm text-[#005C4B]"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-left font-medium mb-1">
                {content[language].form.message}
              </label>
              <textarea
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleFormChange}
                placeholder={content[language].form.message}
                className="w-full p-3 bg-white border border-[#D1D7DB] rounded-lg shadow-sm text-[#005C4B]"
              ></textarea>
            </div>
            {formError && <p className="text-red-300">{formError}</p>}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFormSubmit}
              className="w-full px-6 py-3 bg-[#005C4B] text-white rounded-lg font-medium hover:bg-[#004238]"
            >
              {content[language].form.cta}
            </motion.button>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 px-4 bg-[#F5F6F5]"
        id="history"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#005C4B] mb-4">
            {content[language].history.title}
          </h2>
          <p className="text-lg text-center text-[#005C4B] mb-8">{content[language].history.subtitle}</p>
          {history.length === 0 ? (
            <p className="text-center text-[#005C4B]">{content[language].history.noHistory}</p>
          ) : (
            <div className="overflow-hidden">
              <div className="flex animate-slide">
                {[...history, ...history].map((item, index) => (
                  <motion.div
                    key={`${item.id}-${index}`}
                    className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 px-4"
                  >
                    <div className="p-6 rounded-lg bg-white shadow-md border border-[#D1D7DB]">
                      <p className="text-[#005C4B] font-medium">+{item.number}</p>
                      <p className="text-[#005C4B] mt-2 truncate">{item.message}</p>
                      <div className="mt-4 flex space-x-2">
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
              </div>
            </div>
          )}
          {history.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearHistory}
              className="mt-8 mx-auto block px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
            >
              {content[language].history.clear}
            </motion.button>
          )}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 px-4 bg-[#F5F6F5]"
        id="guide"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#005C4B] mb-4">
            {content[language].guide.title}
          </h2>
          <p className="text-lg text-center text-[#005C4B] mb-8">{content[language].guide.subtitle}</p>
          <ul className="list-decimal pl-6 text-[#005C4B]">
            {content[language].guide.steps.map((step, index) => (
              <li key={index} className="mb-2">
                {step}
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 px-4 bg-gradient-to-br from-[#A5D6A7] to-[#FFFFFF] text-[#005C4B]"
        id="about"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content[language].about.title}</h2>
          <p className="text-lg mb-4">{content[language].about.subtitle}</p>
          <p className="text-[#005C4B] mb-8">{content[language].about.desc}</p>
          <motion.a
            href="https://aibiz.id"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-3 bg-[#005C4B] text-white rounded-lg font-medium hover:bg-[#004238]"
          >
            {content[language].about.cta}
          </motion.a>
        </div>
      </motion.section>
    </main>
  );
}