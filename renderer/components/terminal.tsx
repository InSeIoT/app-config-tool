"use client";

import React, { useState, useEffect, useRef } from "react";
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
   

   let buffer: String = "";

   const xtermRef: any = useRef(null);
   let term: Terminal = new Terminal();
   term.loadAddon(fitAddon);
   fitAddon.fit();
   ipc.send("terminal.keystroke", "\r\n");

   function sendData(str: String) {}

   function prompt() {
      ipc.send("terminal.keystroke", buffer + "\r\n");
      buffer = "";
   }

   ipc.on("terminal.incomingData", (event, data) => {
      term.write(data);
   });

   useEffect(() => {
      term.open(xtermRef.current);
      term.onKey((event: { key: string; domEvent: KeyboardEvent }) => {
        console.log(event.key, event.domEvent.key, buffer ,buffer.length);
         if (event.domEvent.key === "Backspace") {
            term.write("\b \b");
            buffer = buffer.substring(0, buffer.length - 1)
         }
         if (event.domEvent.key === "Enter") {
            term.write("\r\n");
            prompt();
         } else {
            term.write(event.key);
            buffer += event.key;
         }
      });
      prompt();
   }, []);
   return <div ref={xtermRef} className=""></div>;
}
