"use client";

import { useState } from "react";
import TerminalComponent from "./terminal";


export default function ArticleComponent({ children }: { children: React.ReactNode }) {

   const [panelHeight, setPanelHeight] = useState(100);

   const handleHeightChange = (newHeight) => {
     setPanelHeight(newHeight);
   }; 

   return(
      <article className='dark dark:text-white'>
         <div style={{ paddingBottom: `${panelHeight + 32}px` }}>{children}</div>
         <TerminalComponent initialHeight={panelHeight} onHeightChange={handleHeightChange}  />
      </article>
   );
} 