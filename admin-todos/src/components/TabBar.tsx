"use client";

import { setCookie } from "cookies-next";
import React, { useState } from "react";

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4],
}: Props) => {
  const [selected, setsSelected] = useState(currentTab);

  const onTabSelected = (tab: number) => {
    setsSelected(tab);
    setCookie("selectedTab", tab.toString());
  };

  return (
    <div
      className={`grid w-full space-x-2 ${
        "grid-cols-" + tabOptions.length
      } rounded-xl bg-gray-200 p-2 `}
    >
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            type="radio"
            id={tab.toString()}
            className="peer hidden"
            checked={selected === tab}
            onChange={() => {}}
          />
          <label
            className="transition block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            onClick={() => onTabSelected(tab)}
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
