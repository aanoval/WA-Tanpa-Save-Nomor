import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import Link from 'next/link';
import countryList from 'react-select-country-list';

export default function Header({ language, toggleLanguage, scrolled }) {
  const content = {
    id: {
      cta: 'Mulai Sekarang',
      form: {
        title: 'Kirim Pesan WhatsApp',
        subtitle: 'Masukkan nomor dan pesan untuk kirim langsung.',
        countryCode: 'Kode Telepon',
        phone: 'Nomor Telepon',
        message: 'Pesan Anda',
        send: 'Kirim Pesan',
        error: 'Harap isi semua kolom dengan benar.',
        invalidPhone: 'Nomor telepon hanya boleh berisi angka.',
      },
    },
    en: {
      cta: 'Get Started',
      form: {
        title: 'Send WhatsApp Message',
        subtitle: 'Enter number and message to send directly.',
        countryCode: 'Phone Code',
        phone: 'Phone Number',
        message: 'Your Message',
        send: 'Send Message',
        error: 'Please fill in all fields correctly.',
        invalidPhone: 'Phone number must contain only digits.',
      },
    },
  };

  const [formData, setFormData] = useState({ countryCode: '62', phone: '', message: '' });
  const [formError, setFormError] = useState('');
  const canvasRef = useRef(null);
  const countries = countryList().getData().map(country => ({
    ...country,
    value: country.value.replace('+', ''),
  }));

  // Bubble Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let bubbles = [];
    let mouseX = 0;
    let mouseY = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createBubble = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 50,
      radius: Math.random() * 20 + 10,
      speed: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 2,
      color: `rgba(76, 175, 80, ${Math.random() * 0.5 + 0.3})`,
    });

    const initBubbles = () => {
      bubbles = [];
      for (let i = 0; i < 20; i++) {
        bubbles.push(createBubble());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.forEach((bubble) => {
        const distX = mouseX - bubble.x;
        const distY = mouseY - bubble.y;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < 100) {
          bubble.dx += distX * 0.02;
          bubble.dy = -bubble.speed + distY * 0.02;
        } else {
          bubble.dy = -bubble.speed;
        }

        bubble.x += bubble.dx;
        bubble.y += bubble.dy;

        if (bubble.y < -bubble.radius) {
          bubble.y = canvas.height + bubble.radius;
          bubble.x = Math.random() * canvas.width;
          bubble.dx = (Math.random() - 0.5) * 2;
        }

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    initBubbles();
    animate();

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    if (id === 'phone') {
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
    const fullNumber = `${countryCode}${phone}`;
    const encodedMessage = encodeURIComponent(message);
    const newHistory = {
      id: Date.now(),
      number: fullNumber,
      message,
      timestamp: new Date().toISOString(),
    };
    const existingHistory = JSON.parse(localStorage.getItem('waHistory') || '[]');
    const updatedHistory = [newHistory, ...existingHistory].slice(0, 10);
    localStorage.setItem('waHistory', JSON.stringify(updatedHistory));
    window.open(
      `https://api.whatsapp.com/send/?phone=${fullNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`,
      '_blank'
    );
    setFormData({ countryCode: '62', phone: '', message: '' });
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`min-h-[80vh] relative flex flex-col pt-20 px-4 bg-gradient-to-br from-[#005C4B] to-[#4CAF50] text-white ${scrolled ? 'shadow-md' : ''}`}
      id="form"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <nav
        className={`fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center ${scrolled ? 'bg-[#4CAF50]/90 backdrop-blur-md' : 'bg-transparent'}`}
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
      </nav>
      <div className="relative z-10 max-w-md mx-auto text-center bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 mt-16">
        <motion.h2
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {content[language].form.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-base mb-6"
        >
          {content[language].form.subtitle}
        </motion.p>
        <div className="space-y-4">
          <div>
            <label htmlFor="countryCode" className="block text-left font-medium mb-1 text-sm">
              {content[language].form.countryCode}
            </label>
            <select
              id="countryCode"
              value={formData.countryCode}
              onChange={handleCountryChange}
              className="w-full p-2 bg-white/90 border border-[#D1D7DB] rounded-lg shadow-sm text-[#005C4B] text-sm focus:ring-2 focus:ring-[#005C4B] transition-all duration-300"
            >
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label} ({country.value})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="phone" className="block text-left font-medium mb-1 text-sm">
              {content[language].form.phone}
            </label>
            <input
              type="text"
              id="phone"
              value={formData.phone}
              onChange={handleFormChange}
              placeholder={content[language].form.phone}
              className="w-full p-2 bg-white/90 border border-[#D1D7DB] rounded-lg shadow-sm text-[#005C4B] text-sm focus:ring-2 focus:ring-[#005C4B] transition-all duration-300"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-left font-medium mb-1 text-sm">
              {content[language].form.message}
            </label>
            <textarea
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleFormChange}
              placeholder={content[language].form.message}
              className="w-full p-2 bg-white/90 border border-[#D1D7DB] rounded-lg shadow-sm text-[#005C4B] text-sm focus:ring-2 focus:ring-[#005C4B] transition-all duration-300 max-h-32 overflow-y-auto"
            ></textarea>
          </div>
          {formError && <p className="text-red-300 text-sm">{formError}</p>}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0, 92, 75, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFormSubmit}
            className="w-full px-4 py-2 bg-[#005C4B] text-white rounded-lg font-medium text-sm hover:bg-[#004238] flex items-center justify-center space-x-2"
          >
            <IoSendSharp />
            <span>{content[language].form.send}</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}