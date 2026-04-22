import { Inknut_Antiqua, Montserrat } from 'next/font/google';
import './globals.css';

const headingFont = Inknut_Antiqua({ 
  subsets: ['latin'], 
  weight: ['400', '700', '900'],
  variable: '--font-heading' 
});

const bodyFont = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-body' 
});

export const metadata = {
  title: 'Souvenirly Yours | Gifting Just Got Easier',
  description: 'Lagos-based curators of thoughtful keepsakes and bespoke bulk gifts.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}