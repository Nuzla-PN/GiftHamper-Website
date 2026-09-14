import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "GiftHaven - Curated Gift Hampers",
  description: "Find the perfect gift for every celebration",
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
