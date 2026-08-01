import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/lux/Header";
import { Footer } from "@/components/lux/Footer";
import { Splash } from "@/components/lux/Splash";
import { LuxCursor } from "@/components/lux/LuxCursor";

function NotFoundComponent() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-ink px-6">
      <div className="max-w-xl text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="display-xl mt-8 text-foreground">Nothing Here</h1>
        <p className="body-lux mx-auto mt-8 max-w-md">
          The page you are looking for has been moved, retired, or never existed. Some
          things are best left unmade.
        </p>
        <div className="mt-14">
          <Link to="/" className="btn-lux">
            Return to the House
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-ink px-6">
      <div className="max-w-xl text-center">
        <p className="eyebrow">Interruption</p>
        <h1 className="display-lg mt-8 text-foreground">This page didn&apos;t load</h1>
        <p className="body-lux mx-auto mt-8 max-w-md">
          Something went wrong on our end. Please try again, or return to the house.
        </p>
        <div className="mt-14 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-lux"
          >
            Try Again
          </button>
          <a href="/" className="btn-lux-gold">
            Go Home
          </a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ODCORRECT — Luxury Without Compromise" },
      {
        name: "description",
        content:
          "ODCORRECT is a luxury fashion house preparing a new standard of timeless clothing, footwear and fragrance.",
      },
      { name: "author", content: "ODCORRECT" },
      { name: "theme-color", content: "#050505" },
      { property: "og:site_name", content: "ODCORRECT" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Jost:wght@200;300;400&family=Mrs+Saint+Delafield&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ODCORRECT",
          description:
            "A luxury fashion house devoted to timeless clothing, footwear and fragrance.",
          slogan: "Luxury. Without Compromise.",
          founder: { "@type": "Person", name: "Mrinal Gahlaut" },
          email: "house@odcorrect.com",
          areaServed: "Worldwide",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Splash />
      <LuxCursor />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[9999] focus:bg-charcoal focus:px-5 focus:py-3 focus:text-sm focus:text-gold"
      >
        Skip to content
      </a>
      <Header />
      <div id="main">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </div>
      <Footer />
    </QueryClientProvider>
  );
}
