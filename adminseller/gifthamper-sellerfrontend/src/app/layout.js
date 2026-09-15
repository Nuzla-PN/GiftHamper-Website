import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'GiftHamper Seller',
  description: 'Seller dashboard for GiftHamper e-commerce',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
