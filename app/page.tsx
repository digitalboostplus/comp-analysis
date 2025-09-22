import { Suspense } from "react";
import ClientPage from "@/components/client-page";

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
          <span className="h-2 w-2 rounded-full bg-mint" />
          Real-time playbooks for outperforming your search competitors
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          SEO Intelligence Lab
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-white/70">
          Map your keyword universe, craft conversion-focused content, fortify backlinks, and
          benchmark every move against your competitors with a single interactive workspace.
        </p>
      </div>

      <Suspense fallback={<div className="text-white/70">Loading the command center...</div>}>
        <ClientPage />
      </Suspense>
    </main>
  );
}
