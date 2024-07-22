"use client"
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import ProtectedRoute from "@/middleware/protectedRoute";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import Navbar from "@/global/Navbar/Index";
import Footer from "@/global/footer/Index";
import { ThemeProvider } from 'next-themes';

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
        <ThemeProvider attribute="class">
          <Provider store={store}>
            <ProtectedRoute>
              <QueryClientProvider client={queryClient}>
                <Navbar />
                {children}
                <Footer />
              </QueryClientProvider>
            </ProtectedRoute>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}