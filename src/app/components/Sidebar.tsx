import React from 'react'
import { useState } from "react";

type Props = {
  isActive: boolean;
}

import { ChevronDown, ChevronRight, Eye, User, Inbox, Users } from "lucide-react";

type SidebarItem = {
  label: string;
  count?: number;
  icon?: React.ReactNode;
};

type SidebarSection = {
  header: string;
  items: SidebarItem[];
  icon?: React.ReactNode;
};

const dummySections: SidebarSection[] = [
  {
    header: "INBOX",
    icon: <Inbox size={16} className='text-gray-500' />,
    items: [
      { label: "Your Inbox", count: 6 },
      { label: "Mentions", count: 10 },
      { label: "Created by you", count: 29 },
      { label: "All", count: 937 },
      { label: "Unassigned", count: 268 },
      { label: "Dashboard" },
    ],
  },
  {
    header: "TEAMS ",
    icon: <Users size={16} className='text-gray-500' />,
    items: [
      { label: "EMEA ", count: 12 },
      { label: "APAC ", count: 42 },
      { label: "USA ", count: 3 },
    ],
  },
  {
    header: "TEAMMATES",
    icon: <User size={16} className='text-gray-500' />,
    items: [
      { label: "June Jenson ", count: 52 },
      { label: "Clara Richards ", count: 42 },
      { label: "David Lee ", count: 4 },
    ],
  },
  {
    header: "VIEWS ",
    icon: <Eye size={16} className='text-gray-500' />,
    items: [
      { label: "Waiting premium ", count: 63 },
      { label: "Apps & integrations ", count: 562 },
      { label: "Social queries ", count: 21 },
    ],
  },
];



export default function Sidebar({ isActive }: Props) {
  if (!isActive) return null;

  const [activeSection, setActiveSection] = useState<string[]>(["INBOX"]);

  const toggleSection = (header: string) => {
    setActiveSection((prev) =>
      prev.includes(header) ? prev.filter((item) => item !== header) : [...prev, header]);

  }
  return (
    <>
      <h1 className="text-lg font-semibold mb-4 text-center">Help Desk</h1>

      {dummySections.map((section) => (
        <div key={section.header} className='mb-3 space-y-3'>

          <button onClick={() => toggleSection(section.header)}
            className='w-full flex items-center justify-between text-sm text-gray-500 font-medium hover:text-black transition'
          >
            <span className='flex gap-2 flex-1 text-left items-center' >{section.icon}
              <span className='pr-2'>{section.header}</span>
            </span>

            {activeSection.includes(section.header) ? (
              <ChevronDown size={18} className='text-black' />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>

          <ul
            className={`flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out
    ${activeSection.includes(section.header) ? "max-h-[300px] " : "max-h-0 opacity-0 "}`}

          >

            {section.items.map((item, idx) => (
              <li key={idx}
                className="flex justify-between items-center text-sm text-gray-800
         hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <span className="text-black-xs bg-gray-300 w-[2vw] text-center rounded-xl">{item.count}</span>
                )}
              </li>
            ))}


          </ul>



        </div >
      ))
      }

    </>



  )
}