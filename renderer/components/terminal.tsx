'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import classNames from 'classnames';
import 'xterm/css/xterm.css';

interface IXtermProps extends React.HTMLAttributes<HTMLDivElement> {
  addons?: string[];
  options?: any;
  path?: string;
}

export default function TerminalComponent () {

   const fitAddon = new FitAddon();

   const xtermRef:any = useRef(null)
   let term:Terminal=new Terminal()
   term.loadAddon(fitAddon);
   fitAddon.fit();

   function sendData(str:String){

   }
   function prompt(){
       let shellprompt="noobtopro$ "
       term.write("\r\n"+shellprompt)
   }

   useEffect(()=>{

 
       term.open(xtermRef.current)
       term.onKey((event: { key: string; domEvent: KeyboardEvent })=>{
           console.log(event.key)
           if(event.domEvent.key==="Backspace"){
               term.write("\b \b")
           }
           else{
               term.write(event.domEvent.key)
           }
       })
       prompt()
   },[])
   return (
       <div ref={xtermRef} className=''>
       </div>
   )
};
