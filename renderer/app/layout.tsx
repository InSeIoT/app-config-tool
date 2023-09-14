import React, { useState, useEffect, useRef, use } from "react";
import "./globals.css";
import AntDProvider from "../components/antdprovider";
import HeaderComponent from "../components/header";
import MenuComponent from "../components/menu";
import ArticleComponent from "../components/article";

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className="dark bg-gradient min-h-screen">
            <AntDProvider>
               <div className="h-12">
                  <HeaderComponent />
               </div>
               <div className="flex flex-col">
                  <div className="flex-grow flex">
                     <div className="w-20 z-10">
                        <MenuComponent />
                     </div>
                     <ArticleComponent children={children} />
                  </div>
               </div>
            </AntDProvider>
         </body>
      </html>
   );
}
