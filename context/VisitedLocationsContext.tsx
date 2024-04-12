"use client";

import React, { createContext, useState, useEffect } from "react";

interface Location {
  id: string;
  city: string;
  icon: string;
  temp: number;
}

interface LocationContextValue {
  visitedLocations: Location[];
  setVisitedLocations: React.Dispatch<React.SetStateAction<Location[]>>;
}

export const LocationContext = createContext<LocationContextValue | undefined>(
  undefined
);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visitedLocations, setVisitedLocations] = useState<Location[]>([]);

  useEffect(() => {
    const recentLocations = localStorage.getItem("recentLocations");

    if (recentLocations) {
      const parsedLocations = JSON.parse(recentLocations);
      setVisitedLocations(parsedLocations);
    }
  }, []);

  const contextValue: LocationContextValue = {
    visitedLocations,
    setVisitedLocations,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};
