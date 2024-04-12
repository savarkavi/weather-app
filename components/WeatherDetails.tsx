import Image from "next/image";
import { CiCompass1 } from "react-icons/ci";
import { format } from "date-fns";

const directions = [
  "North",
  "North East",
  "East",
  "Soth East",
  "South",
  "South West",
  "West",
  "North West",
];

const WeatherDetails = ({ weatherData }: { weatherData: any }) => {
  return (
    <div className="w-full h-full md:h-[400px] mt-24 flex flex-col md:flex-row justify-center gap-6">
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="w-[350px] h-[200px] border border-white rounded-xl bg-gradient-to-tr from-[#361A33] to-[#47253E] p-4 flex flex-col gap-4 items-center">
          <h2 className="text-white text-7xl">{`${Math.round(
            weatherData.main.temp - 273.15
          )}° C`}</h2>
          <div className="text-white text-xl flex gap-2 items-center">
            <p className="capitalize">{weatherData.weather[0].description}</p>
            <Image
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="icon"
              width={64}
              height={64}
            />
          </div>
        </div>

        <div className="w-[350px] h-[200px] border border-white rounded-xl bg-gradient-to-tr from-[#361A33] to-[#47253E] p-4 flex justify-center gap-12 items-center">
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-white text-4xl font-semibold">Wind</h2>
            <p className="text-white">
              {directions[Math.round(weatherData.wind.deg / 45) % 8]}
            </p>
            <p className="text-white">{`${weatherData.wind.speed}km/h`}</p>
          </div>
          <div className="p-6 rounded-full border-2 border-white">
            <CiCompass1 className="text-white text-4xl" />
          </div>
        </div>
      </div>

      <div className="w-full h-full border border-white rounded-xl bg-gradient-to-tr from-[#361A33] to-[#47253E] p-4 flex flex-col justify-center gap-8">
        <div className="flex justify-between text-white py-2 border-b">
          <p className="text-gray-300">Humidity</p>
          <span className="font-semibold">{`${weatherData.main.humidity}%`}</span>
        </div>

        <div className="flex justify-between text-white py-2 border-b">
          <p className="text-gray-300">Feels Like</p>
          <span className="font-semibold">{`${Math.round(
            weatherData.main.temp - 273.15
          )}°`}</span>
        </div>

        <div className="flex justify-between text-white py-2 border-b">
          <p className="text-gray-300">Pressure</p>
          <span className="font-semibold">{`${weatherData.main.pressure}hPa`}</span>
        </div>

        <div className="flex justify-between text-white py-2 border-b">
          <p className="text-gray-300">Sunrise</p>
          <span className="font-semibold">{`${format(
            new Date(weatherData.sys.sunrise * 1000),
            "HH:mm"
          )}`}</span>
        </div>

        <div className="flex justify-between text-white py-2 border-b">
          <p className="text-gray-300">Sunset</p>
          <span className="font-semibold">{`${format(
            new Date(weatherData.sys.sunset * 1000),
            "HH:mm"
          )}`}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
