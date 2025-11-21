import { strapiApi } from "@/api/axios";
import Pagination from "@/components/Pagination";
import type { BlogType } from "@/types";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

const fetchBlogsFromStrapi = async (): Promise<BlogType[]> => {
  const res = await strapiApi.get("/blogs");
  return res.data.data;
};

const ideasQueryOptions = () =>
  queryOptions({
    queryKey: ["blogs"],
    queryFn: () => fetchBlogsFromStrapi(),
  });

export const Route = createFileRoute("/blogs/")({
  component: BlogsPage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideasQueryOptions());
  },
});

function BlogsPage() {
  const { data } = useSuspenseQuery(ideasQueryOptions());
  const blogPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const blogs = data.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const totalPages = Math.ceil(data.length / blogPerPage);
  const indexOfLast = currentPage * blogPerPage;
  const indexOfFirst = indexOfLast - blogPerPage;
  const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);
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
        <h1 className="font-bold text-2xl md:text-3xl text-amber-400 text-center mb-8">
          Blogs
        </h1>
      </div>
      <div className="p-4 bg-gray-700">
        {blogs.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentBlogs.map((blog: BlogType) => (
              <li
                key={blog.id}
                className="border border-gray-200 rounded shadow p-4 bg-gray-700 flex flex-col justify-between hover:border hover:border-amber-400"
              >
                <div>
                  <h2 className="text-lg font-semibold">{blog.title}</h2>
                  <p className="text-gray-400 mt-2">{blog.summary}</p>
                  <p className="text-gray-300 mt-2">Author: {blog.author}</p>
                </div>
                <Link
                  to="/blogs/$blogId"
                  viewTransition
                  params={{ blogId: blog.documentId.toString() }}
                  className="text-center mt-4 inline-block bg-gray-800 hover:bg-gray-900 py-2 rounded font-semibold text-gray-200 hover:text-blue-400 transition"
                >
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center rounded-md text-gray-200 font-semibold">
            No blogs
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}
