import { notFound } from "next/navigation";

import { EnrollmentStepPlaceholderPage } from "@/features/enrollment/components/enrollment-step-placeholder-page";
import { getEnrollmentStepDefinition } from "@/features/enrollment/config/enrollment-steps";
import { getRequiredSessionUser } from "@/lib/auth-session";

export default async function EnrollmentStep4Page() {
  const user = await getRequiredSessionUser();
  const step = getEnrollmentStepDefinition(4);

  if (!step) {
    notFound();
  }

  return <EnrollmentStepPlaceholderPage step={step} user={user} />;
}
