"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { Triangle } from "react-loader-spinner";

export type NewsData = {
  title: string;
  description: string;
  author: string;
  urlToImage: string;
  url: string;
  publishedAt: string;
};

const TopNews = () => {
  const [newsData, setNewsData] = useState<NewsData[] | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await axios.get(
        `https://newsapi.org/v2/top-headlines?q=climate&apiKey=c5bc546a06734c929d32a3a2ddc6ef01`
      );

      const articles = data.articles.map((article: any) => ({
        title: article.title,
        description: article.description,
        author: article.author,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
      }));

      const slicedArticles = articles.slice(0, 3);

      setNewsData(slicedArticles);
    };

    fetchNews();
  }, []);

  return (
    <div className="mt-6 h-full bg-white w-full">
      <div>
        <div className="bg-white px-2 py-4 border-b">
          <h2 className="font-semibold text-2xl capitalize">
            Top Weather News
          </h2>
        </div>
        <div className="flex flex-col rounded-lg w-full">
          {newsData === null ? (
            <div className="w-full h-full flex my-44 justify-center">
              <Triangle
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="triangle-loading"
              />
            </div>
          ) : (
            newsData.map((data: NewsData) => {
              return <NewsCard key={data.publishedAt} data={data} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNews;
