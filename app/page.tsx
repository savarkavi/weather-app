import MoreNews from "@/components/MoreNews";
import TopNews from "@/components/TopNews";
import WeatherTable from "@/components/weather-table/WeatherTable";
import WeatherMap from "@/components/WeatherMap";

export default async function Home() {
  return (
    <div className="p-6 sm:p-12 bg-gradient-to-t from-[#361A33] to-[#3A2A45] min-h-screen">
      <div className="max-w-[1024px] mx-auto flex flex-col gap-12 sm:gap-16 lg:gap-8 lg:flex-row">
        <div className="lg:flex-[60%] flex flex-col gap-6">
          <WeatherTable />
          <WeatherMap />
        </div>
        <div className="flex flex-col flex-[40%] w-full h-full">
          <TopNews />
          <MoreNews />
        </div>
      </div>
    </div>
  );
}
