import Link from "next/link";

import { ArrowRight, Mail, Phone, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ComponentsPage() {
  return (
    <main className="bg-background min-h-screen px-6 pt-24 pb-16 sm:pt-28">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3 text-center">
          <span className="border-border bg-surface text-muted-foreground inline-flex rounded-full border px-4 py-1 text-sm font-medium">
            Component Showcase
          </span>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
            Button component
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base leading-7 sm:text-lg">
            Use this page to preview reusable UI components while building the
            design system.
          </p>
        </div>

        <section className="border-border bg-surface space-y-6 rounded-[2rem] border p-6 shadow-[0_28px_70px_-50px_rgba(16,47,52,0.45)] sm:p-8">
          <div className="space-y-1">
            <h2 className="text-foreground text-2xl font-semibold">Variants</h2>
            <p className="text-muted-foreground text-sm">
              Primary, outline, secondary, accent, and ghost styles.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </section>

        <section className="border-border bg-surface space-y-6 rounded-[2rem] border p-6 shadow-[0_28px_70px_-50px_rgba(16,47,52,0.45)] sm:p-8">
          <div className="space-y-1">
            <h2 className="text-foreground text-2xl font-semibold">Sizes</h2>
            <p className="text-muted-foreground text-sm">
              Common button sizes for different contexts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
            <Button size="icon" aria-label="Add item">
              <Plus />
            </Button>
          </div>
        </section>

        <section className="border-border bg-surface space-y-6 rounded-[2rem] border p-6 shadow-[0_28px_70px_-50px_rgba(16,47,52,0.45)] sm:p-8">
          <div className="space-y-1">
            <h2 className="text-foreground text-2xl font-semibold">
              Icon support
            </h2>
            <p className="text-muted-foreground text-sm">
              Left icon, right icon, links, loading state, and full-width usage.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Button size="xl" rightIcon={<ArrowRight />}>
              Apply Now
            </Button>
            <Button variant="accent" size="lg" leftIcon={<Phone />}>
              Call Support
            </Button>
            <Button variant="secondary" size="lg" leftIcon={<Mail />}>
              Email Us
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">
                View Services
                <ArrowRight />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Button loading loadingText="Submitting..." size="lg" fullWidth>
              Submit Form
            </Button>
            <Button variant="outline" size="lg" fullWidth disabled>
              Disabled Action
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
