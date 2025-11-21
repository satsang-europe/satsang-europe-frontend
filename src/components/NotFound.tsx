import { Link } from "@tanstack/react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Page Not Found</h2>
      <p className="text-gray-400 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
