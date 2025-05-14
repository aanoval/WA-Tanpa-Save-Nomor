import { motion } from 'framer-motion';
import { IoLogoWhatsapp, IoMailSharp, IoLocationSharp } from 'react-icons/io5';

const content = {
  id: {
    company: {
      title: 'Aibiz ID',
      desc: 'Kirim pesan WhatsApp tanpa menyimpan nomor, didukung oleh platform resmi WhatsApp Business API.',
    },
    contact: {
      title: 'Kontak',
      items: [
        { label: 'WhatsApp', value: '+62 877-8761-5432', href: 'https://wa.me/6287787615432', icon: <IoLogoWhatsapp /> },
        { label: 'Email', value: 'support@aibiz.id', href: 'mailto:support@aibiz.id', icon: <IoMailSharp /> },
        { label: 'Alamat', value: 'Alday Group, DI Yogyakarta', href: 'https://maps.app.goo.gl/AToxLtQmpTf9NRGt5', icon: <IoLocationSharp /> },
      ],
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Aibiz ID`,
    },
  },
  en: {
    company: {
      title: 'Aibiz ID',
      desc: 'Send WhatsApp messages without saving numbers, powered by the official WhatsApp Business API platform.',
    },
    contact: {
      title: 'Contact',
      items: [
        { label: 'WhatsApp', value: '+62 877-8761-5432', href: 'https://wa.me/6287787615432', icon: <IoLogoWhatsapp /> },
        { label: 'Email', value: 'support@aibiz.id', href: 'mailto:support@aibiz.id', icon: <IoMailSharp /> },
        { label: 'Address', value: 'Alday Group, DI Yogyakarta', href: 'https://maps.app.goo.gl/AToxLtQmpTf9NRGt5', icon: <IoLocationSharp /> },
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
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <span className="text-[#005C4B] mr-2">{item.icon}</span>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D1D7DB] hover:text-[#005C4B]"
                >
                  {item.value}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 text-center text-[#D1D7DB]"
      >
        {content[language].footer.copyright}
      </motion.p>
    </motion.footer>
  );
}