import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/contactus/")({
  component: ContactUsPage,
});

function ContactUsPage() {
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
      <div className="bg-gray-800 mt-16 px-4 py-16 border-gray-700 shadow-xl">
        <h2 className="text-xl md:text-3xl text-center">
          For any queries, write to us at: <br /> <br />
          <strong>info@satsangeurope.org</strong>
        </h2>
      </div>
    </>
  );
}
