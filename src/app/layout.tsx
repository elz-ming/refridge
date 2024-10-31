import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-screen antialiased`}>
        <header className="h-[10%] bg-gray-800 text-white flex items-center justify-center"></header>
        {children}
        <footer className="h-[10%] bg-gray-800 text-white flex items-center justify-center"></footer>
      </body>
    </html>
  );
}
