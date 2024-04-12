import React from "react";
import { Skeleton } from "./ui/skeleton";

const LoaderSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-6 md:w-[700px] md: mx-auto mt-24">
      <div className="w-full h-full md:h-[400px] flex flex-col md:flex-row justify-center gap-6">
        <div className="flex flex-col items-center gap-4 w-full">
          <Skeleton className="w-[350px] h-[200px] rounded-xl" />
          <Skeleton className="w-[350px] h-[200px] rounded-xl" />
        </div>

        <Skeleton className="w-full h-full rounded-xl" />
      </div>

      <Skeleton className="w-full h-[500px] rounded-xl" />
    </div>
  );
};

export default LoaderSkeleton;
