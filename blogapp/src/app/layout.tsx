"use client"
import type { Metadata } from "next";
import {  Inter } from "next/font/google";
const inter=Inter({subsets:['latin']})
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import HeaderComponent from "./components/HeaderComponent";
import { store } from "./store/store";
import { Provider } from "react-redux";


// export const metadata: Metadata = {
//   title: "Blog App",
  
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
      <AppRouterCacheProvider>
      <body className={inter.className}>
      <HeaderComponent />
        {children}
      </body>
      </AppRouterCacheProvider>
      </Provider>
    </html>
  );
}
