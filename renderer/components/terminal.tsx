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

export default function TerminalComponent() {


   const fitAddon = new FitAddon();

   const xtermRef: any = useRef(null);
   let term: Terminal = new Terminal();
   term.loadAddon(fitAddon);

   ipc.send("terminal.keystroke", "\r");


   ipc.on("terminal.incomingData", (event, data) => {
      term.write(data);
   });

   useEffect(() => {
      term.open(xtermRef.current);
      fitAddon.fit();

      term.onData((data: string) => {
         ipc.send("terminal.keystroke", data);
      });
   },[]);


   return <div ref={xtermRef} className=""></div>;
}
