import { format } from "date-fns";
import Image from "next/image";

const WeatherForecast = ({ forecastData }: { forecastData: any }) => {
  return (
    <div className="w-full h-[500px] border border-white rounded-xl bg-gradient-to-tr from-[#361A33] to-[#47253E] p-6 flex flex-col items-start gap-2">
      <h2 className="text-white text-4xl text-center my-4">
        5 day forecast / 3 hour step
      </h2>
      <div className="w-full overflow-y-scroll">
        {forecastData.list.map((data: any) => {
          return (
            <div
              key={data.dt}
              className="text-white px-2 py-4 border-b w-full text-start grid grid-cols-3 text-sm"
            >
              <p>{format(data.dt_txt, "EEEE, HH:mm")}</p>
              <p>{`${Math.round(data.main.temp - 273.15)}° C`}</p>
              <div className="text-white flex gap-2 items-center">
                <p className="capitalize">{data.weather[0].description}</p>
                <Image
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt="icon"
                  width={30}
                  height={30}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherForecast;
