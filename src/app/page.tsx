import { Chat } from "@/app/_components/chat";
import { auth } from "@/server/auth";
import { generateUUID } from "@/lib/utils";
import LandingPage from "./_components/landing-page";
import { ChatWithPatientSelection } from "./_components/chat-with-patient-selection";
import { serverCookieUtils } from "@/lib/cookies/server";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <LandingPage />;
  }

  // Use a stable ID for the home page chat to prevent re-initialization
  const id = "home-chat";
  const preferences = await serverCookieUtils.getPreferences();

  return (
    <ChatWithPatientSelection
      chatId={id}
      preferences={preferences}
    />
  );
}
