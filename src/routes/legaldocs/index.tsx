import { strapiApi } from "@/api/axios";
import type { LegalDocs } from "@/types";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

const fetchDocsFromStrapi = async (): Promise<LegalDocs[]> => {
  const res = await strapiApi.get("/legal-documents");
  return res.data.data;
};

const ideasQueryOptions = () =>
  queryOptions({
    queryKey: ["legalDocs"],
    queryFn: () => fetchDocsFromStrapi(),
  });

export const Route = createFileRoute("/legaldocs/")({
  component: LegalDocPage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideasQueryOptions());
  },
});

function LegalDocPage() {
  const { data } = useSuspenseQuery(ideasQueryOptions());
  const docs = data.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  return (
    <>
      <div className="flex justify-start mb-4 md:mb-8">
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-300 font-bold text-lg"
        >
          ← Back to Home
        </Link>
      </div>
      <div className="px-2 flex-col justify-center">
        <h1 className="font-bold text-2xl md:text-3xl text-gray-300 text-center mb-8">
          Legal Documents
        </h1>
      </div>
      <div className="p-4 bg-gray-700 shadow-md rounded">
        {docs.length > 0 ? (
          <ol className="grid grid-cols-1 gap-3">
            {docs.map((doc) => (
              <li key={doc.id} className="flex">
                <a
                  href={doc.fileLink}
                  className="text-amber-400 inline-flex gap-2 items-center hover:text-amber-200 transition"
                  target="_blank"
                >
                  <span>{doc.title} 🔗</span>
                </a>
              </li>
            ))}
          </ol>
        ) : (
          <h2 className="text-xl text-gray-200 text-center">No Documents</h2>
        )}
      </div>
    </>
  );
}
