import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
// Font inter
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "RoktoNeer | Connecting Life, One Drop at a Time",
    template: "%s | RoktoNeer",
  },
  description:
    "RoktoNeer is a modern MERN stack blood donation platform connecting voluntary blood donors with recipients instantly across Bangladesh. Save lives by donating blood today.",
  authors: [{ name: "Abdur Rahman Adil" }],
  keywords: [
    "Blood Donation",
    "Blood Bank Bangladesh",
    "Donate Blood",
    "RoktoNeer",
    "Find Blood Donor Dhaka",
    "MERN Blood Donation App",
    "Emergency Blood Request",
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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-red-500 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <main className="grow flex flex-col">{children}</main>
          <Toaster></Toaster>
        </ThemeProvider>
      </body>
    </html>
  );
}
