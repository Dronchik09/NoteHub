import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Roboto } from 'next/font/google';
import { AuthProvider } from '@/components/AuthProvider/AuthProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});
export const metadata: Metadata = {
  title: 'NotHub',
  description: 'Простий та ефективний застосунок для управління нотатками',
  openGraph: {
    title: 'NotHub',
    description: 'Простий та ефективний застосунок для управління нотатками',
    url: 'https://nothub.app',
    images: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
