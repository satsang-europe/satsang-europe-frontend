import { strapiApi } from "@/api/axios";
import EventCard from "@/components/EventCard";
import Pagination from "@/components/Pagination";
import type { PreviousEvents } from "@/types";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

const fetchFoodServicesFromStrapi = async (): Promise<PreviousEvents[]> => {
  const res = await strapiApi.get("/foodservices?populate=*");
  const prevEvents = res.data.data;
  const events = prevEvents.map((event: any) => ({
    id: event.id,
    documentId: event.documentId,
    title: event.title,
    description: event.description,
    location: event.location,
    date: event.date,
    eventLink: event?.eventLink,
    image: event.eventImage?.url ? event.eventImage?.url : "/prevousevent.png",
  }));
  return events;
};

const eventQueryOptions = () =>
  queryOptions({
    queryKey: ["foodservices"],
    queryFn: () => fetchFoodServicesFromStrapi(),
  });

export const Route = createFileRoute("/events/previousfoodservices/")({
  component: FoodServicesPage,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(eventQueryOptions()),
});

function FoodServicesPage() {
  const { data: events } = useSuspenseQuery(eventQueryOptions());
  const prevFoodServices = events.sort(
    (a: PreviousEvents, b: PreviousEvents) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;

  const totalPages = Math.ceil(prevFoodServices.length / eventsPerPage);
  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = prevFoodServices.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className="flex justify-start mb-8">
        <Link
          to="/events"
          className="text-blue-500 hover:text-blue-300 font-bold text-sm md:text-lg"
        >
          ← Back to Events
        </Link>
      </div>
      <h1 className="font-bold text-2xl md:text-3xl text-amber-400 text-center mb-8">
        Previous Food Services
      </h1>
      <div className="mt-4">
        {prevFoodServices.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-2">
            {currentEvents.map((event: PreviousEvents) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-3 rounded-md shadow-md text-gray-200 font-semibold">
            No Previous Events
          </div>
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
