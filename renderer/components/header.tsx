"use client";

import Link from "next/link";
const ipc = require("electron").ipcRenderer;

const links = [{ label: "Home", href: "/" }];

export default function HeaderComponent() {
   const closeWindow = () => {
      ipc.send("app.close");
   };

   const minimizeWindow = () => {
      ipc.send("app.minimize");
   };

   const maximizeWindow = () => {
      ipc.send("app.maximize");
   };

   return (
      <header>
         <nav className="header-drag-zone hover:cursor-move dark flex items-center px-4 py-1 2xl:py-2 bg-header select-none fixed top-0 w-full z-40">
            <div className="text-white font-bold pr-3 text-center">SenIS</div>
            <div className="w-full">
               <ul className="flex items-center justify-between">
                  {links.map(({ label, href }) => (
                     <li key={`${href}${label}`} className="mr-6">
                        <Link href={href}>
                           <span className="text-white hover:text-indigo-500">{label}</span>
                        </Link>
                     </li>
                  ))}
               </ul>
            </div>
         </nav>
         <div className="z-50 fixed top-1 w-full bg-blue-100">
            <div className="absolute right-3">
               <button className="ml-2 rounded-full w-4 h-4 bg-purple-300 text-xs text-transparent hover:text-white font-bold" onClick={minimizeWindow}>
                  &#x2212;
               </button>
               <button className="ml-2 rounded-full w-4 h-4 bg-indigo-800 text-xs text-transparent hover:text-white" onClick={maximizeWindow}>
                  &#x25FD;
               </button>
               <button className="ml-2 rounded-full w-4 h-4 bg-rose-400 text-xs text-transparent hover:text-white font-bold" onClick={closeWindow}>
                 X
               </button>
            </div>
         </div>
      </header>
   );
}
