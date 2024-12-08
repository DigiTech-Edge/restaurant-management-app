import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant Management App",
  description:
    "A comprehensive app to manage restaurant operations, including reservations, orders, and inventory.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Default options for specific types
              success: {
                duration: 3000,
                style: {
                  background: '#fff',
                  color: '#2d3748',
                  border: '1px solid #5F0101',
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(95, 1, 1, 0.1)',
                },
                iconTheme: {
                  primary: '#5F0101',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                style: {
                  background: '#fff',
                  color: '#2d3748',
                  border: '1px solid #991B1B',
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(153, 27, 27, 0.1)',
                },
                iconTheme: {
                  primary: '#991B1B',
                  secondary: '#fff',
                },
              },
              loading: {
                style: {
                  background: '#fff',
                  color: '#2d3748',
                  border: '1px solid #5F0101',
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(95, 1, 1, 0.1)',
                },
              },
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
