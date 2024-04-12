"use client";

import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import LoaderSkeleton from "@/components/LoaderSkeleton";
import { LocationContext } from "@/context/VisitedLocationsContext";

const CityWeather = () => {
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [forecastData, setForecastData] = useState<any | null>(null);

  const { visitedLocations, setVisitedLocations } =
    useContext(LocationContext)!;

  const path = usePathname();

  const arrStr = path.split("/");
  const cityName = arrStr[2].replace(/-/g, " ");

  const regex = /lat=(-?\d+\.\d+)&lon=(-?\d+\.\d+)/;
  const match = path.match(regex);

  useEffect(() => {
    if (match) {
      let lat = Number(match[1]);
      let lon = Number(match[2]);
      const fetchWeather = async () => {
        try {
          const [weatherRes, forecastRes] = await Promise.all([
            axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=85f95f4f8e1b0c71bde8c98290317cc6`
            ),
            axios.get(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=85f95f4f8e1b0c71bde8c98290317cc6`
            ),
          ]);
          setWeatherData(weatherRes.data);
          setForecastData(forecastRes.data);

          const locationToStore = {
            id: weatherRes.data.id,
            city: weatherRes.data.name,
            temp: weatherRes.data.main.temp - 273.15,
            icon: weatherRes.data.weather[0].icon,
          };

          const recentLocations = localStorage.getItem("recentLocations");

          if (!recentLocations) {
            localStorage.setItem(
              "recentLocations",
              JSON.stringify([locationToStore])
            );

            setVisitedLocations([locationToStore]);
          } else {
            const parsedLocation = JSON.parse(recentLocations);

            const existingLocation = parsedLocation.find(
              (location: any) => location.id === weatherRes.data.id
            );

            if (!existingLocation) {
              localStorage.setItem(
                "recentLocations",
                JSON.stringify([locationToStore, ...parsedLocation])
              );

              setVisitedLocations([locationToStore, ...parsedLocation]);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchWeather();
    }
  }, []);

  return (
    <div className="p-8 sm:p-12 bg-gradient-to-t from-[#361A33] to-[#3A2A45] min-h-screen text-center">
      <div className="max-w-[1024px] mx-auto">
        <h1 className="text-white text-4xl md:text-5xl capitalize mt-16">
          {weatherData?.name}
        </h1>
        {!weatherData && !forecastData ? (
          <LoaderSkeleton />
        ) : (
          <div className="flex flex-col items-center gap-6 md:w-[700px] md: mx-auto">
            <WeatherDetails weatherData={weatherData} />
            <WeatherForecast forecastData={forecastData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CityWeather;
