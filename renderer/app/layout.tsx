import React from 'react';
import './globals.css';
import AntDProvider from '../components/antdprovider';
import HeaderComponent from '../components/header';
import MenuComponent from '../components/menu';
import TerminalComponent from '../components/terminal';

export const metadata = {
  title: 'SenIS Config Tool',
  description: 'Generated by create next app'
};

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='dark bg-gradient min-h-screen'>
          <AntDProvider>
            <div className='h-14'>
              <HeaderComponent />
            </div>
            <div className="flex flex-col"  style={{ minHeight: 'calc(100vh - 56px)' }}>
               <div className="flex-grow flex">
                  <div className="w-20 z-50">
                     <MenuComponent />
                  </div>
                  <div className="flex-grow p-2">
                     {children}
                  </div>
               </div>
         
               <div className="bg-yellow-600 p-1">
                  <TerminalComponent />
               </div>
            </div>
          </AntDProvider>
      </body>
    </html>
  );
}