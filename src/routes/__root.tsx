import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { TelemetryBackground } from "@/components/site/TelemetryBackground";
import { BootLoader } from "@/components/site/BootLoader";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { BackToTop } from "@/components/site/BackToTop";
import { Link } from "@tanstack/react-router";

function NotFoundComponent() {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-4 pt-24">
      <div className="max-w-md text-center">
        <div className="font-mono text-xs uppercase tracking-[0.4em] text-primary">Error · 404</div>
        <h1 className="mt-4 font-display text-7xl font-black text-foreground">Off-track</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This corner doesn't exist. Rejoin the racing line.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90"
        >
          Return to pit lane
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-bold">Yellow flag</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something broke on the way in. Try again.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/90"
          >
            Retry
          </button>
          <a href="/" className="rounded-md border border-input px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground hover:bg-accent">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Audi Formula 1 — The Future of Motorsport" },
      { name: "description", content: "Concept team portal for Audi Formula 1. Explore the car, the hybrid power unit, the drivers, and the performance. Engineering precision. Electric innovation." },
      { name: "author", content: "Audi F1 Concept" },
      { name: "theme-color", content: "#0A0A0B" },
      { property: "og:title", content: "Audi Formula 1 — The Future of Motorsport" },
      { property: "og:description", content: "Engineering precision. Electric innovation. Racing excellence." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Audi F1" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@AudiF1" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SportsOrganization",
          name: "Audi Formula 1",
          sport: "Formula 1",
          description: "Concept portal for the Audi Formula 1 team.",
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
    <html lang="en" className="dark">
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      <BootLoader />
      <TelemetryBackground />
      <ScrollProgress />
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <BackToTop />
    </QueryClientProvider>
  );
}
