"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import ProtectedRoute from "@/middleware/protectedRoute";
const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProtectedRoute>
           <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        </ProtectedRoute>
       
      </body>
    </html>
  );
}


