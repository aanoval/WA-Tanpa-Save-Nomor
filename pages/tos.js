import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { IoChatbubblesSharp } from 'react-icons/io5';
import Link from 'next/link';

export default function TermsOfService() {
  const content = {
    title: 'Syarat dan Ketentuan',
    subtitle: 'Ketentuan penggunaan layanan WA Tanpa Save Nomor.',
    sections: [
      {
        title: '1. Penerimaan Syarat',
        text: 'Dengan mengakses atau menggunakan WA Tanpa Save Nomor di <a href="https://wasend.aibiz.id" class="text-[var(--whatsapp-dark-green)] hover:underline">https://wasend.aibiz.id</a>, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini ("S&K"). Jika Anda tidak setuju, harap jangan menggunakan layanan kami.',
      },
      {
        title: '2. Layanan yang Disediakan',
        text: 'WA Tanpa Save Nomor adalah aplikasi web yang memungkinkan Anda mengirim pesan WhatsApp tanpa menyimpan nomor tujuan di kontak Anda. Kami berhak untuk memodifikasi, menangguhkan, atau menghentikan bagian mana pun dari layanan ini kapan saja tanpa pemberitahuan sebelumnya.',
      },
      {
        title: '3. Tanggung Jawab Pengguna',
        text: 'Anda setuju untuk: <ul class="list-disc list-inside ml-4"><li>Menggunakan layanan sesuai dengan hukum dan peraturan yang berlaku.</li><li>Tidak menyalahgunakan layanan, termasuk mengirim spam, pesan yang melanggar hukum, atau melakukan aktivitas yang mengganggu.</li><li>Memastikan nomor telepon dan pesan yang dimasukkan akurat dan sesuai dengan tujuan penggunaan.</li></ul>',
      },
      {
        title: '4. Penghentian Penggunaan',
        text: 'Kami dapat menangguhkan atau menghentikan akses Anda ke layanan jika Anda melanggar S&K ini. Anda dapat menghapus riwayat pesan Anda kapan saja menggunakan tombol "Hapus Riwayat" di aplikasi.',
      },
      {
        title: '5. Batasan Tanggung Jawab',
        text: 'WA Tanpa Save Nomor disediakan "sebagaimana adanya" tanpa jaminan apa pun. Kami tidak bertanggung jawab atas kerusakan yang timbul dari penggunaan layanan, termasuk kehilangan data atau gangguan layanan. Anda bertanggung jawab atas keamanan perangkat Anda, karena riwayat pesan disimpan secara lokal.',
      },
      {
        title: '6. Hak Kekayaan Intelektual',
        text: 'Semua konten, teknologi, dan desain dalam WA Tanpa Save Nomor dimiliki oleh Aibiz ID atau pemberi lisensinya. Anda dilarang menyalin, memodifikasi, atau mendistribusikan bagian mana pun dari layanan tanpa izin kami.',
      },
      {
        title: '7. Hubungi Kami',
        text: 'Untuk pertanyaan atau kekhawatiran tentang S&K ini, hubungi kami melalui: <ul class="list-disc list-inside ml-4"><li>Email: <a href="mailto:support@aibiz.id" class="text-[var(--whatsapp-dark-green)] hover:underline">support@aibiz.id</a></li><li>WhatsApp: <a href="https://wa.me/6287787615432" class="text-[var(--whatsapp-dark-green)] hover:underline">+62 877-8761-5432</a></li><li>Website: <a href="https://aibiz.id" class="text-[var(--whatsapp-dark-green)] hover:underline">https://aibiz.id</a></li><li>Alamat: Alday Group, DI Yogyakarta (<a href="https://maps.app.goo.gl/AToxLtQmpTf9NRGt5" class="text-[var(--whatsapp-dark-green)] hover:underline">Lihat di Google Maps</a>)</li></ul>',
      },
      {
        title: '8. Perubahan pada Syarat Ini',
        text: 'Kami dapat memperbarui S&K ini secara berkala. Versi terbaru akan selalu tersedia di <a href="https://wasend.aibiz.id/tos" class="text-[var(--whatsapp-dark-green)] hover:underline">https://wasend.aibiz.id/tos</a>. Penggunaan layanan yang berkelanjutan setelah perubahan menunjukkan penerimaan syarat baru.',
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