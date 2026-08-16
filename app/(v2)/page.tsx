import { LandingPage } from "@/components/marketing/LandingPage";
import { getCurrentSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function WelcomePage() {
  const session = await getCurrentSession();

  return <LandingPage signedIn={Boolean(session)} />;
}
