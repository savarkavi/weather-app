"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

type SuggestionType = {
  city: string;
  country: string;
  lat: string;
  lon: string;
};

const SearchCityInput = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<SuggestionType[] | null>(null);
  const router = useRouter();

  const handleSearchCity = async (query: string) => {
    setSearch(query);

    const { data } = await axios.get(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=search(name%2C%20%22${query}%22)&limit=20`
    );

    const citiesArr = data.results.map((res: any) => {
      return {
        city: res.name,
        country: res.cou_name_en,
        lat: res.coordinates.lat,
        lon: res.coordinates.lon,
      };
    });

    setSuggestions(citiesArr);
  };

  const handleCityClick = (cityData: SuggestionType) => {
    setSearch("");
    setSuggestions(null);

    router.push(
      `/city/${cityData.city.toLowerCase().replace(/\s+/g, "-")}/lat=${
        cityData.lat
      }&lon=${cityData.lon}`
    );
  };

  return (
    <div className="relative">
      <input
        placeholder="Search a City..."
        className="p-2 rounded-lg outline-none bg-white text-sm w-[200px] sm:w-full"
        value={search}
        onChange={(e) => handleSearchCity(e.target.value)}
      />
      <button>
        <CiSearch className="text-lg absolute right-4 top-1/2 -translate-y-1/2" />
      </button>
      {suggestions && suggestions.length !== 0 && (
        <div className="absolute w-[300px] h-[300px] overflow-y-scroll bg-white rounded-lg top-[50px]">
          {suggestions.map((suggestion: SuggestionType) => {
            return (
              <div
                key={suggestion.lat}
                className="flex flex-col gap-2 text-sm px-2 py-4 border cursor-pointer hover:bg-gray-100"
                onClick={() => handleCityClick(suggestion)}
              >
                <p className="font-semibold">{suggestion.city},</p>
                <p>{suggestion.country}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchCityInput;
