import Image from "next/image";
import { NewsData } from "./TopNews";
import Link from "next/link";

const NewsCard = ({ data }: { data: NewsData }) => {
  return (
    <div className="flex justify-between items-center gap-4 w-full bg-white p-6 border">
      <div className="flex-[50%] flex-shrink-0 flex flex-col gap-4">
        <Link href={data.url} target="_blank">
          <h2 className="text-sm font-semibold hover:underline">
            {data.title}
          </h2>
        </Link>
        <p className="text-sm">{`From ${data.author ? data.author : "N/A"}`}</p>
      </div>
      <div className="w-[200px] h-[100px] relative">
        <Image
          src={data.urlToImage === null ? "/placeholder.webp" : data.urlToImage}
          alt="news image"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default NewsCard;
