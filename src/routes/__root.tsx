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
      {
        title:
          "ODCORRECT | Luxury Fashion House | Clothing, Footwear & Fragrance",
      },
      {
        name: "description",
        content:
          "ODCORRECT is a premium luxury fashion house crafting timeless clothing, footwear and fragrances through exceptional craftsmanship, modern design and uncompromising quality.",
      },
      {
        name: "keywords",
        content:
          "Luxury Fashion, Premium Clothing, Luxury Shoes, Luxury Fragrance, Designer Fashion, Premium Apparel, Luxury Lifestyle, ODCORRECT, Mrinal Gahlaut, Indian Luxury Brand, Fashion House",
      },
      { name: "author", content: "ODCORRECT" },
      { name: "robots", content: "index, follow" },
      {
        name: "theme-color",
        content: "#050505",
        media: "(prefers-color-scheme: dark)",
      },
      {
        name: "theme-color",
        content: "#FAF8F5",
        media: "(prefers-color-scheme: light)",
      },
      { property: "og:site_name", content: "ODCORRECT" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "ODCORRECT | Luxury Fashion House" },
      {
        property: "og:description",
        content:
          "Luxury clothing, footwear and fragrance crafted for timeless elegance.",
      },
      { property: "og:url", content: "https://odcorrect.in/" },
      {
        property: "og:image",
        content: "https://odcorrect.in/odcorrect-logo.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ODCORRECT | Luxury Fashion House" },
      {
        name: "twitter:description",
        content:
          "Luxury clothing, footwear and fragrance crafted for timeless elegance.",
      },
      {
        name: "twitter:image",
        content: "https://odcorrect.in/odcorrect-logo.png",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preload", as: "image", href: "/odcorrect-logo.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Jost:wght@200;300;400&family=Mrs+Saint+Delafield&display=swap",
      },
    ],
    scripts: [
      { children: THEME_INIT_SCRIPT },
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ODCORRECT",
            url: "https://odcorrect.in",
            logo: "https://odcorrect.in/odcorrect-logo.png",
            description:
              "A luxury fashion house devoted to timeless clothing, footwear and fragrance.",
            slogan: "Luxury. Without Compromise.",
            founder: { "@type": "Person", name: "Mrinal Gahlaut" },
            email: "ceo@odcorrect.in",
            areaServed: "Worldwide",
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "ODCORRECT",
            url: "https://odcorrect.in",
            inLanguage: "en",
            publisher: { "@type": "Organization", name: "ODCORRECT" },
          },
        ]),
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
    <html lang="en" suppressHydrationWarning>
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
