import { notFound } from "next/navigation";

import { Chat } from "@/app/_components/chat";
import { api } from "@/trpc/server";
import { generateUUID } from "@/lib/utils";
import { serverCookieUtils } from "@/lib/cookies/server";

export default async function WorkbenchPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  try {
    const [workbench, preferences] = await Promise.all([
      api.workbenches.getWorkbench(id),
      serverCookieUtils.getPreferences(),
    ]);

    if (!workbench) {
      notFound();
    }

    const chatId = generateUUID();

    return (
      <Chat
        id={chatId}
        isReadonly={false}
        isNew={true}
        initialVisibilityType="private"
        workbench={workbench}
        preferences={preferences}
      />
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
