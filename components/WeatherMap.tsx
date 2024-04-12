"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import axios from "axios";

const MapContainer = dynamic(
  () => import("react-leaflet").then((module) => module.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((module) => module.TileLayer),
  { ssr: false }
);

const WeatherMap = () => {
  const [center, setCenter] = useState<[number, number] | null>(null);
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCenter([position.coords.latitude, position.coords.longitude]);
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, []);

  if (center) {
    const fetchCityName = async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${center[0]}&lon=${center[1]}&appid=85f95f4f8e1b0c71bde8c98290317cc6`
      );
      setCityName(data[0].name);
    };

    fetchCityName();
  }

  if (!center) {
    return (
      <div className="mt-6">
        <h2 className="font-semibold text-2xl mb-6 text-white">
          Wait while we load you city on the Map
        </h2>
        <Skeleton className="w-full h-[500px] rounded-lg" />
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="font-semibold text-2xl mb-6 text-white">
        Click{" "}
        <Link
          href={`/city/${cityName.toLowerCase().replace(/\s+/g, "-")}/lat=${
            center[0]
          }&lon=${center[1]}`}
          className="underline"
        >
          here
        </Link>{" "}
        to see your City Weather
      </h2>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
