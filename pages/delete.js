import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { IoChatbubblesSharp } from 'react-icons/io5';
import Link from 'next/link';

export default function DeleteInstructions() {
  const content = {
    title: 'Hapus Data Anda',
    subtitle: 'Instruksi untuk menghapus riwayat pesan di WA Tanpa Save Nomor.',
    sections: [
      {
        title: '1. Cara Menghapus Riwayat Pesan',
        text: 'WA Tanpa Save Nomor menyimpan riwayat pesan Anda (nomor telepon tujuan dan pesan) secara lokal di perangkat Anda melalui <code>localStorage</code>. Untuk menghapus data ini, ikuti langkah berikut: <ol class="list-decimal list-inside ml-4 space-y-2"><li>Buka aplikasi di <a href="https://wasend.aibiz.id" class="text-[var(--whatsapp-dark-green)] hover:underline">https://wasend.aibiz.id</a>.</li><li>Pergi ke bagian "Riwayat Pesan" di halaman utama.</li><li>Klik tombol <strong>Hapus Riwayat</strong> yang ditandai dengan ikon tong sampah.</li><li>Konfirmasi penghapusan jika diminta. Ini akan menghapus semua riwayat pesan dari perangkat Anda.</li></ol>',
      },
      {
        title: '2. Apa yang Terjadi Setelah Penghapusan?',
        text: 'Setelah Anda menghapus riwayat pesan, data tersebut akan dihapus secara permanen dari <code>localStorage</code> perangkat Anda. Kami tidak menyimpan data Anda di server kami, sehingga tidak ada data yang perlu dihapus dari sistem kami. Anda dapat mulai menggunakan aplikasi lagi tanpa riwayat sebelumnya.',
      },
      {
        title: '3. Tidak Ada Akun Pengguna',
        text: 'WA Tanpa Save Nomor tidak memerlukan pendaftaran akun atau menyimpan informasi pribadi seperti email atau nama. Oleh karena itu, tidak ada proses penghapusan akun. Penghapusan riwayat pesan adalah satu-satunya tindakan yang diperlukan untuk menghapus data Anda.',
      },
      {
        title: '4. Perlu Bantuan?',
        text: 'Jika Anda mengalami masalah saat menghapus riwayat pesan atau memiliki pertanyaan lain, hubungi kami melalui: <ul class="list-disc list-inside ml-4"><li>Email: <a href="mailto:support@aibiz.id" class="text-[var(--whatsapp-dark-green)] hover:underline">support@aibiz.id</a></li><li>WhatsApp: <a href="https://wa.me/6287787615432" class="text-[var(--whatsapp-dark-green)] hover:underline">+62 877-8761-5432</a></li><li>Website: <a href="https://aibiz.id" class="text-[var(--whatsapp-dark-green)] hover:underline">https://aibiz.id</a></li><li>Alamat: Alday Group, DI Yogyakarta (<a href="https://maps.app.goo.gl/AToxLtQmpTf9NRGt5" class="text-[var(--whatsapp-dark-green)] hover:underline">Lihat di Google Maps</a>)</li></ul>',
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