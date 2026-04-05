import { notFound } from "next/navigation";

import { EnrollmentStepPlaceholderPage } from "@/features/enrollment/components/enrollment-step-placeholder-page";
import { getEnrollmentStepDefinition } from "@/features/enrollment/config/enrollment-steps";
import { getRequiredSessionUser } from "@/lib/auth-session";

export default async function EnrollmentStep1Page() {
  const user = await getRequiredSessionUser();
  const step = getEnrollmentStepDefinition(1);

  if (!step) {
    notFound();
  }

  return <EnrollmentStepPlaceholderPage step={step} user={user} />;
}
