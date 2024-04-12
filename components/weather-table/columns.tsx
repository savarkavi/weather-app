"use client";

import { ColumnDef } from "@tanstack/react-table";

export type City = {
  id: string;
  city: string;
  country: string;
  // timeZone: string;
  lat: number;
  lon: number;
};

export const columns: ColumnDef<City>[] = [
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  // {
  //   accessorKey: "timeZone",
  //   header: "Time Zone",
  // },
  {
    accessorKey: "lon",
    header: "Longitude",
  },
  {
    accessorKey: "lat",
    header: "Latitude",
  },
];
