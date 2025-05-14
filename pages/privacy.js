import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { IoChatbubblesSharp } from 'react-icons/io5';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const content = {
    title: 'Kebijakan Privasi',
    subtitle: 'Informasi tentang bagaimana kami mengelola data Anda di WA Tanpa Save Nomor.',
    sections: [
      {
        title: '1. Pendahuluan',
        text: 'Selamat datang di WA Tanpa Save Nomor, aplikasi web yang dikembangkan oleh Aibiz ID ("kami", "kita"). Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat menggunakan layanan kami di <a href="https://wasend.aibiz.id" class="text-[var(--whatsapp-dark-green)] hover:underline">https://wasend.aibiz.id</a>. Aplikasi ini memungkinkan Anda mengirim pesan WhatsApp tanpa menyimpan nomor tujuan di kontak Anda.',
      },
      {
        title: '2. Informasi yang Kami Kumpulkan',
        text: 'Kami mengumpulkan informasi berikut: <ul class="list-disc list-inside ml-4"><li><strong>Riwayat Pesan:</strong> Nomor telepon tujuan dan pesan yang Anda kirim, disimpan secara lokal di perangkat Anda melalui localStorage.</li><li><strong>Data Teknis:</strong> Informasi seperti alamat IP, jenis perangkat, dan browser untuk tujuan keamanan dan analitik.</li></ul> Kami tidak mengumpulkan informasi pribadi seperti nama atau email kecuali Anda menghubungi kami secara langsung.',
      },
      {
        title: '3. Bagaimana Kami Menggunakan Informasi Anda',
        text: 'Informasi yang dikumpulkan digunakan untuk: <ul class="list-disc list-inside ml-4"><li>Menyediakan layanan pengiriman pesan WhatsApp tanpa menyimpan nomor.</li><li>Menyimpan riwayat pesan di perangkat Anda untuk kenyamanan pengguna.</li><li>Menganalisis pola penggunaan secara anonim untuk meningkatkan pengalaman pengguna.</li></ul>',
      },
      {
        title: '4. Berbagi Data',
        text: 'Kami tidak menjual atau membagikan data pribadi Anda. Data riwayat pesan hanya disimpan di perangkat Anda dan tidak dikirim ke server kami. Kami mungkin membagikan data teknis anonim dengan penyedia layanan analitik untuk meningkatkan performa aplikasi.',
      },
      {
        title: '5. Keamanan',
        text: 'Kami menerapkan langkah-langkah keamanan standar industri untuk melindungi data Anda. Karena riwayat pesan disimpan secara lokal, Anda bertanggung jawab atas keamanan perangkat Anda. Jika Anda mencurigai pelanggaran keamanan, hubungi kami di <a href="mailto:support@aibiz.id" class="text-[var(--whatsapp-dark-green)] hover:underline">support@aibiz.id</a> atau <a href="https://wa.me/6287787615432" class="text-[var(--whatsapp-dark-green)] hover:underline">+62 877-8761-5432</a>.',
      },
      {
        title: '6. Hak Anda',
        text: 'Anda dapat menghapus riwayat pesan kapan saja menggunakan tombol "Hapus Riwayat" di aplikasi. Untuk informasi lebih lanjut atau permintaan terkait data, hubungi kami di <a href="mailto:support@aibiz.id" class="text-[var(--whatsapp-dark-green)] hover:underline">support@aibiz.id</a> atau <a href="https://wa.me/6287787615432" class="text-[var(--whatsapp-dark-green)] hover:underline">+62 877-8761-5432</a>.',
      },
      {
        title: '7. Hubungi Kami',
        text: 'Untuk pertanyaan tentang kebijakan ini, hubungi kami melalui: <ul class="list-disc list-inside ml-4"><li>Email: <a href="mailto:support@aibiz.id" class="text-[var(--whatsapp-dark-green)] hover:underline">support@aibiz.id</a></li><li>WhatsApp: <a href="https://wa.me/6287787615432" class="text-[var(--whatsapp-dark-green)] hover:underline">+62 877-8761-5432</a></li><li>Website: <a href="https://aibiz.id" class="text-[var(--whatsapp-dark-green)] hover:underline">https://aibiz.id</a></li><li>Alamat: Alday Group, DI Yogyakarta (<a href="https://maps.app.goo.gl/AToxLtQmpTf9NRGt5" class="text-[var(--whatsapp-dark-green)] hover:underline">Lihat di Google Maps</a>)</li></ul>',
      },
      {
        title: '8. Perubahan pada Kebijakan Ini',
        text: 'Kami dapat memperbarui kebijakan ini secara berkala. Versi terbaru akan selalu tersedia di <a href="https://wasend.aibiz.id/privacy" class="text-[var(--whatsapp-dark-green)] hover:underline">https://wasend.aibiz.id/privacy</a>.',
      },
    ],
    footer: '© {year} Aibiz ID. Hak cipta dilindungi.',
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--whatsapp-cream)]">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className={`fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center ${scrolled ? 'bg-[var(--whatsapp-dark-green)]/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}
      >
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-white"
        >
          <Link href="/">Aibiz ID</Link>
        </motion.h1>
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 4px 12px rgba(0, 92, 75, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-[var(--whatsapp-dark-green)] text-white rounded-lg font-medium shadow hover:bg-[#004238] transition-all duration-300"
          >
            Kembali ke Beranda
          </motion.button>
        </Link>
      </motion.header>

      {/* Main Content */}
      <main className="pt-24 pb-20 px-4">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="container text-center"
        >
          <motion.div
            className="chat-bubble mx-auto text-5xl mb-6 text-[var(--whatsapp-dark-green)]"
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <IoChatbubblesSharp />
          </motion.div>
          <h2 className="section-heading text-4xl text-[var(--whatsapp-dark-green)]">{content.title}</h2>
          <p className="section-subheading font-light text-[var(--whatsapp-dark-green)] mt-2">{content.subtitle}</p>
          <div className="max-w-3xl mx-auto mt-12 space-y-8 text-left">
            {content.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <h3 className="text-xl font-semibold text-[var(--whatsapp-dark-green)] mb-2">{section.title}</h3>
                <div
                  className="text-base text-[var(--whatsapp-dark-green)] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: section.text }}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center bg-[var(--whatsapp-dark-green)] text-white">
        <p className="text-sm">
          {content.footer.replace('{year}', new Date().getFullYear())}
        </p>
      </footer>
    </div>
  );
}