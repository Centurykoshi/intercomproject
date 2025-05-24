"use client";

import React, { useState } from "react";
import Script from "next/script";
import "./sidestbar.css";
import Chatbot from "./Chatbot";
import Sidebar from "./Sidebar";

export default function Sidestbar() {
  const [active, setActive] = useState("");

  const handleClick = (item: string) => {
    setActive(active === item ? "" : item);
  };

  return (
    <>
      {/* Load Lordicon script */}
      <Script
        src="https://cdn.lordicon.com/lordicon.js"
        strategy="beforeInteractive"
      />

      <div className="flex">
        {/* Fixed Sidebar with Icons */}
        <div className="fixed top-0 left-0 bg-gray-300 w-[5vw] max-w-[60px] h-screen pt-8 flex flex-col gap-8 items-center z-20">
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
            <div
              className={
                "relative group flex items-center justify-center cursor-pointer " +
                (active === "inbox"
                  ? "border-b-2 rounded-lg flex justify-center bg-gradient-to-r from-gray-700 to-gray-50 transition-all duration-350"
                  : "")
              }
              onClick={() => handleClick("inbox")}
            >
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

            <div
              className={
                "relative group flex items-center justify-center cursor-pointer " +
                (active === "Chatbot"
                  ? "border-b-2 rounded-lg flex justify-center bg-gradient-to-r from-gray-200 to-gray-50 transition-all duration-350"
                  : "")
              }
              onClick={() => handleClick("Chatbot")}
            >
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

        {/* Secondary Sidebar (Inbox) */}
        <div
          className={
            "ml-[5vw] h-screen bg-gray-200 w-[12vw] flex-col items-center p-2 transition-opacity duration-500 " +
            (active === "inbox" ? "opacity-100" : "opacity-0 pointer-events-none")
          }
        >
          <div className="p-1 font-bold"></div>
          <Sidebar isActive={active === "inbox"} />
        </div>

        {/* Main Content Area (Chatbot) */}
        <div
          className={
            "h-screen " +
            (active === "inbox" ? "ml-[17vw] w-[83vw]" : "ml-[5vw] w-[95vw]")
          }
        >
          <Chatbot isActive={active === "Chatbot"} />
        </div>
      </div>
    </>
  );
}