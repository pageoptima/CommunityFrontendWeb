import { ComingSoonPage } from "@/features/protected/components/coming-soon-page";
import { getRequiredSessionUser } from "@/lib/auth-session";

export default async function DashboardPage() {
  const user = await getRequiredSessionUser();

  return <ComingSoonPage title="Dashboard" user={user} />;
}
