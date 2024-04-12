"use client";

import Image from "next/image";
import SearchCityInput from "./SearchCityInput";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { LocationContext } from "@/context/VisitedLocationsContext";

const Header = () => {
  const { visitedLocations, setVisitedLocations } =
    useContext(LocationContext)!;

  return (
    <header className="w-full h-[250px] sm:h-[300px] lg:h-[400px] relative p-4">
      <div className="w-full h-full absolute top-0 left-0 z-[-99] bg-black">
        <Image
          src="/eclipse-banner.jpg"
          alt="header banner"
          fill
          className="object-cover opacity-70"
        />
      </div>
      <div className="bg-gradient-to-t from-[#3A2A45] absolute left-0 bottom-0 w-full h-[200px] z-[99]"></div>
      <div className="z-[99] flex flex-col justify-between gap-10 max-w-[1024px] mx-auto">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 sm:text-xl lg:text-2xl"
          >
            <div className="relative w-12 h-12">
              <Image src="/icon.svg" alt="icon" fill />
            </div>
            <h1 className="text-white font-semibold">Eclipse</h1>
          </Link>
          <div className="flex lg:items-center lg:gap-4">
            <SearchCityInput />
          </div>
        </div>

        {visitedLocations.length !== 0 && (
          <div>
            <h2 className="text-white text-xl font-semibold my-8">
              Recently visted Location
            </h2>
            <div className="flex gap-4">
              {visitedLocations.slice(0, 3).map((location: any) => {
                return (
                  <div
                    key={location.id}
                    className="bg-transparent border rounded-lg text-white py-4 px-8 flex flex-col items-center"
                  >
                    <h2 className="capitalize text-lg font-semibold">
                      {location.city}
                    </h2>
                    <div className="flex items-center">
                      <Image
                        src={`https://openweathermap.org/img/wn/${location.icon}@2x.png`}
                        alt="icon"
                        width={64}
                        height={64}
                      />
                      <span>{`${Math.round(location.temp)}° C`}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
