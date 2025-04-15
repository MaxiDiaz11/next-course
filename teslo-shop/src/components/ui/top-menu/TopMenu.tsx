import React from "react";
import { titleFont } from "@/config/fonts";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import Link from "next/link";

export const TopMenu = () => {
  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link href={"/"}>
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>
      
      {/* Center menu */}
      <div className="hidden sm:block">
        <Link href={"/category/men"}>
          <span
            className={`m-2 p-2 rounded-md transition-all hover:bg-gray-200`}
          >
            Hombres{" "}
          </span>
        </Link>
        <Link href={"/category/women"}>
          <span
            className={`m-2 p-2 rounded-md transition-all hover:bg-gray-200`}
          >
            Mujeres{" "}
          </span>
        </Link>
        <Link href={"/category/kids"}>
          <span
            className={`m-2 p-2 rounded-md transition-all hover:bg-gray-200`}
          >
            Niños{" "}
          </span>
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href={"/search"} className="mx-2">
          <IoSearchOutline className="w-5 h-5"></IoSearchOutline>
        </Link>
        <Link href={"/cart"} className="mx-2">
          <div className="relative">
            <span className="absolute text-xs px-1 rounded-full font-bold -top-2 bg-blue-700 -right-2 text-white">
              3
            </span>
            <IoCartOutline></IoCartOutline>
          </div>
        </Link>

        <button className="m-2 p-2 rounded-md transition-all px-1 hover:bg-gray-100">
          Menú
        </button>
      </div>
    </nav>
  );
};
