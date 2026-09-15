import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'GiftHamper Admin',
  description: 'Admin dashboard for GiftHamper e-commerce',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
