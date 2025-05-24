"use client";

import axios from "axios";
import { error } from "console";
import { stringify } from "querystring";
import React, { useEffect, useRef, useState } from 'react'
import { Send, X } from "lucide-react";
import { json, text } from "stream/consumers";

type Props = { isActive: boolean }

export default function Chatbot({ isActive }: Props) {

  const [message, setMessages] = useState([{
    role: "assistant",
    content: "Hey! I am Intercom Bot, you go to chat Buddy, Here you can ask me any question and I would be glad to answer them. Think me as Your friend hehe.."
  },]);

  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scorlltobottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scorlltobottom();
  }, [message]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  const sendMessage = async () => {
    if (!value.trim()) return;

    const New_Messages = [...message, { role: "user", content: value }];
    setMessages(New_Messages); 
    setValue("");

    // if(textareaRef.current){
    //   textareaRef.current.style.height ="auto"; 
    // }


    try {

      const response = await axios.post("/api/chatbot", { message: value });

      const data = response.data;
      const reply = data.reply;


      if (!reply) {
        throw new Error("No reply returned from the API.")

      }

      setMessages([...New_Messages, { role: "assistant", content: reply }]);


    }

    catch (error) {
      console.log("Error getting respone : ", error);
      setMessages([...New_Messages, { role: "assistant", content: "I am trying my best but I can't seem to generate answer " }]);
    }
  };


  const clearInput = () => {
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  if (!isActive) return null;
  return (
    <>
      <h1 className="text-center text-2xl bg-gradient-to-r from-gray-800 to-gray-400 bg-clip-text text-transparent py-4">
        Intecom Bot
      </h1>

      <div className="flex-1 overflow-auto p-6 mb-44">
            <div className="max-w-3xl mx-auto space-y-4">

              {message.map((message, index) => (
                <div key={index} className={`flex ${message.role ==="user" ? "justify-end" : "items-starts"}`}>

                       <div
                className={`p-4 rounded-3xl max-w-[80%] shadow-sm whitespace-pre-wrap ${
                  message.role === "user"
                    ? "bg-gradient-to-t from-gray-400 to-gray-200 text-gray-900 "
                    : "bg-gradient-to-b from-gray-200 to-gray-400 text-gray-900"
                }`}
              >
                {message.content}
                </div>
                </div>
              ))}
              
              <div ref = {messagesEndRef} />

            </div>

        
      </div>

      <footer className='fixed bottom-10 left-0 right-0  p-4'>
        <div className='max-w-3xl mx-auto flex items-center gap-3 relative'>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            rows={3}
            placeholder="Type your message here..."
            className="flex-1 p-6 rounded-3xl border-gray-300 bg-gradient-to-tl resize-none overflow-y-auto from-gray-400 to-gray-200 text-gray-800
    focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[10vh] max-h-[26vh]"
          ></textarea>

          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <Send onClick={sendMessage}
          className={`w-6 h-6 transition-colors cursor-pointer ${value.trim() ? "text-gray-800 hover:text-gray-600" : 
             "text-gray-400 cursor-not-allowed"
           }`}
           aria-label="Send Message"/>
              
          
          </div>



        </div>

      </footer>

    </>
  )
}