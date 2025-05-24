"use client";

import React, { useState } from "react";
import Script from "next/script";
import "./sidestbar.css";
import Chatbot from  "./Chatbot"
import "./Sidebar";
import Sidebar from "./Sidebar";


export default function Sidestbar() {


  const [active, setActive] = useState("");

  const handleClick = (item: string) => {
    setActive(active === item ? "" : item);
  }

  return (
    <>
      {/* Load Lordicon script */}
      <Script
        src="https://cdn.lordicon.com/lordicon.js"
        strategy="beforeInteractive"
      />


      <div className="flex">
        <div className="bg-gray-300 w-[3vw] min-h-screen fixed  pt-8 flex-col  gap-8 items-center flex z-20">
          <div className="relative group flex items-center justify-center cursor-pointer">
            <lord-icon
              src="https://cdn.lordicon.com/bsmnglum.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#b4b4b4,secondary:#000000"
              style={{ width: "35px", height: "35px" }}
            ></lord-icon>
            <div className="absolute left-[min(70px,3vw)] bg-gradient-to-r from-gray-500 to-gray-100 text-black text-xs px-2 py-1 rounded opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out top-1 translate-y-1 whitespace-nowrap z-10">
              Home
            </div>

          </div>

          <div className="cursor-pointer flex flex-col gap-8 items-center">
            <div className={"relative group flex items-center justify-center cursor-pointer " + (active === "inbox" ? "border-b-2 rounded-lg flex justify-center  bg-gradient-to-r from-gray-700 to-gray-50 transition-all duration-350" : "")} onClick={() => handleClick("inbox")}>
              <lord-icon
                src="https://cdn.lordicon.com/fozsorqm.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#b4b4b4,secondary:#000000"
                style={{ width: "35px", height: "35px" }}
              ></lord-icon>
              <span className="absolute left-[min(70px,3vw)] bg-gradient-to-r from-gray-500 to-gray-100 text-black text-xs px-2 py-1 rounded opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out top-1 translate-y-1 whitespace-nowrap z-10">
                Inbox
              </span>
            </div>

            <div className={"relative group flex items-center justify-center cursor-pointer " + (active === "Chatbot" ? "border-b-2 rounded-lg flex justify-center  bg-gradient-to-r from-gray-200 to-gray-50 transition-all duration-350" : "")} onClick={() => handleClick("Chatbot")}>
              <lord-icon
                src="https://cdn.lordicon.com/wetqoxgw.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#b4b4b4,secondary:#000000"
                style={{ width: "35px", height: "35px" }}
              ></lord-icon>
              <span className="absolute left-[min(70px,3vw)] bg-gradient-to-r from-gray-500 to-gray-100 text-black text-xs px-2 py-1 rounded opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out top-1 translate-y-1 whitespace-nowrap z-10">
                Chatbot
              </span>
            </div>
          </div>
        </div>


        <div
          className={
            "h-screen ml-[3vw] bg-gray-200 w-[12vw]  flex-col items-center p-2 transition-opacity duration-500 " +
            (active === "inbox" ? "opacity-100" : "opacity-0 pointer-events-none")
          }
        >

          <div className="p-1 font-bold"></div> <Sidebar isActive={active==="inbox"} /> </div>

               <div className="p-1  w-[62vw]"><Chatbot isActive={active==="Chatbot"}/></div>
      </div>

 

    </>
  );
}
