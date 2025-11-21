import { strapiApi } from "@/api/axios";
import type { MagazineType } from "@/types";
import { formatDate } from "@/utils/utilityFunction";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

const fetchMagazineBySlug = async (slug: string): Promise<MagazineType> => {
  const res = await strapiApi.get(
    `/publications?filters[slug][$eq]=${slug}&populate=*`
  );
  const jsonData = res.data.data[0];

  const magazine = {
    id: jsonData.id,
    documentId: jsonData.documentId,
    title: jsonData.title,
    slug: jsonData.slug,
    date: jsonData.date,
    magazineLink: jsonData.magazineLink,
    image: jsonData.image.url,
  };
  return magazine;
};

const magazineQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["magazine", slug],
    queryFn: () => fetchMagazineBySlug(slug),
  });

export const Route = createFileRoute("/publications/$slug/")({
  component: BlogDetailsPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(magazineQueryOptions(params.slug));
  },
});

function BlogDetailsPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(magazineQueryOptions(slug));
  return (
    <div className="p-4">
      <Link
        to="/publications"
        className="text-blue-400 hover:text-blue-300 underline font-bold mb-4 inline-block"
      >
        ← Back to Publications
      </Link>
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl md:text-3xl text-amber-400 text-center mb-6">
          {data.title}
        </h1>

        <div className="mb-6">
          <img
            src={data.image}
            alt={data.title}
            className="w-64 md:w-80 border-2 border-amber-400 rounded shadow-lg"
          />
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-300 font-semibold">
            Published: {formatDate(data.date)}
          </p>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto">
        {/* Mobile-friendly button */}
        <a
          href={data.magazineLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block md:hidden w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-lg text-center shadow-lg mb-4"
        >
          📄 Open PDF in Full Screen
        </a>

        {/* Iframe for all sizes, but taller on desktop */}
        <iframe
          src={data.magazineLink}
          className="w-full h-[500px] md:h-[800px] border-2 border-amber-400 rounded shadow-lg"
          title={data.title}
        />
      </div>
    </div>
  );
}
