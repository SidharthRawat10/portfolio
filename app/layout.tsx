import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manas Rawat | Graphic Designer & Video Editor",
  description: "High-end Scrollytelling Personal Portfolio of Manas Rawat - Graphic Designer, Video Editor, and Motion Specialist.",
  metadataBase: new URL("https://portfolio-ten-theta-44.vercel.app"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#121212",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload first hero sequence frame for instant LCP */}
        <link
          rel="preload"
          as="image"
          href="/sequence/frame_00_delay-0.066s.png"
          // @ts-ignore
          fetchPriority="high"
        />
      </head>
      <body className="bg-[#121212] text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
