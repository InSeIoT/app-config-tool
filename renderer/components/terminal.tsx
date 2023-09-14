"use client";

import React, { useState, useEffect, useRef, use } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
const ipc = require("electron").ipcRenderer;

interface IXtermProps extends React.HTMLAttributes<HTMLDivElement> {
   addons?: string[];
   options?: any;
   path?: string;
}

export default function TerminalComponent({ initialHeight, onHeightChange }) {
   const fitAddon = new FitAddon();

   const xtermRef: any = useRef(null);
   let term: Terminal = new Terminal({ rows: 48 });
   term.loadAddon(fitAddon);

   ipc.send("terminal.keystroke", "clear\r");

   ipc.on("terminal.incomingData", (event, data) => {
      term.write(data);
   });

   useEffect(() => {
      term.open(xtermRef.current);
      term.onData((data: string) => {
         ipc.send("terminal.keystroke", data);
      });
   }, []);

   const [height, setHeight] = useState(initialHeight); // Altura inicial del panel

   const handleResize = (e) => {
      const newHeight = window.innerHeight - e.clientY;
      setHeight(newHeight);
      onHeightChange(newHeight);
      fitAddon.fit();
   };

   return (
      <div className="bg-black fixed bottom-0 left-0 z-20 w-full">
         <div
            className="pl-2 bg-yellow-700 resize-bar h-5 text-sm text-white font-bold cursor-row-resize"
            onMouseDown={(e) => {
               e.preventDefault();
               window.addEventListener("mousemove", handleResize);
               window.addEventListener("mouseup", () => {
                  window.removeEventListener("mousemove", handleResize);
               });
            }}
         >
            Terminal
         </div>
         <div style={{ height: `${height}px` }} className="overflow-y-auto">
            <div ref={xtermRef} className="h-full"></div>;
         </div>
      </div>
   );
}
