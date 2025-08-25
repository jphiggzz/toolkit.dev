import { Chat } from "@/app/_components/chat";
import { auth } from "@/server/auth";
import { generateStableUUID } from "@/lib/utils";
import LandingPage from "./_components/landing-page";
import { ChatWithPatientSelection } from "./_components/chat-with-patient-selection";
import { serverCookieUtils } from "@/lib/cookies/server";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <LandingPage />;
  }

  // Create a stable UUID for the home page chat based on user ID
  // This ensures the same chat session persists across page reloads
  const userBasedSeed = session.user.id + "-home-chat";
  const id = generateStableUUID(userBasedSeed);
  const preferences = await serverCookieUtils.getPreferences();

  return (
    <ChatWithPatientSelection
      chatId={id}
      preferences={preferences}
    />
  );
}
