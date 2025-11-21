import {
  Outlet,
  createRootRouteWithContext,
  useMatches,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFound from "@/components/NotFound";

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  const matches = useMatches();
  const isHomePage = matches[matches.length - 1]?.routeId === "/";
  return (
    <div
      className="min-h-screen
      bg-[linear-gradient(90deg,#2A2929_0%,rgba(81,79,79,0.87)_35%,rgba(43,42,42,0.99)_100%)]
      bg-gray-900
      text-white flex flex-col"
    >
      <Header />
      {isHomePage ? (
        // Home page layout - no wrapper, let page control layout
        <div className="flex-1">
          <Outlet />
        </div>
      ) : (
        // Other pages - wrapped in constrained container
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          <Outlet />
        </main>
      )}
      <Footer />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  );
}
