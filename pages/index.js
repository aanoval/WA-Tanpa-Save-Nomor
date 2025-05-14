import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';

export default function Home() {
  const router = useRouter();
  const [language, setLanguage] = useState('id');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Detect device language
    const deviceLanguage = navigator.language.startsWith('id') ? 'id' : 'en';
    setLanguage(deviceLanguage);

    // Scroll handler
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => setLanguage((prev) => (prev === 'id' ? 'en' : 'id'));

  return (
    <>
      <Head>
        <title>{language === 'id' ? 'Kirim WhatsApp Tanpa Simpan Nomor - Aibiz ID' : 'Send WhatsApp Without Saving Number - Aibiz ID'}</title>
        <meta
          name="description"
          content={language === 'id' ? 'Kirim pesan WhatsApp tanpa menyimpan nomor dengan mudah dan cepat. Simpan riwayat pesan dan gunakan kembali kapan saja.' : 'Send WhatsApp messages without saving numbers easily and quickly. Save message history and reuse it anytime.'}
        />
        <meta name="keywords" content="WhatsApp, Send Message, No Save Number, Aibiz ID, WhatsApp Business" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@500;700&display=fallback" rel="stylesheet" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Kirim WhatsApp Tanpa Simpan Nomor',
            description: language === 'id' ? 'Layanan untuk mengirim pesan WhatsApp tanpa menyimpan nomor.' : 'Service to send WhatsApp messages without saving numbers.',
            provider: { '@type': 'Organization', name: 'Aibiz ID' },
          })}
        </script>
      </Head>
      <div className="min-h-screen bg-[#F5F6F5] transition-colors duration-500 font-sans">
        <Header language={language} toggleLanguage={toggleLanguage} scrolled={scrolled} />
        <MainContent language={language} />
        <Footer language={language} />
      </div>
    </>
  );
}