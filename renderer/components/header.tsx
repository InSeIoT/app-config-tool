"use client";

import Link from "next/link";
const ipc = require("electron").ipcRenderer;

const links = [
   { label: "Home", href: "/" },
];

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
         <nav className="dark flex items-center justify-between px-4 py-2 bg-header select-none">
            <div>
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
            <div className="header-drag-zone text-white hover:cursor-move font-bold px-10 text-center">SenIS</div>
            <div className="z-50">
               <button className="ml-2 rounded-full w-6 h-6 bg-purple-300 text-black" onClick={minimizeWindow}>&#x2212;</button>
               <button className="ml-2 rounded-full w-6 h-6 bg-indigo-800 text-white" onClick={maximizeWindow}>&#x25FD;</button>
               <button className="ml-2 rounded-full w-6 h-6 bg-rose-400 text-black" onClick={closeWindow}>&#x2179;</button>
            </div>
            
         </nav>
      </header>
   );
}
