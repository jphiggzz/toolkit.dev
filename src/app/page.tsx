import { Chat } from "@/app/_components/chat";
import { auth } from "@/server/auth";
import { generateUUID } from "@/lib/utils";
import LandingPage from "./_components/landing-page";
import { ChatWithPatientSelection } from "./_components/chat-with-patient-selection";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <LandingPage />;
  }

  const id = generateUUID();

  return (
    <ChatWithPatientSelection
      chatId={id}
    />
  );
}
