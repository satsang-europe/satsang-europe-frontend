import { strapiApi } from "@/api/axios";
import type { BlogType } from "@/types";
import { formatDate } from "@/utils/utilityFunction";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";

const fetchBlog = async (blogId: string): Promise<BlogType> => {
  const res = await strapiApi.get(`/blogs/${blogId}`);
  return res.data.data;
};

const ideaQueryOptions = (blogId: string) =>
  queryOptions({
    queryKey: ["blog", blogId],
    queryFn: () => fetchBlog(blogId),
  });

export const Route = createFileRoute("/blogs/$blogId/")({
  component: BlogDetailPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.blogId));
  },
});

function BlogDetailPage() {
  const { blogId } = Route.useParams();
  const { data } = useSuspenseQuery(ideaQueryOptions(blogId));
  return (
    <div className="p-4 bg-gray-800 border-2 border-amber-400">
      <Link to="/blogs" viewTransition className="text-blue-400 underline">
        ← Back To Blogs
      </Link>
      <h2 className="font-bold text-2xl md:text-3xl mt-4 mb-2">{data.title}</h2>
      <article className="prose max-w-none mb-8 text-gray-00">
        <ReactMarkdown>{data.description}</ReactMarkdown>
      </article>
      {/* <p className="text-lg font-semibold text-gray-300 mb-4 leading-relaxed">
        {data.description}
      </p> */}
      <div className="flex justify-between pt-4 font-bold text-gray-200">
        <p>{data.author}</p>
        <p>{formatDate(data.date)}</p>
      </div>
    </div>
  );
}
