import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { ModalProvider } from "@/lib/ModalContext";
import OrcamentoModalWrapper from "@/components/OrcamentoModalWrapper";
import { Toaster } from "react-hot-toast";

// Luxury editorial font for titles
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Modern clean font for UI and body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lonmdecor.com.br"),
  title: "LONM DECOR | Persianas sob Medida & Soluções de Iluminação Premium",
  description: "Transformando ambientes através da luz e elegância. Especialistas em instalação de persianas sob medida rolô, blackout, double vision e sistemas automatizados/wi-fi. Atendimento em Sorocaba e região.",
  keywords: [
    "instalação de persianas",
    "persianas sob medida",
    "persianas rolô",
    "cortinas modernas",
    "persianas motorizadas",
    "persiana rolo",
    "persiana blackout",
    "double vision",
    "controle de luz",
    "Sorocaba",
    "arquitetura sorocaba",
    "persianas automatizadas alexa"
  ],
  authors: [{ name: "LONM DECOR", url: "https://www.lonmdecor.com.br" }],
  creator: "LONM DECOR",
  openGraph: {
    title: "LONM DECOR | Persianas sob Medida & Design de Interiores",
    description: "Controle da luz com sofisticação e elegância. Conheça nossas soluções em persianas motorizadas, blackout e double vision em Sorocaba e região.",
    url: "https://www.lonmdecor.com.br",
    siteName: "LONM DECOR",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/logo/WhatsApp Image 2026-05-20 at 11.38.51 (1).jpeg",
        width: 1200,
        height: 630,
        alt: "LONM DECOR Persianas sob Medida"
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0C0C0B",
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-dark text-brand-cream overflow-x-hidden">
        {/* Luxury film grain/noise effect */}
        <div className="noise-overlay" />
        
        {/* Modal Provider wraps everything */}
        <ModalProvider>
          {/* Smooth scrolling wrapper */}
          <SmoothScroll>
            <div className="relative flex flex-col flex-grow">
              {children}
            </div>
          </SmoothScroll>

          {/* Global Orçamento Modal */}
          <OrcamentoModalWrapper />

          {/* Global Toast Notifications */}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: '#131312',
                color: '#f0ece4',
                border: '1px solid rgba(201, 168, 76, 0.3)',
                fontSize: '14px',
              },
              success: {
                iconTheme: {
                  primary: '#C9A84C',
                  secondary: '#131312',
                },
              },
            }}
          />
        </ModalProvider>
      </body>
    </html>
  );
}
