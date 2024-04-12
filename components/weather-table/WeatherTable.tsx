"use client";

import { useEffect, useRef, useState } from "react";
import { DataTable } from "./data-table";
import axios from "axios";
import { City, columns } from "./columns";
import InfiniteScroll from "react-infinite-scroll-component";

const WeatherTable = () => {
  const [data, setData] = useState<City[]>([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const fetchCities = async () => {
    try {
      const {
        data: { results },
      } = await axios.get(
        "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20"
      );

      const citiesData = results.map((res: any) => ({
        id: res.geoname_id,
        city: res.name,
        country: res.label_en,
        timeZone: res.timezone,
        lat: res.coordinates.lat,
        lon: res.coordinates.lon,
      }));

      setData(citiesData);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchMoreData = async () => {
    setPage((prev) => prev + 1);

    try {
      const {
        data: { results },
      } = await axios.get(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${
          (page + 1) * 20
        }`
      );

      const citiesData = results.map((res: any) => ({
        id: res.geoname_id,
        city: res.name,
        country: res.label_en,
        timeZone: res.timezone,
        lat: res.coordinates.lat,
        lon: res.coordinates.lon,
      }));

      setData([...data, ...citiesData]);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSearchChane = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search.length > 0) {
      const fetchFilteredData = async () => {
        try {
          const {
            data: { results },
          } = await axios.get(
            `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=search(name%2C%20%22${search}%22)&limit=20 `
          );

          const citiesData = results.map((res: any) => ({
            id: res.geoname_id,
            city: res.name,
            country: res.label_en,
            timeZone: res.timezone,
            lat: res.coordinates.lat,
            lon: res.coordinates.lon,
          }));

          setData(citiesData);
        } catch (error: any) {
          console.log(error);
        }
      };

      fetchFilteredData();
    } else {
      fetchCities();
    }
  }, [search]);

  return (
    <div className="flex flex-col w-full gap-2 mt-12 lg:mt-0 flex-shrink-0">
      <h2 className="font-semibold text-2xl mb-6 capitalize text-white">
        Select any city to see weather details
      </h2>
      <input
        value={search}
        onChange={handleSearchChane}
        placeholder="filter cities..."
        className={`outline-none border-2 p-2 rounded-lg ${
          search.trim() === "" && search.length > 0 && "border border-red-500"
        }`}
      />
      <div>
        {search.trim() === "" && search.length > 0 && (
          <p className="text-red-500 text-xl">Invalid input</p>
        )}
      </div>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={true}
        height={600}
        loader={<h4 className="text-center"></h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <DataTable columns={columns} data={data} />
      </InfiniteScroll>
    </div>
  );
};

export default WeatherTable;
