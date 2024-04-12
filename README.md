This is a Weather Application made as an assignment for Stamurai.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Features in this application

- City List: A table displaying all cities with a population of 1000 or more, fetched from the Geonames All Cities API. The table includes columns for city name, country, timezone, and Latitude/Longitude.
- Infinite Scroll: The city list supports infinite scrolling, allowing users to load more cities as they scroll down the table.
- Search and Autocomplete: Users can search for cities by name, with an autocomplete feature suggesting possible locations as they type.
- Weather Page: Clicking on a city name in the table opens a dedicated weather page for that city, displaying current weather conditions and forecasts fetched from the OpenWeatherMap API.
- Automatic Location detection & Map Integration: Application will automatically detect your location and will show it on Map. Clicking on the Link will take you to your city weather.
- Weather News: I've implemented news feature on app too. Users can see top headlines and latest news on weather and climate. Clicking on news will take you to it's respective source.
- IMPORTANT NOTE ON NEWS: News API does not allow the requests from a deployed app on the browser on free version. I've provided Screen Shots of application running on Localhost to show how it looks like.
- Recently Visted Locations: The header shows the recent cities you have visted by storing them on browser's Local Storage.
- Beautiful UI: The application has seamless UI and user experience and have dedicated Loading features.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
