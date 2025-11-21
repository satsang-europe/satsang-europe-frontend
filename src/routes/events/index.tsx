import { strapiApi } from "@/api/axios";
import Pagination from "@/components/Pagination";
import type { EventTypes } from "@/types";
import { formatDate } from "@/utils/utilityFunction";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

const fetchEventsFromStrapi = async (): Promise<EventTypes[]> => {
  const res = await strapiApi.get("/upcoming-events");
  return res.data.data;
};

const eventQueryOptions = () =>
  queryOptions({
    queryKey: ["events"],
    queryFn: () => fetchEventsFromStrapi(),
  });

export const Route = createFileRoute("/events/")({
  component: EventsPage,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(eventQueryOptions()),
});

function EventsPage() {
  const { data } = useSuspenseQuery(eventQueryOptions());
  const now = new Date();
  const futureEvents = data
    .filter((event) => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;

  const totalPages = Math.ceil(futureEvents.length / eventsPerPage);
  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = futureEvents.slice(indexOfFirst, indexOfLast);
  return (
    <>
      <div className="flex justify-between mb-8">
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-300 font-bold text-sm md:text-lg"
        >
          ← Back to Home
        </Link>
        <div className="flex flex-col font-bold text-sm md:text-lg space-y-4">
          <Link
            to="/events/previouscongregations"
            className="text-blue-500 hover:text-blue-300"
          >
            Previous Congregations →
          </Link>
          <Link
            to="/events/previousfoodservices"
            className="text-blue-500 hover:text-blue-300"
          >
            Previous Food Services →
          </Link>
          <Link
            to="/events/previousseminars"
            className="text-blue-500 hover:text-blue-300"
          >
            Previous Seminars →
          </Link>
        </div>
      </div>
      <h1 className="font-bold text-2xl md:text-3xl text-amber-400 text-center">
        Upcoming Events
      </h1>
      <div className="bg-gray-800 mt-8">
        {futureEvents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-700 text-gray-200">
                  <th className="p-2 md:p-4 text-left text-xs md:text-base min-w-32 md:min-w-40">
                    Event Title
                  </th>
                  <th className="p-2 md:p-4 text-left text-xs md:text-base min-w-32 md:min-w-40">
                    Location
                  </th>
                  <th className="p-2 md:p-4 text-left text-xs md:text-base min-w-24 md:min-w-32">
                    Date
                  </th>
                  <th className="p-2 md:p-4 text-left text-xs md:text-base min-w-48 md:min-w-64">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                {currentEvents.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b border-gray-700 hover:bg-gray-700"
                  >
                    <td className="p-2 md:p-4 text-xs md:text-sm">
                      {event.title}
                    </td>
                    <td className="p-2 md:p-4 text-xs md:text-sm">
                      {event.location}
                    </td>
                    <td className="p-2 md:p-4 text-xs md:text-sm">
                      {formatDate(event.date)}
                    </td>
                    <td className="p-2 md:p-4 text-xs md:text-sm">
                      {event.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-3 rounded-md shadow-md text-gray-200 font-semibold">
            No Upcoming Events
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
