import React, { StrictMode, Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { get, set, del } from "idb-keyval";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";
import { QueryClient } from "@tanstack/react-query";

import "./i18n/config";
import "./i18n/types";
import LoadingSpinner from "./components/LoadingSpinner.tsx";

// Create tanstack query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Retry once on cold start failures
      staleTime: 5 * 60 * 1000, // 5 minutes - data considered fresh
      gcTime: 10 * 60 * 1000, // 10 minutes - keep unused data in cache
      refetchOnWindowFocus: false, // Prevent refetch on tab focus
      refetchOnMount: false, // Use cache if available
      refetchOnReconnect: "always", // Refetch on reconnect
      networkMode: "offlineFirst", // Try cache first during cold starts
    },
  },
});

// Create IndexedDB persister using idb-keyval
const persister = createAsyncStoragePersister({
  storage: {
    getItem: async (key) => await get(key),
    setItem: async (key, value) => await set(key, value),
    removeItem: async (key) => await del(key),
  },
});

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  defaultPendingComponent: () => (
    <LoadingSpinner message="Satsang Europe Loading ..." />
  ),
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Component to hide initial loader once React is ready
function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      // Hide the initial HTML loader once React has mounted
      const loader = document.getElementById("initial-loader");
      if (loader) {
        loader.classList.add("hidden");
        // Remove from DOM after transition
        setTimeout(() => loader.remove(), 300);
      }
    }
  }, [isReady]);

  return <>{children}</>;
}

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Suspense
        fallback={<LoadingSpinner message="Initializing application..." />}
      >
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{
            persister,
            maxAge: 24 * 60 * 1000,
          }}
        >
          <AppWrapper>
            <RouterProvider router={router} />
          </AppWrapper>
        </PersistQueryClientProvider>
      </Suspense>
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
