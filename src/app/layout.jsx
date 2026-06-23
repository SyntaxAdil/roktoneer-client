import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "RoktoNeer | Connecting Life, One Drop at a Time",
    template: "%s | RoktoNeer",
  },
  description: "RoktoNeer is a modern MERN stack blood donation platform connecting voluntary blood donors with recipients instantly across Bangladesh. Save lives by donating blood today.",
  authors: [{ name: "Abdur Rahman Adil" }],
  keywords: [
    "Blood Donation",
    "Blood Bank Bangladesh",
    "Donate Blood",
    "RoktoNeer",
    "Find Blood Donor Dhaka",
    "MERN Blood Donation App",
    "Emergency Blood Request"
  ],
  creator: "Abdur Rahman Adil",
  publisher: "RoktoNeer",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-red-500 selection:text-white">
        <main className="grow flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}