"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  icon: React.ReactNode;
  path: string;
  title: string;
}

export const SideBarItem = ({ icon, path, title }: Props) => {
  const pathName = usePathname();

  return (
    <li>
      <Link
        href={path}
        className={`px-4 py-3 flex items-center space-x-4 rounded-md  group ${
          path === pathName &&
          "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
        }
        hover:bg-gradient-to-r from-sky-600  hover:text-white  
        `}
      >
        {icon}
        <span className="group-hover:text-white-700">{title}</span>
      </Link>
    </li>
  );
};
