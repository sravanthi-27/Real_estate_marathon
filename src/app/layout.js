import { Poppins, Oswald } from 'next/font/google';
import '@/styles/styles.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SITE } from '@/config/site';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-poppins', display: 'swap' });
const oswald = Oswald({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-oswald', display: 'swap' });

export const metadata = {
  title: { default: `${SITE.name} - World's First | ${SITE.hashtag}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${oswald.variable}`}>
      <body>
        <div className="appShell">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
