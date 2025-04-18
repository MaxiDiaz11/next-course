import React from "react";
import { SideBarItem } from "./SideBarItem";
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import { LogoutButtton } from "./LogoutButtton";

const menuItems = [
  {
    icon: <IoCalendarOutline />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <IoCheckboxOutline />,
    title: "Rest Todos",
    path: "/dashboard/rest-todos",
  },
  {
    icon: <IoListOutline />,
    title: "Server Actions",
    path: "/dashboard/server-todos",
  },
  {
    icon: <IoCodeWorkingOutline />,
    title: "Cookies",
    path: "/dashboard/cookies",
  },
  {
    icon: <IoBasketOutline />,
    title: "Products",
    path: "/dashboard/products",
  },
  {
    icon: <IoPersonOutline />,
    title: "Profile",
    path: "/dashboard/profile",
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  const avatarUrl = session?.user?.image
    ? session.user.image
    : "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp";

  const userName = session?.user?.name ?? "No Name";
  const userRoles = session?.user?.roles ?? ["client"];

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="mt-16 text-center">
          <Image
            src={avatarUrl}
            width={150}
            height={150}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userName}
          </h5>
          <span className="hidden text-gray-400 lg:block capitalize">
            {userRoles.join(", ")}
          </span>
        </div>
      </div>

      <div>
        <ul className="space-y-2 tracking-wide">
          {menuItems.map((item) => (
            <SideBarItem {...item} key={item.path} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButtton />
      </div>
    </aside>
  );
};
