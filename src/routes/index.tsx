import { createFileRoute, Link } from "@tanstack/react-router";
import HeroBanner from "@/components/HeroBanner";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { formatDate } from "@/utils/utilityFunction";
import VaniComponent from "@/components/VamiComponent";
import type { EventTypes } from "@/types";
import { strapiApi } from "@/api/axios";
import { useTranslation } from "react-i18next";

const fetchEventsFromStrapi = async (): Promise<EventTypes[]> => {
  const res = await strapiApi.get("/upcoming-events");
  return res.data.data;
};

const eventQueryOptions = () =>
  queryOptions({
    queryKey: ["events"],
    queryFn: () => fetchEventsFromStrapi(),
  });

export const Route = createFileRoute("/")({
  component: HomePage,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(eventQueryOptions()),
});

function HomePage() {
  const { t } = useTranslation("home");
  const { data } = useSuspenseQuery(eventQueryOptions());
  const now = new Date();
  const futureEvents = data.filter((event) => new Date(event.date) >= now);
  const latestFoodService = futureEvents
    .filter((event) => event.category.toLowerCase().trim() === "foodservice")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  const latestSatsangSeminar = futureEvents
    .filter(
      (event) =>
        event.category.toLowerCase().trim() === "satsang" ||
        event.category.toLowerCase().trim() === "seminar"
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  return (
    <>
      <HeroBanner />
      <main className="max-w-4xl mt-10 mx-auto">
        <div className="px-2">
          <h1 className="font-bold text-2xl md:text-3xl text-amber-400 text-center mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-gray-100 font-semibold text-lg text-justify px-2">
            {t("hero.description")}
          </p>
        </div>
        <div className="my-6 h-0.5 px-2 bg-gray-400 w-1/3 mx-auto"></div>
        <div className="px-2">
          <h1 className="font-bold text-2xl md:text-3xl text-amber-400 text-center mb-4">
            {t("thakur.title")}
          </h1>
          <p className="text-gray-100 font-semibold text-lg text-justify px-2">
            {t("thakur.description")}
          </p>
        </div>
        <div className="my-6 h-0.5 px-2 bg-gray-400 w-1/3 mx-auto"></div>
        <div className="px-2">
          <h1 className="font-bold text-2xl md:text-3xl text-amber-400 text-center mb-4">
            {t("concentric.title")}
          </h1>
          <p className="text-gray-100 font-semibold text-lg text-justify px-2">
            {t("concentric.description")}
          </p>
        </div>
        <div className="my-6 h-0.5 px-2 bg-gray-400 w-1/3 mx-auto"></div>
        <div className="px-2">
          <h1 className="font-bold text-2xl md:text-3xl text-amber-400 text-center mb-2">
            {t("events.title")}
          </h1>
          <div className="flex flex-col md:flex-row justify-center gap-3 items-center px-4 pb-4 pt-2">
            {latestSatsangSeminar && (
              <div className="px-4 py-6 bg-gray-600 border shadow-md">
                <img
                  src="./satsangcover.jpg"
                  alt="Satsang Cover photo"
                  className="md:h-[300px] md:w-[400px] border-2 border-amber-200 rounded object-cover"
                />
                <h2 className="text-center text-gray-200 text-xl pt-2 font-bold">
                  {latestSatsangSeminar.title}
                </h2>
                <p className="font-semibold text-gray-200 text-center">
                  {formatDate(latestSatsangSeminar.date)}
                </p>
                <p className="font-semibold text-gray-200 text-center">
                  {latestSatsangSeminar.location}
                </p>
              </div>
            )}
            {latestFoodService ? (
              <div className="px-4 py-6 bg-gray-600 border shadow-md">
                <img
                  src="./foodservicecover.jpg"
                  alt="Satsang Cover photo"
                  className="md:h-[300px] md:w-[400px] border-2 border-amber-200 rounded object-cover"
                />
                <h2 className="text-center text-gray-200 text-xl pt-2 font-bold">
                  {latestFoodService.title}
                </h2>
                <p className="font-semibold text-gray-200 text-center">
                  {formatDate(latestFoodService.date)}
                </p>
                <p className="font-semibold text-gray-200 text-center">
                  {latestFoodService.location}
                </p>
              </div>
            ) : (
              <h2 className="text-xl text-gray-200">{t("events.noEvents")}</h2>
            )}
          </div>
          <div className="flex justify-center">
            <Link
              to="/events"
              className="px-4 py-2 bg-gray-600 text-amber-500 font-semibold rounded-lg shadow-md hover:text-amber-300"
            >
              {t("events.moreEvents")}
            </Link>
          </div>
        </div>
        <div className="my-6 h-0.5 px-2 bg-gray-400 w-1/3 mx-auto"></div>
        <div className="px-2 mb-4 bg-gray-700 pb-2 rounded-lg shadow-md mx-2">
          <VaniComponent />
          <h2 className="font-bold text-center text-sm md:text-xl text-gray-200 ">
            ~ SREE SREE THAKUR ANUKULCHANDRA
          </h2>
        </div>
      </main>
    </>
  );
}
