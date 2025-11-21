import { strapiApi } from "@/api/axios";
import Pagination from "@/components/Pagination";
import type { MagazineType } from "@/types";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

const fetchPublicationsFromStrapi = async (): Promise<MagazineType[]> => {
  const res = await strapiApi.get("/publications?populate=*");
  const publications = res.data.data;
  const magazines = publications.map((magazine: any) => ({
    id: magazine.id,
    documentId: magazine.documentId,
    title: magazine.title,
    slug: magazine.slug,
    date: magazine.date,
    magazineLink: magazine.magazineLink,
    image: magazine.image.url,
  }));
  return magazines;
};

const magazineQueryOptions = () =>
  queryOptions({
    queryKey: ["publications"],
    queryFn: () => fetchPublicationsFromStrapi(),
  });

export const Route = createFileRoute("/publications/")({
  component: PublicationsPage,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(magazineQueryOptions()),
});

function PublicationsPage() {
  const { data } = useSuspenseQuery(magazineQueryOptions());
  const magazines = data.sort(
    (a: MagazineType, b: MagazineType) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;

  const totalPages = Math.ceil(magazines.length / eventsPerPage);
  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentMagazines = magazines.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className="flex justify-start mb-8">
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-300 font-bold text-sm md:text-lg"
        >
          ← Back to Home
        </Link>
      </div>
      <h1 className="font-bold text-2xl md:text-3xl text-amber-400 text-center mb-8">
        Magazines
      </h1>
      <div className="mt-4">
        {currentMagazines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {currentMagazines.map((magazine: MagazineType) => (
              <div
                className="flex flex-col items-center mb-4"
                key={magazine.slug}
              >
                <Link
                  to="/publications/$slug"
                  params={{ slug: magazine.slug }}
                  className="hover:border hover:border-amber-500"
                >
                  <img
                    src={magazine.image}
                    alt={magazine.title}
                    className="w-50 md:w-60 object-cover"
                  />
                  <div className=" bg-gray-700 px-2 py-2 w-50 md:w-60 shadow-md border border-amber-400">
                    <h3 className="text-amber-400 text-sm md:text-md text-center">
                      {magazine.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div>No Magazine</div>
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
