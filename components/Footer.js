import { motion } from 'framer-motion';
import { IoLogoWhatsapp, IoMailSharp, IoLocationSharp, IoShieldCheckmarkSharp } from 'react-icons/io5';

const content = {
  id: {
    company: {
      title: 'Aibiz ID',
      desc: 'Kirim pesan WhatsApp tanpa menyimpan nomor dengan mudah, didukung oleh WhatsApp Business API resmi.',
    },
    contact: {
      title: 'Kontak',
      items: [
        { label: 'WhatsApp', value: '+62 877-8761-5432', href: 'https://wa.me/6287787615432', icon: <IoLogoWhatsapp /> },
        { label: 'Email', value: 'support@aibiz.id', href: 'mailto:support@aibiz.id', icon: <IoMailSharp /> },
        { label: 'Alamat', value: 'Alday Group, DI Yogyakarta', href: 'https://maps.app.goo.gl/AToxLtQmpTf9NRGt5', icon: <IoLocationSharp /> },
      ],
    },
    certifications: {
      title: 'Sertifikasi',
      items: [
        {
          title: 'Tech Provider',
          desc: 'Penyedia teknologi resmi untuk solusi WhatsApp.',
          href: '#',
          icon: <IoShieldCheckmarkSharp />,
          key: 'tech',
        },
        {
          title: 'WhatsApp Business API Resmi',
          desc: 'Kami adalah penyedia resmi WhatsApp Business API.',
          href: '#',
          icon: <IoShieldCheckmarkSharp />,
          key: 'api',
        },
      ],
    },
    links: {
      title: 'Tautan',
      items: [
        { label: 'Panduan', href: '#guide' },
        { label: 'Riwayat', href: '#history' },
        { label: 'Tentang', href: '#about' },
        { label: 'Kontak', href: 'https://aibiz.id' },
      ],
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Aibiz ID`,
    },
  },
  en: {
    company: {
      title: 'Aibiz ID',
      desc: 'Send WhatsApp messages without saving numbers easily, powered by the official WhatsApp Business API.',
    },
    contact: {
      title: 'Contact',
      items: [
        { label: 'WhatsApp', value: '+62 877-8761-5432', href: 'https://wa.me/6287787615432', icon: <IoLogoWhatsapp /> },
        { label: 'Email', value: 'support@aibiz.id', href: 'mailto:support@aibiz.id', icon: <IoMailSharp /> },
        { label: 'Address', value: 'Alday Group, DI Yogyakarta', href: 'https://maps.app.goo.gl/AToxLtQmpTf9NRGt5', icon: <IoLocationSharp /> },
      ],
    },
    certifications: {
      title: 'Certifications',
      items: [
        {
          title: 'Tech Provider',
          desc: 'Official technology provider for WhatsApp solutions.',
          href: '#',
          icon: <IoShieldCheckmarkSharp />,
          key: 'tech',
        },
        {
          title: 'Official WhatsApp Business API',
          desc: 'We are an official WhatsApp Business API provider.',
          href: '#',
          icon: <IoShieldCheckmarkSharp />,
          key: 'api',
        },
      ],
    },
    links: {
      title: 'Links',
      items: [
        { label: 'Guide', href: '#guide' },
        { label: 'History', href: '#history' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: 'https://aibiz.id' },
      ],
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Aibiz ID`,
    },
  },
};

export default function Footer({ language }) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-12 px-4 bg-[#1C2526] text-white"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-xl font-semibold mb-4 text-[#F5F6F5]">{content[language].company.title}</h4>
          <p className="text-[#D1D7DB]">{content[language].company.desc}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className="text-xl font-semibold mb-4 text-[#F5F6F5]">{content[language].contact.title}</h4>
          <ul>
            {content[language].contact.items.map((item) => (
              <li key={item.label} className="flex items-center mb-3">
                <motion.span
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  className="text-[#005C4B] mr-2"
                >
                  {item.icon}
                </motion.span>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D1D7DB] hover:text-[#005C4B] transition-colors"
                >
                  {item.value}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h4 className="text-xl font-semibold mb-4 text-[#F5F6F5]">{content[language].certifications.title}</h4>
          <ul>
            {content[language].certifications.items.map((cert) => (
              <li key={cert.key} className="mb-3">
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#D1D7DB] hover:text-[#005C4B] transition-colors"
                >
                  <motion.span
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    className="text-[#005C4B] mr-2"
                  >
                    {cert.icon}
                  </motion.span>
                  <div>
                    <p className="font-medium">{cert.title}</p>
                    <p className="text-sm">{cert.desc}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h4 className="text-xl font-semibold mb-4 text-[#F5F6F5]">{content[language].links.title}</h4>
          <ul>
            {content[language].links.items.map((link) => (
              <li key={link.label} className="mb-3">
                <a
                  href={link.href}
                  className="text-[#D1D7DB] hover:text-[#005C4B] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-8 text-center text-[#D1D7DB]"
      >
        {content[language].footer.copyright}
      </motion.p>
    </motion.footer>
  );
}