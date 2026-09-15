import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'GiftHamper Seller',
  description: 'Seller dashboard for GiftHamper e-commerce',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
