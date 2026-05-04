import { ServiceCategoryCard } from "@/features/services/components/service-category-card";
import { servicesCategoriesContent } from "@/features/services/constants/services-content";

export function ServicesCategoriesSection() {
  const { categories, description, title } = servicesCategoriesContent;

  return (
    <section className="bg-[linear-gradient(180deg,#fff7ef_0%,#fffaf4_100%)] py-9 sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[1.5rem] leading-tight font-semibold tracking-tight text-[#083b34] sm:text-[1.8rem] lg:text-[2.2rem]">
            {title}
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-[0.9rem] leading-6 text-[#55585d] sm:text-[0.95rem] sm:leading-7">
            {description}
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <ServiceCategoryCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
